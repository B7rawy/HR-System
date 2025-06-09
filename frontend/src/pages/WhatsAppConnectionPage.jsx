import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import WhatsAppService from '../services/WhatsAppService';
import './WhatsAppConnectionPage.css';

const WhatsAppConnectionPage = () => {
    const navigate = useNavigate();
    const [connectionState, setConnectionState] = useState({
        status: 'disconnected', // 'disconnected', 'initializing', 'waiting_qr', 'qr_ready', 'scanning', 'connected', 'error'
        qrCode: null,
        errorMessage: '',
        retryCount: 0,
        isLoading: false
    });
    
    const [qrMetadata, setQrMetadata] = useState({
        generated: false,
        timestamp: null,
        attempts: 0,
        autoRefreshCount: 0
    });

    const connectionTimeoutRef = useRef(null);
    const qrPollingRef = useRef(null);
    const eventSourceRef = useRef(null);
    const maxRetries = 3;
    const qrTimeout = 120000; // 2 minutes
    const pollingInterval = 2000; // 2 seconds

    // تنظيف الموارد عند مغادرة الصفحة
    useEffect(() => {
        return () => {
            clearAllTimers();
            closeEventSource();
        };
    }, []);

    const clearAllTimers = () => {
        if (connectionTimeoutRef.current) {
            clearTimeout(connectionTimeoutRef.current);
            connectionTimeoutRef.current = null;
        }
        if (qrPollingRef.current) {
            clearInterval(qrPollingRef.current);
            qrPollingRef.current = null;
        }
    };

    const closeEventSource = () => {
        if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
        }
    };

    // بدء عملية الاتصال الكاملة
    const startConnection = async () => {
        setConnectionState(prev => ({
            ...prev,
            status: 'initializing',
            errorMessage: '',
            isLoading: true
        }));

        clearAllTimers();
        closeEventSource();

        try {
            // خطوة 1: تهيئة WhatsApp client
            console.log('🔄 خطوة 1: تهيئة WhatsApp client...');
            const initResult = await WhatsAppService.initialize();
            
            if (!initResult.success) {
                throw new Error(initResult.message || 'فشل في تهيئة WhatsApp');
            }

            console.log('✅ تم تهيئة WhatsApp client بنجاح');
            
            // خطوة 2: إعداد Event Source للتحديثات المباشرة
            setupEventSource();
            
            // خطوة 3: بدء انتظار QR Code
            setConnectionState(prev => ({
                ...prev,
                status: 'waiting_qr',
                isLoading: true
            }));

            // خطوة 4: بدء polling للـ QR Code
            await startQRPolling();

        } catch (error) {
            console.error('❌ خطأ في بدء الاتصال:', error);
            handleConnectionError(error.message);
        }
    };

    // إعداد Event Source للتحديثات المباشرة
    const setupEventSource = () => {
        try {
            const eventSource = new EventSource(`${WhatsAppService.baseURL}/events`);
            eventSourceRef.current = eventSource;

            eventSource.onopen = () => {
                console.log('🔗 EventSource متصل');
            };

            eventSource.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    handleEventSourceMessage(data);
                } catch (error) {
                    console.error('خطأ في تحليل رسالة EventSource:', error);
                }
            };

            eventSource.onerror = (error) => {
                console.log('🔄 خطأ في EventSource، سيتم إعادة الاتصال...');
                // EventSource يعيد الاتصال تلقائياً
            };

        } catch (error) {
            console.error('خطأ في إعداد EventSource:', error);
        }
    };

    // معالجة رسائل EventSource
    const handleEventSourceMessage = (data) => {
        console.log('📱 رسالة من EventSource:', data.type);

        switch (data.type) {
            case 'qr':
                if (data.data) {
                    console.log('✅ تم استلام QR Code من EventSource');
                    handleQRCodeReceived(data.data);
                }
                break;

            case 'ready':
                console.log('🎉 WhatsApp متصل بنجاح!');
                handleConnectionSuccess();
                break;

            case 'disconnected':
                console.log('🔌 تم قطع اتصال WhatsApp');
                handleDisconnection();
                break;

            default:
                console.log('📝 رسالة EventSource:', data.type, data);
        }
    };

    // بدء polling للـ QR Code
    const startQRPolling = async () => {
        console.log('🔄 بدء polling للـ QR Code...');
        
        const pollQRCode = async () => {
            try {
                const response = await WhatsAppService.apiCall('/qr-code');
                
                if (response.success && response.qrCode) {
                    console.log('✅ تم استلام QR Code من polling');
                    handleQRCodeReceived(response.qrCode);
                    return true; // وقف polling
                } else {
                    console.log('⏳ QR Code ليس جاهزاً بعد...');
                    return false; // استمرار polling
                }
            } catch (error) {
                console.log('🔄 خطأ في polling QR Code:', error.message);
                return false; // استمرار polling
            }
        };

        // محاولة فورية أولى
        const immediate = await pollQRCode();
        if (immediate) return;

        // بدء polling دوري
        qrPollingRef.current = setInterval(async () => {
            const success = await pollQRCode();
            if (success) {
                clearInterval(qrPollingRef.current);
                qrPollingRef.current = null;
            }
        }, pollingInterval);

        // timeout للـ QR Code
        connectionTimeoutRef.current = setTimeout(() => {
            console.log('⏰ timeout للـ QR Code');
            clearInterval(qrPollingRef.current);
            qrPollingRef.current = null;
            handleQRTimeout();
        }, qrTimeout);
    };

    // معالجة استلام QR Code
    const handleQRCodeReceived = (qrCode) => {
        console.log('🎯 معالجة QR Code المستلم');
        
        setConnectionState(prev => ({
            ...prev,
            status: 'qr_ready',
            qrCode: qrCode,
            isLoading: false,
            errorMessage: ''
        }));

        setQrMetadata(prev => ({
            ...prev,
            generated: true,
            timestamp: new Date(),
            attempts: prev.attempts + 1
        }));

        // مسح timeout polling لأن QR أصبح جاهزاً
        if (qrPollingRef.current) {
            clearInterval(qrPollingRef.current);
            qrPollingRef.current = null;
        }

        console.log('✅ QR Code جاهز للعرض');
    };

    // معالجة نجاح الاتصال
    const handleConnectionSuccess = () => {
        clearAllTimers();
        closeEventSource();
        
        setConnectionState(prev => ({
            ...prev,
            status: 'connected',
            isLoading: false,
            errorMessage: ''
        }));

        // الانتقال للداشبورد بعد 2 ثانية
        setTimeout(() => {
            navigate('/whatsapp');
        }, 2000);
    };

    // معالجة قطع الاتصال
    const handleDisconnection = () => {
        setConnectionState(prev => ({
            ...prev,
            status: 'disconnected',
            qrCode: null,
            isLoading: false
        }));

        setQrMetadata({
            generated: false,
            timestamp: null,
            attempts: 0,
            autoRefreshCount: 0
        });
    };

    // معالجة timeout للـ QR Code
    const handleQRTimeout = () => {
        console.log('⏰ انتهت مهلة QR Code');
        
        if (qrMetadata.autoRefreshCount < 3) {
            console.log('🔄 إعادة تحديث QR Code تلقائياً...');
            setQrMetadata(prev => ({
                ...prev,
                autoRefreshCount: prev.autoRefreshCount + 1
            }));
            
            // إعادة محاولة الحصول على QR جديد
            setTimeout(() => {
                startQRPolling();
            }, 1000);
        } else {
            handleConnectionError('انتهت صلاحية رمز QR. يرجى المحاولة مرة أخرى.');
        }
    };

    // معالجة أخطاء الاتصال
    const handleConnectionError = (errorMessage) => {
        clearAllTimers();
        closeEventSource();
        
        setConnectionState(prev => ({
            ...prev,
            status: 'error',
            errorMessage: errorMessage,
            isLoading: false,
            retryCount: prev.retryCount + 1
        }));
    };

    // إعادة المحاولة
    const handleRetry = () => {
        if (connectionState.retryCount < maxRetries) {
            startConnection();
        } else {
            setConnectionState(prev => ({
                ...prev,
                errorMessage: 'تم تجاوز عدد المحاولات المسموح. يرجى المحاولة لاحقاً.'
            }));
        }
    };

    // الرجوع للداشبورد
    const goBack = () => {
        clearAllTimers();
        closeEventSource();
        navigate('/whatsapp');
    };

    // رسائل الحالة
    const getStatusMessage = () => {
        switch (connectionState.status) {
            case 'disconnected':
                return 'اضغط "اتصال" لبدء ربط WhatsApp';
            case 'initializing':
                return 'جاري تهيئة WhatsApp...';
            case 'waiting_qr':
                return 'جاري إنتاج رمز QR...';
            case 'qr_ready':
                return 'امسح رمز QR بهاتفك لربط WhatsApp';
            case 'scanning':
                return 'جاري مسح الرمز...';
            case 'connected':
                return 'تم الاتصال بنجاح! جاري التوجيه...';
            case 'error':
                return connectionState.errorMessage;
            default:
                return 'حالة غير معروفة';
        }
    };

    const getStatusIcon = () => {
        switch (connectionState.status) {
            case 'disconnected':
                return '🔌';
            case 'initializing':
            case 'waiting_qr':
                return '🔄';
            case 'qr_ready':
                return '📱';
            case 'scanning':
                return '👁️';
            case 'connected':
                return '✅';
            case 'error':
                return '❌';
            default:
                return '❓';
        }
    };

    return (
        <div className="whatsapp-connection-page" dir="rtl">
            <div className="connection-container">
                {/* Header */}
                <div className="connection-header">
                    <button className="back-btn" onClick={goBack}>
                        ← العودة
                    </button>
                    <h1>🟢 ربط WhatsApp</h1>
                </div>

                {/* Status Card */}
                <div className="status-card">
                    <div className="status-icon">
                        {connectionState.isLoading ? (
                            <div className="spinner"></div>
                        ) : (
                            <span className="status-emoji">{getStatusIcon()}</span>
                        )}
                    </div>
                    <div className="status-message">
                        {getStatusMessage()}
                    </div>
                    
                    {/* Progress Steps */}
                    <div className="progress-steps">
                        <div className={`step ${['initializing', 'waiting_qr', 'qr_ready', 'scanning', 'connected'].includes(connectionState.status) ? 'active' : ''}`}>
                            1. تهيئة
                        </div>
                        <div className={`step ${['waiting_qr', 'qr_ready', 'scanning', 'connected'].includes(connectionState.status) ? 'active' : ''}`}>
                            2. إنتاج QR
                        </div>
                        <div className={`step ${['qr_ready', 'scanning', 'connected'].includes(connectionState.status) ? 'active' : ''}`}>
                            3. مسح الرمز
                        </div>
                        <div className={`step ${connectionState.status === 'connected' ? 'active' : ''}`}>
                            4. متصل
                        </div>
                    </div>
                </div>

                {/* QR Code Display */}
                {connectionState.status === 'qr_ready' && connectionState.qrCode && (
                    <div className="qr-display">
                        <div className="qr-container">
                            <img 
                                src={connectionState.qrCode} 
                                alt="WhatsApp QR Code"
                                className="qr-image"
                            />
                            <div className="qr-instructions">
                                <h3>📱 كيفية المسح:</h3>
                                <ol>
                                    <li>افتح WhatsApp على هاتفك</li>
                                    <li>اذهب إلى الإعدادات ← الأجهزة المرتبطة</li>
                                    <li>اضغط "ربط جهاز"</li>
                                    <li>وجه الكاميرا نحو هذا الرمز</li>
                                </ol>
                            </div>
                        </div>
                        
                        {qrMetadata.timestamp && (
                            <div className="qr-metadata">
                                <small>
                                    تم إنتاج الرمز: {qrMetadata.timestamp.toLocaleTimeString('en-US')}
                                    {qrMetadata.attempts > 1 && ` (المحاولة ${qrMetadata.attempts})`}
                                </small>
                            </div>
                        )}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="action-buttons">
                    {connectionState.status === 'disconnected' && (
                        <button 
                            className="btn btn-primary btn-large"
                            onClick={startConnection}
                            disabled={connectionState.isLoading}
                        >
                            🔗 بدء الاتصال
                        </button>
                    )}

                    {connectionState.status === 'error' && connectionState.retryCount < maxRetries && (
                        <button 
                            className="btn btn-warning btn-large"
                            onClick={handleRetry}
                            disabled={connectionState.isLoading}
                        >
                            🔄 إعادة المحاولة ({connectionState.retryCount}/{maxRetries})
                        </button>
                    )}

                    {connectionState.status === 'qr_ready' && (
                        <button 
                            className="btn btn-secondary"
                            onClick={() => startQRPolling()}
                            disabled={connectionState.isLoading}
                        >
                            🔄 تحديث الرمز
                        </button>
                    )}
                </div>

                {/* Debug Info (في بيئة التطوير فقط) */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="debug-info">
                        <details>
                            <summary>معلومات التصحيح</summary>
                            <pre>{JSON.stringify({
                                connectionState,
                                qrMetadata,
                                hasEventSource: !!eventSourceRef.current,
                                hasPolling: !!qrPollingRef.current,
                                hasTimeout: !!connectionTimeoutRef.current
                            }, null, 2)}</pre>
                        </details>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WhatsAppConnectionPage;