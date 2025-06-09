const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const QRCode = require('qrcode');
const fs = require('fs-extra');
const path = require('path');
const moment = require('moment');

class WhatsAppManager {
    constructor() {
        this.client = null;
        this.isReady = false;
        this.qrCode = '';
        this.sessionData = null;
        this.connectionStatus = 'disconnected'; // disconnected, connecting, connected, error
        this.authInfo = null;
        this.eventListeners = new Map();
        
        // File paths
        this.dataDir = path.join(__dirname, '../data/whatsapp');
        this.templatesFile = path.join(this.dataDir, 'templates.json');
        this.logsFile = path.join(this.dataDir, 'logs.json');
        this.configFile = path.join(this.dataDir, 'config.json');
        this.contactsFile = path.join(this.dataDir, 'contacts.json');
        this.chatsFile = path.join(this.dataDir, 'chats.json');
        
        // Statistics
        this.stats = {
            totalMessages: 0,
            successfulMessages: 0,
            failedMessages: 0,
            bulkMessages: 0,
            templateMessages: 0,
            receivedMessages: 0,
            startTime: new Date().toISOString()
        };
        
        this.initializeDirectories();
        this.loadConfig();
        this.loadStats();
        this.initializeDefaultTemplates();
    }

    // Initialize directories
    async initializeDirectories() {
        try {
            await fs.ensureDir(this.dataDir);
            await fs.ensureDir(path.join(this.dataDir, 'session'));
            await fs.ensureDir(path.join(this.dataDir, 'media'));
            await fs.ensureDir(path.join(this.dataDir, 'backups'));
        } catch (error) {
            console.error('Error creating directories:', error);
        }
    }

    // Setup WhatsApp client with multiple browser fallbacks
    async setupClient() {
        try {
            if (this.client) {
                await this.client.destroy();
            }

            // Force use of newer Puppeteer
            const puppeteer = require('puppeteer');
            
            console.log('🔄 Testing Chrome directly with newer Puppeteer...');
            try {
                const testBrowser = await puppeteer.launch({
                    headless: true,
                    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
                    args: ['--no-sandbox', '--disable-setuid-sandbox']
                });
                await testBrowser.close();
                console.log('✅ Chrome test successful with newer Puppeteer');
            } catch (error) {
                console.log('⚠️ Chrome test failed:', error.message);
            }

            // Browser detection and configuration
            const browserConfigs = await this.getBrowserConfigurations();
            
            let clientCreated = false;
            let lastError = null;

            for (const config of browserConfigs) {
                try {
                    console.log(`🔄 Trying browser config: ${config.name}`);
                    
                    // Force puppeteer configuration
                    const clientConfig = {
                        authStrategy: new LocalAuth({
                            dataPath: path.join(this.dataDir, 'session'),
                            clientId: 'hr-system'
                        }),
                        puppeteer: {
                            ...config.options,
                            headless: "new" // Use new headless mode
                        }
                    };
                    
                    this.client = new Client(clientConfig);

                    // Test the configuration by setting up basic listeners
                    this.setupEventListeners();
                    clientCreated = true;
                    console.log(`✅ WhatsApp client created successfully with: ${config.name}`);
                    break;
                    
                } catch (error) {
                    lastError = error;
                    console.log(`⚠️ Failed with ${config.name}: ${error.message}`);
                    continue;
                }
            }

            if (!clientCreated) {
                throw new Error(`Failed to create WhatsApp client with any browser configuration. Last error: ${lastError?.message || 'Unknown error'}`);
            }

            return true;
        } catch (error) {
            console.error('Error setting up client:', error);
            this.saveLog({
                type: 'client_setup_error',
                status: 'error',
                message: error.message
            });
            return false;
        }
    }

    // Get multiple browser configurations for maximum compatibility
    async getBrowserConfigurations() {
        const os = require('os');
        const platform = os.platform();
        
        const configs = [];

        // Configuration 1: Try system Chrome on macOS
        if (platform === 'darwin') {
            configs.push({
                name: 'System Chrome (macOS)',
                options: {
                    headless: true,
                    timeout: 60000, // Increase timeout to 60 seconds
                    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
                    args: [
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                        '--disable-dev-shm-usage',
                        '--disable-web-security',
                        '--disable-features=VizDisplayCompositor',
                        '--disable-gpu',
                        '--no-first-run',
                        '--disable-extensions',
                        '--disable-plugins'
                    ]
                }
            });
        }

        // Configuration 2: Try system Chrome on Windows
        if (platform === 'win32') {
            const possiblePaths = [
                'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
                'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
            ];
            
            for (const chromePath of possiblePaths) {
                if (await fs.pathExists(chromePath)) {
                    configs.push({
                        name: 'System Chrome (Windows)',
                        options: {
                            headless: true,
                            executablePath: chromePath,
                            args: [
                                '--no-sandbox',
                                '--disable-setuid-sandbox',
                                '--disable-dev-shm-usage',
                                '--disable-web-security'
                            ]
                        }
                    });
                    break;
                }
            }
        }

        // Configuration 3: Try system Chrome on Linux
        if (platform === 'linux') {
            const possiblePaths = [
                '/usr/bin/google-chrome',
                '/usr/bin/chromium-browser',
                '/usr/bin/chromium'
            ];
            
            for (const chromePath of possiblePaths) {
                if (await fs.pathExists(chromePath)) {
                    configs.push({
                        name: 'System Chrome (Linux)',
                        options: {
                            headless: true,
                            executablePath: chromePath,
                            args: [
                                '--no-sandbox',
                                '--disable-setuid-sandbox',
                                '--disable-dev-shm-usage',
                                '--disable-web-security'
                            ]
                        }
                    });
                    break;
                }
            }
        }

        // Configuration 4: Use bundled Chromium (most reliable)
        configs.push({
            name: 'Bundled Chromium',
            options: {
                headless: true,
                timeout: 60000, // Increase timeout to 60 seconds
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--disable-gpu',
                    '--disable-web-security',
                    '--disable-features=VizDisplayCompositor',
                    '--disable-extensions',
                    '--disable-plugins'
                ]
            }
        });

        // Configuration 5: Minimal fallback
        configs.push({
            name: 'Minimal Configuration',
            options: {
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            }
        });

        // Configuration 6: Last resort - no special args
        configs.push({
            name: 'Default Configuration',
            options: {
                headless: true
            }
        });

        return configs;
    }

    // Setup event listeners
    setupEventListeners() {
        // QR Code generation with enhanced error handling
        this.client.on('qr', async (qr) => {
            try {
                this.connectionStatus = 'connecting';
                
                // Enhanced QR validation
                if (!qr || qr.length < 50) {
                    console.error('❌ Invalid QR code received:', qr ? `Length: ${qr.length}` : 'Empty QR');
                    this.emit('qr_error', { error: 'Invalid QR code received' });
                    return;
                }
                
                console.log('📱 New QR Code received for WhatsApp authentication');
                console.log('📏 QR string length:', qr.length);
                console.log('🔤 QR starts with:', qr.substring(0, 30) + '...');
                
                // Generate QR with multiple fallback methods
                await this.generateQRCode(qr);
                
                console.log('✅ QR Code successfully generated and ready for scan');
                console.log('⏰ QR Code will remain active until scan or timeout (usually 30 seconds)');
                
                this.saveLog({
                    type: 'qr_generated',
                    status: 'info',
                    message: `QR Code generated for authentication (length: ${qr.length})`,
                    timestamp: new Date().toISOString()
                });

                // Emit QR with additional metadata for better debugging
                this.emit('qr', { 
                    qrCode: this.qrCode, 
                    status: this.connectionStatus,
                    qrLength: qr.length,
                    timestamp: new Date().toISOString(),
                    method: 'enhanced_generation'
                });
                
                console.log('🔄 QR Code will auto-refresh when WhatsApp generates a new one');
                console.log('📲 Please scan quickly as QR codes expire every 30 seconds');
                
            } catch (error) {
                console.error('❌ Critical error in QR generation:', error);
                this.connectionStatus = 'error';
                
                this.saveLog({
                    type: 'qr_generation_critical_error',
                    status: 'error',
                    message: error.message,
                    timestamp: new Date().toISOString()
                });
                
                this.emit('qr_error', { 
                    error: error.message,
                    status: this.connectionStatus
                });
            }
        });

        // Client ready
        this.client.on('ready', async () => {
            this.isReady = true;
            this.connectionStatus = 'connected';
            
            console.log('🎉 Connection successful! Clearing QR Code now...');
            this.qrCode = ''; // Only clear QR when actually connected
            
            try {
                const info = this.client.info;
                this.authInfo = {
                    number: info.wid.user,
                    name: info.pushname,
                    platform: info.platform,
                    connectedAt: new Date().toISOString()
                };
                
                await this.saveConfig();
                
                console.log(`✅ WhatsApp client ready - ${this.authInfo.name} (${this.authInfo.number})`);
                
                this.saveLog({
                    type: 'client_ready',
                    status: 'success',
                    message: `Client ready - ${this.authInfo.name} (${this.authInfo.number})`
                });

                this.emit('ready', { authInfo: this.authInfo, status: this.connectionStatus });
                
                // Load contacts and chats
                await this.loadContactsAndChats();
                
            } catch (error) {
                console.error('Error in ready event:', error);
            }
        });

        // Authentication success
        this.client.on('authenticated', () => {
            console.log('🔐 WhatsApp client authenticated');
            console.log('✅ Authentication successful! Clearing QR Code...');
            this.connectionStatus = 'connected';
            this.qrCode = ''; // Clear QR only after successful authentication
            
            this.saveLog({
                type: 'authenticated',
                status: 'success',
                message: 'Client authenticated successfully'
            });

            this.emit('authenticated', { status: this.connectionStatus });
        });

        // Authentication failure
        this.client.on('auth_failure', (msg) => {
            console.error('❌ Authentication failed:', msg);
            this.connectionStatus = 'error';
            this.isReady = false;
            
            this.saveLog({
                type: 'auth_failure',
                status: 'error',
                message: 'Authentication failed: ' + msg
            });

            this.emit('auth_failure', { message: msg, status: this.connectionStatus });
        });

        // Disconnection
        this.client.on('disconnected', (reason) => {
            console.log('🔌 WhatsApp client disconnected:', reason);
            this.connectionStatus = 'disconnected';
            this.isReady = false;
            this.qrCode = '';
            this.authInfo = null;
            
            this.saveLog({
                type: 'disconnected',
                status: 'warning',
                message: 'Client disconnected: ' + reason
            });

            this.emit('disconnected', { reason, status: this.connectionStatus });
        });

        // Incoming messages
        this.client.on('message', async (message) => {
            try {
                this.stats.receivedMessages++;
                await this.saveStats();
                
                const messageData = {
                    id: message.id.id,
                    from: message.from,
                    body: message.body,
                    type: message.type,
                    timestamp: new Date(message.timestamp * 1000).toISOString(),
                    isForwarded: message.isForwarded,
                    isStatus: message.isStatus,
                    isStarred: message.isStarred
                };

                this.saveLog({
                    type: 'message_received',
                    status: 'info',
                    data: messageData
                });

                this.emit('message_received', messageData);
                
                // Auto-reply logic could be added here
                await this.handleIncomingMessage(message);
                
            } catch (error) {
                console.error('Error handling incoming message:', error);
            }
        });

        // Message creation (sent messages)
        this.client.on('message_create', async (message) => {
            if (message.fromMe) {
                this.saveLog({
                    type: 'message_sent_confirmation',
                    status: 'success',
                    data: {
                        id: message.id.id,
                        to: message.to,
                        body: message.body,
                        type: message.type,
                        timestamp: new Date(message.timestamp * 1000).toISOString()
                    }
                });
            }
        });

        // Message acknowledgment
        this.client.on('message_ack', (message, ack) => {
            const ackTypes = {
                1: 'sent',
                2: 'received',
                3: 'read',
                4: 'played'
            };

            this.saveLog({
                type: 'message_ack',
                status: 'info',
                data: {
                    messageId: message.id.id,
                    acknowledgment: ackTypes[ack] || 'unknown',
                    timestamp: new Date().toISOString()
                }
            });
        });
    }

    // Event emitter functionality
    on(event, callback) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, []);
        }
        this.eventListeners.get(event).push(callback);
    }

    emit(event, data) {
        if (this.eventListeners.has(event)) {
            this.eventListeners.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in event listener for ${event}:`, error);
                }
            });
        }
    }

    // Generate QR Code with multiple fallback methods
    async generateQRCode(qr) {
        try {
            console.log('🔄 Starting QR Code generation with enhanced methods...');
            console.log('📏 QR string length:', qr.length);
            console.log('🔤 QR string preview:', qr.substring(0, 50) + '...');
            
            // Validate QR string before processing
            if (!qr || qr.length < 50) {
                throw new Error(`Invalid QR string: ${qr ? `Length ${qr.length}` : 'Empty'}`);
            }
            
            // Method 1: Try with enhanced QRCode library options
            try {
                console.log('📱 Method 1: Enhanced QRCode library...');
                this.qrCode = await QRCode.toDataURL(qr, {
                    width: 350,
                    margin: 3,
                    color: {
                        dark: '#000000',
                        light: '#FFFFFF'
                    },
                    errorCorrectionLevel: 'H', // Highest error correction
                    type: 'image/png',
                    quality: 0.92,
                    maskPattern: 7
                });
                console.log('✅ Method 1 successful!');
            } catch (error) {
                console.log('⚠️ Method 1 failed:', error.message);
                
                // Method 2: Try with different error correction level
                try {
                    console.log('📱 Method 2: Medium error correction...');
                    this.qrCode = await QRCode.toDataURL(qr, {
                        width: 300,
                        margin: 2,
                        color: {
                            dark: '#000000',
                            light: '#FFFFFF'
                        },
                        errorCorrectionLevel: 'M'
                    });
                    console.log('✅ Method 2 successful!');
                } catch (error2) {
                    console.log('⚠️ Method 2 failed:', error2.message);
                    
                    // Method 3: Try with minimal options
                    try {
                        console.log('📱 Method 3: Minimal options...');
                        this.qrCode = await QRCode.toDataURL(qr);
                        console.log('✅ Method 3 successful!');
                    } catch (error3) {
                        console.log('⚠️ Method 3 failed:', error3.message);
                        
                        // Method 4: Use simple base64 encoding as last resort
                        try {
                            console.log('📱 Method 4: Simple fallback...');
                            this.qrCode = await this.generateSimpleQR(qr);
                            console.log('✅ Method 4 successful!');
                        } catch (error4) {
                            console.log('❌ All QR generation methods failed');
                            throw new Error(`All QR generation methods failed. Last error: ${error4.message}`);
                        }
                    }
                }
            }
            
            console.log('✅ QR Code DataURL generated successfully');
            console.log('📐 QR DataURL length:', this.qrCode.length);
            console.log('🎯 QR Code starts with:', this.qrCode.substring(0, 30) + '...');
            
            // Enhanced validation
            if (!this.qrCode || (!this.qrCode.startsWith('data:image/png;base64,') && !this.qrCode.startsWith('data:image/jpeg;base64,'))) {
                throw new Error('Generated QR code is invalid or empty');
            }
            
            // Verify QR contains actual data (not just empty image)
            const base64Data = this.qrCode.split(',')[1];
            if (!base64Data || base64Data.length < 1000) {
                throw new Error('Generated QR code appears to be empty or corrupted');
            }
            
            // Save multiple formats for better compatibility
            await this.saveQRCodeFiles(qr);
            
            this.stats.qrGenerations = (this.stats.qrGenerations || 0) + 1;
            console.log('📊 Total QR generations:', this.stats.qrGenerations);
            
            // Add additional validation delay for mobile compatibility
            console.log('⏳ Adding compatibility delay for mobile devices...');
            await new Promise(resolve => setTimeout(resolve, 1000));
            
        } catch (error) {
            console.error('❌ Error generating QR code:', error);
            this.qrCode = '';
            
            this.saveLog({
                type: 'qr_generation_error',
                status: 'error',
                message: error.message,
                timestamp: new Date().toISOString()
            });
            
            throw error;
        }
    }

    // Simple QR generation fallback with multiple libraries
    async generateSimpleQR(qr) {
        try {
            console.log('🔄 Trying simple QR generation...');
            
            // Method 1: Basic QRCode without complex options
            try {
                const simpleQR = await QRCode.toDataURL(qr, {
                    errorCorrectionLevel: 'L',
                    width: 256
                });
                console.log('✅ Simple QRCode method successful');
                return simpleQR;
            } catch (error) {
                console.log('⚠️ Simple QRCode failed:', error.message);
                
                // Method 2: Try with qr-image library
                try {
                    console.log('🔄 Trying qr-image library...');
                    const QRImage = require('qr-image');
                    
                    const qrPng = QRImage.image(qr, { 
                        type: 'png', 
                        size: 8,
                        margin: 2,
                        ec_level: 'L'
                    });
                    
                    const chunks = [];
                    return new Promise((resolve, reject) => {
                        qrPng.on('data', chunk => chunks.push(chunk));
                        qrPng.on('end', () => {
                            const buffer = Buffer.concat(chunks);
                            const base64 = buffer.toString('base64');
                            console.log('✅ qr-image method successful');
                            resolve(`data:image/png;base64,${base64}`);
                        });
                        qrPng.on('error', reject);
                    });
                } catch (error2) {
                    console.log('⚠️ qr-image failed:', error2.message);
                    
                                            // Method 3: Try with qrcode-generator
                        try {
                            console.log('🔄 Trying qrcode-generator library...');
                            const qrCodeGen = require('qrcode-generator');
                            
                            const qr_gen = qrCodeGen(0, 'L');
                            qr_gen.addData(qr);
                            qr_gen.make();
                            
                            // Create simple ASCII art QR as base64
                            const qrAscii = qr_gen.createDataURL(6, 3);
                            console.log('✅ qrcode-generator method successful');
                            return qrAscii;
                    } catch (error3) {
                        console.log('⚠️ qrcode-generator failed:', error3.message);
                        throw new Error(`All simple QR methods failed. Last error: ${error3.message}`);
                    }
                }
            }
        } catch (error) {
            throw new Error(`Simple QR generation failed: ${error.message}`);
        }
    }

    // Save QR code in multiple formats for debugging and compatibility
    async saveQRCodeFiles(qr) {
        try {
            const fs = require('fs-extra');
            const timestamp = Date.now();
            
            // Save as PNG file
            const qrPath = path.join(this.dataDir, `qr_${timestamp}.png`);
            await QRCode.toFile(qrPath, qr, {
                width: 300,
                margin: 2,
                errorCorrectionLevel: 'H'
            });
            
            // Save raw QR data for debugging
            const qrDataPath = path.join(this.dataDir, `qr_data_${timestamp}.txt`);
            await fs.writeFile(qrDataPath, qr);
            
            console.log('💾 QR Code saved in multiple formats:');
            console.log('   PNG:', qrPath);
            console.log('   Data:', qrDataPath);
            
            // Check file sizes
            const pngStats = await fs.stat(qrPath);
            console.log('📊 PNG file size:', pngStats.size, 'bytes');
            
            if (pngStats.size < 1000) {
                console.warn('⚠️ PNG file seems too small, might be corrupted');
            }
            
            // Cleanup old QR files (keep only last 5)
            await this.cleanupOldQRFiles();
            
        } catch (error) {
            console.error('⚠️ Failed to save QR files:', error.message);
            // Don't throw error here, as it's just for debugging
        }
    }

    // Cleanup old QR files to prevent disk space issues
    async cleanupOldQRFiles() {
        try {
            const fs = require('fs-extra');
            const files = await fs.readdir(this.dataDir);
            
            const qrFiles = files
                .filter(file => file.startsWith('qr_') && (file.endsWith('.png') || file.endsWith('.txt')))
                .map(file => ({
                    name: file,
                    path: path.join(this.dataDir, file),
                    timestamp: parseInt(file.match(/qr_(\d+)/)?.[1] || '0')
                }))
                .sort((a, b) => b.timestamp - a.timestamp);
            
            // Keep only the 5 most recent files
            const filesToDelete = qrFiles.slice(5);
            
            for (const file of filesToDelete) {
                await fs.remove(file.path);
                console.log('🗑️ Cleaned up old QR file:', file.name);
            }
            
        } catch (error) {
            console.error('⚠️ Failed to cleanup old QR files:', error.message);
        }
    }

    // Initialize client connection
    async initialize() {
        try {
            if (this.connectionStatus === 'connecting') {
                return { success: false, message: 'Already connecting...' };
            }

            this.connectionStatus = 'connecting';
            const setupSuccess = await this.setupClient();
            
            if (!setupSuccess) {
                this.connectionStatus = 'error';
                return { success: false, message: 'Failed to setup client' };
            }

            await this.client.initialize();
            
            return { 
                success: true, 
                message: 'WhatsApp client initialization started',
                status: this.connectionStatus
            };
        } catch (error) {
            this.connectionStatus = 'error';
            console.error('Error initializing WhatsApp client:', error);
            
            this.saveLog({
                type: 'initialization_error',
                status: 'error',
                message: error.message
            });
            
            return { success: false, message: error.message };
        }
    }

    // Disconnect client
    async disconnect() {
        try {
            if (this.client) {
                await this.client.destroy();
                this.connectionStatus = 'disconnected';
                this.isReady = false;
                this.qrCode = '';
                this.authInfo = null;
                
                this.saveLog({
                    type: 'manual_disconnect',
                    status: 'info',
                    message: 'Client disconnected manually'
                });
            }
            
            return { success: true, message: 'Disconnected successfully' };
        } catch (error) {
            console.error('Error disconnecting:', error);
            return { success: false, message: error.message };
        }
    }

    // Get connection status
    getStatus() {
        return {
            status: this.connectionStatus,
            isReady: this.isReady,
            qrCode: this.qrCode,
            authInfo: this.authInfo,
            stats: this.stats,
            uptime: this.getUptime()
        };
    }

    // Get uptime
    getUptime() {
        if (!this.stats.startTime) return 0;
        return moment().diff(moment(this.stats.startTime), 'seconds');
    }

    // Send text message
    async sendMessage(to, message, options = {}) {
        if (!this.isReady) {
            throw new Error('WhatsApp client is not ready. Please connect first.');
        }

        const formattedNumber = this.formatPhoneNumber(to);
        if (!this.validatePhoneNumber(formattedNumber)) {
            throw new Error('Invalid Egyptian phone number format. Use: 201XXXXXXXX');
        }

        const chatId = formattedNumber.includes('@c.us') ? formattedNumber : formattedNumber + '@c.us';

        try {
            const sentMessage = await this.client.sendMessage(chatId, message);
            
            this.stats.totalMessages++;
            this.stats.successfulMessages++;
            await this.saveStats();
            
            const logEntry = {
                type: 'message_sent',
                status: 'success',
                to: chatId,
                message: message.substring(0, 100) + (message.length > 100 ? '...' : ''),
                messageId: sentMessage.id.id,
                timestamp: new Date().toISOString(),
                ...options
            };

            this.saveLog(logEntry);

            return {
                success: true,
                messageId: sentMessage.id.id,
                to: chatId,
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            this.stats.totalMessages++;
            this.stats.failedMessages++;
            await this.saveStats();
            
            const errorMessage = error.message || 'Failed to send message';
            
            const logEntry = {
                type: 'message_sent',
                status: 'error',
                to: chatId,
                message: message.substring(0, 100) + (message.length > 100 ? '...' : ''),
                error: errorMessage,
                timestamp: new Date().toISOString(),
                ...options
            };

            this.saveLog(logEntry);
            
            throw new Error(errorMessage);
        }
    }

    // Send template message
    async sendTemplateMessage(to, templateName, templateData = {}) {
        const templates = await this.loadTemplates();
        const template = templates.find(t => t.name === templateName);
        
        if (!template) {
            throw new Error(`Template '${templateName}' not found`);
        }

        // Replace placeholders in template
        let message = template.content;
        Object.keys(templateData).forEach(key => {
            const placeholder = new RegExp(`{{${key}}}`, 'g');
            message = message.replace(placeholder, templateData[key] || '');
        });

        this.stats.templateMessages++;
        await this.saveStats();

        return await this.sendMessage(to, message, {
            templateName,
            templateData,
            category: template.category
        });
    }

    // Send bulk messages
    async sendBulkMessages(recipients, message, templateName = null, options = {}) {
        if (!Array.isArray(recipients) || recipients.length === 0) {
            throw new Error('Recipients array is required');
        }

        if (!this.isReady) {
            throw new Error('WhatsApp client is not ready. Please connect first.');
        }

        const {
            delayMs = 3000,
            maxRetries = 2,
            onProgress = null
        } = options;

        const results = {
            success: [],
            failed: [],
            total: recipients.length,
            startTime: new Date().toISOString()
        };

        this.stats.bulkMessages++;
        await this.saveStats();

        for (let i = 0; i < recipients.length; i++) {
            const recipient = recipients[i];
            let finalMessage = message;
            
            try {
                // If using template
                if (templateName) {
                    const templates = await this.loadTemplates();
                    const template = templates.find(t => t.name === templateName);
                    if (template) {
                        finalMessage = template.content;
                        // Replace placeholders with recipient-specific data
                        Object.keys(recipient).forEach(key => {
                            if (key !== 'phone') {
                                const placeholder = new RegExp(`{{${key}}}`, 'g');
                                finalMessage = finalMessage.replace(placeholder, recipient[key] || '');
                            }
                        });
                    }
                }

                const result = await this.sendMessage(recipient.phone, finalMessage, {
                    bulkSend: true,
                    recipientIndex: i,
                    totalRecipients: recipients.length,
                    templateName
                });

                results.success.push({
                    phone: recipient.phone,
                    name: recipient.name || 'Unknown',
                    messageId: result.messageId,
                    sentAt: result.timestamp
                });

                // Progress callback
                if (onProgress) {
                    onProgress({
                        current: i + 1,
                        total: recipients.length,
                        success: results.success.length,
                        failed: results.failed.length
                    });
                }

                // Add delay between messages to avoid rate limiting
                if (i < recipients.length - 1 && delayMs > 0) {
                    await new Promise(resolve => setTimeout(resolve, delayMs));
                }

            } catch (error) {
                results.failed.push({
                    phone: recipient.phone,
                    name: recipient.name || 'Unknown',
                    error: error.message,
                    failedAt: new Date().toISOString()
                });

                // Still add delay even on failure
                if (i < recipients.length - 1 && delayMs > 0) {
                    await new Promise(resolve => setTimeout(resolve, delayMs / 2));
                }
            }
        }

        results.endTime = new Date().toISOString();
        results.duration = moment(results.endTime).diff(moment(results.startTime), 'seconds');

        this.saveLog({
            type: 'bulk_send_completed',
            status: 'info',
            results,
            templateName
        });

        return results;
    }

    // Send media message
    async sendMedia(to, mediaPath, caption = '', options = {}) {
        if (!this.isReady) {
            throw new Error('WhatsApp client is not ready. Please connect first.');
        }

        try {
            const media = MessageMedia.fromFilePath(mediaPath);
            const formattedNumber = this.formatPhoneNumber(to) + '@c.us';
            
            const sentMessage = await this.client.sendMessage(formattedNumber, media, { caption });
            
            this.stats.totalMessages++;
            this.stats.successfulMessages++;
            await this.saveStats();
            
            this.saveLog({
                type: 'media_sent',
                status: 'success',
                to: formattedNumber,
                mediaPath,
                caption,
                messageId: sentMessage.id.id,
                timestamp: new Date().toISOString(),
                ...options
            });

            return {
                success: true,
                messageId: sentMessage.id.id,
                to: formattedNumber,
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            this.stats.totalMessages++;
            this.stats.failedMessages++;
            await this.saveStats();
            
            this.saveLog({
                type: 'media_sent',
                status: 'error',
                to: to,
                mediaPath,
                error: error.message,
                timestamp: new Date().toISOString(),
                ...options
            });
            
            throw new Error(error.message);
        }
    }

    // Handle incoming messages
    async handleIncomingMessage(message) {
        try {
            // Auto-reply for specific keywords
            const autoReplies = await this.getAutoReplies();
            
            for (const reply of autoReplies) {
                if (reply.enabled && this.matchesKeyword(message.body, reply.keywords)) {
                    await this.sendMessage(message.from, reply.response);
                    break;
                }
            }
        } catch (error) {
            console.error('Error in auto-reply:', error);
        }
    }

    // Match keywords for auto-reply
    matchesKeyword(message, keywords) {
        const lowerMessage = message.toLowerCase();
        return keywords.some(keyword => lowerMessage.includes(keyword.toLowerCase()));
    }

    // Configuration methods
    async loadConfig() {
        try {
            if (await fs.pathExists(this.configFile)) {
                const config = await fs.readJson(this.configFile);
                this.authInfo = config.authInfo || null;
                return config;
            }
        } catch (error) {
            console.error('Error loading config:', error);
        }
        return {};
    }

    async saveConfig() {
        try {
            const config = {
                authInfo: this.authInfo,
                lastUpdate: new Date().toISOString()
            };
            await fs.writeJson(this.configFile, config, { spaces: 2 });
            return true;
        } catch (error) {
            console.error('Error saving config:', error);
            return false;
        }
    }

    // Statistics methods
    async loadStats() {
        try {
            const statsFile = path.join(this.dataDir, 'stats.json');
            if (await fs.pathExists(statsFile)) {
                const savedStats = await fs.readJson(statsFile);
                this.stats = { ...this.stats, ...savedStats };
            }
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    }

    async saveStats() {
        try {
            const statsFile = path.join(this.dataDir, 'stats.json');
            await fs.writeJson(statsFile, this.stats, { spaces: 2 });
            return true;
        } catch (error) {
            console.error('Error saving stats:', error);
            return false;
        }
    }

    // Get message statistics
    async getMessageStats(days = 30) {
        try {
            const logs = await this.loadLogs();
            const startDate = moment().subtract(days, 'days');

            const filteredLogs = logs.filter(log => 
                moment(log.timestamp).isAfter(startDate) && 
                log.type === 'message_sent'
            );

            const dailyStats = {};
            const hourlyStats = {};

            filteredLogs.forEach(log => {
                const date = moment(log.timestamp).format('YYYY-MM-DD');
                const hour = moment(log.timestamp).format('YYYY-MM-DD HH:00');
                
                if (!dailyStats[date]) {
                    dailyStats[date] = { total: 0, success: 0, failed: 0 };
                }
                if (!hourlyStats[hour]) {
                    hourlyStats[hour] = { total: 0, success: 0, failed: 0 };
                }
                
                dailyStats[date].total++;
                hourlyStats[hour].total++;
                
                if (log.status === 'success') {
                    dailyStats[date].success++;
                    hourlyStats[hour].success++;
                } else {
                    dailyStats[date].failed++;
                    hourlyStats[hour].failed++;
                }
            });

            return {
                ...this.stats,
                period: `${days} days`,
                dailyStats,
                hourlyStats,
                totalInPeriod: filteredLogs.length,
                successInPeriod: filteredLogs.filter(log => log.status === 'success').length,
                failedInPeriod: filteredLogs.filter(log => log.status === 'error').length
            };
        } catch (error) {
            console.error('Error getting stats:', error);
            return this.stats;
        }
    }

    // Template management
    async initializeDefaultTemplates() {
        try {
            if (await fs.pathExists(this.templatesFile)) {
                return;
            }

            const defaultTemplates = [
                {
                    id: '1',
                    name: 'welcome_employee',
                    content: '🎉 مرحباً {{employeeName}}!\n\nأهلاً بك في {{companyName}}! نحن متحمسون لانضمامك إلى فريقنا في قسم {{department}}.\n\n📋 معلوماتك:\n👤 المنصب: {{position}}\n📅 تاريخ البداية: {{startDate}}\n📧 البريد الإلكتروني: {{email}}\n\n🔗 يمكنك الوصول إلى نظام الموارد البشرية من خلال الرابط التالي:\n{{systemUrl}}\n\nمرحباً بك في عائلتنا! 👨‍💼👩‍💼',
                    description: 'رسالة ترحيب للموظفين الجدد',
                    category: 'hr',
                    variables: ['employeeName', 'companyName', 'department', 'position', 'startDate', 'email', 'systemUrl'],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    id: '2',
                    name: 'salary_notification',
                    content: '💰 إشعار راتب - {{month}}\n\nعزيزي/عزيزتي {{employeeName}},\n\nتم صرف راتبك لشهر {{month}} بنجاح! 🎉\n\n💵 المبلغ: {{amount}} ريال سعودي\n📅 تاريخ الصرف: {{paymentDate}}\n🏦 طريقة الدفع: {{paymentMethod}}\n📋 رقم المعاملة: {{transactionId}}\n\n📊 تفاصيل الراتب:\n• الراتب الأساسي: {{basicSalary}} ريال\n• البدلات: {{allowances}} ريال\n• الخصوميات: {{deductions}} ريال\n• صافي الراتب: {{netSalary}} ريال\n\n🔗 يمكنك مراجعة كشف الراتب التفصيلي من النظام.\n\nشكراً لجهودك المتميزة! 🙏',
                    description: 'إشعار صرف الراتب الشهري',
                    category: 'payroll',
                    variables: ['employeeName', 'month', 'amount', 'paymentDate', 'paymentMethod', 'transactionId', 'basicSalary', 'allowances', 'deductions', 'netSalary'],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    id: '3',
                    name: 'meeting_reminder',
                    content: '📅 تذكير اجتماع\n\nعزيزي/عزيزتي {{employeeName}},\n\nنذكرك بالاجتماع المقرر:\n\n📋 الموضوع: {{subject}}\n📅 التاريخ: {{date}}\n🕐 الوقت: {{time}}\n📍 المكان: {{location}}\n👥 المشاركون: {{attendees}}\n⏱️ المدة المتوقعة: {{duration}}\n\n📝 جدول الأعمال:\n{{agenda}}\n\n📎 المرفقات: {{attachments}}\n\n💡 يرجى الحضور في الموعد المحدد والاستعداد للمناقشة.\n\nشكراً لك! 🙏',
                    description: 'تذكير بالاجتماعات المقررة',
                    category: 'meetings',
                    variables: ['employeeName', 'subject', 'date', 'time', 'location', 'attendees', 'duration', 'agenda', 'attachments'],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    id: '4',
                    name: 'leave_approval',
                    content: '🏖️ {{status}} طلب الإجازة\n\nعزيزي/عزيزتي {{employeeName}},\n\nبخصوص طلب الإجازة المقدم بتاريخ {{requestDate}}:\n\n📋 تفاصيل الطلب:\n📅 من: {{startDate}}\n📅 إلى: {{endDate}}\n📊 عدد الأيام: {{numberOfDays}}\n🏷️ نوع الإجازة: {{leaveType}}\n📝 السبب: {{reason}}\n\n✅ الحالة: {{status}}\n👤 تمت المراجعة من: {{reviewedBy}}\n📅 تاريخ المراجعة: {{reviewDate}}\n\n💬 ملاحظات الإدارة:\n{{managerNotes}}\n\n🔗 يمكنك مراجعة تفاصيل أكثر من النظام.\n\nشكراً لك! 🙏',
                    description: 'إشعار حالة طلب الإجازة',
                    category: 'hr',
                    variables: ['employeeName', 'status', 'requestDate', 'startDate', 'endDate', 'numberOfDays', 'leaveType', 'reason', 'reviewedBy', 'reviewDate', 'managerNotes'],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    id: '5',
                    name: 'general_announcement',
                    content: '📢 إعلان عام\n\n{{title}}\n\n{{content}}\n\n📅 التاريخ: {{date}}\n👤 من: {{sender}}\n🏢 القسم: {{department}}\n\n{{additionalInfo}}\n\n---\n💼 إدارة الموارد البشرية\n{{companyName}}',
                    description: 'قالب للإعلانات العامة',
                    category: 'general',
                    variables: ['title', 'content', 'date', 'sender', 'department', 'additionalInfo', 'companyName'],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    id: '6',
                    name: 'birthday_wishes',
                    content: '🎉 كل عام وأنت بخير!\n\nعزيزي/عزيزتي {{employeeName}},\n\nبمناسبة عيد ميلادك، نتقدم لك بأطيب التهاني وأجمل الأمنيات! 🎂🎈\n\n🎁 نتمنى لك عاماً مليئاً بالنجاح والسعادة والإنجازات.\n\nكل عام وأنت محاط بالحب والفرح! ❤️\n\n---\n🎊 فريق العمل في {{companyName}}\n💼 إدارة الموارد البشرية',
                    description: 'تهنئة بعيد الميلاد',
                    category: 'general',
                    variables: ['employeeName', 'companyName'],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    id: '7',
                    name: 'performance_review',
                    content: '📊 تقييم الأداء - {{period}}\n\nعزيزي/عزيزتي {{employeeName}},\n\nحان وقت تقييم الأداء للفترة {{period}}! 📈\n\n📅 موعد الاجتماع: {{meetingDate}}\n🕐 الوقت: {{meetingTime}}\n📍 المكان: {{meetingLocation}}\n👤 المقيم: {{reviewer}}\n\n📋 النقاط المطلوب مراجعتها:\n• الأهداف المحققة\n• التطوير المهني\n• التحديات والحلول\n• الخطط المستقبلية\n\n📎 يرجى مراجعة تقييمك الذاتي المرسل مسبقاً.\n\nنتطلع للقائك! 💪',
                    description: 'دعوة لتقييم الأداء',
                    category: 'hr',
                    variables: ['employeeName', 'period', 'meetingDate', 'meetingTime', 'meetingLocation', 'reviewer'],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            ];
            
            await this.saveTemplates(defaultTemplates);
        } catch (error) {
            console.error('Error initializing default templates:', error);
        }
    }

    // Load templates
    async loadTemplates() {
        try {
            if (await fs.pathExists(this.templatesFile)) {
                return await fs.readJson(this.templatesFile);
            }
        } catch (error) {
            console.error('Error loading templates:', error);
        }
        return [];
    }

    // Save templates
    async saveTemplates(templates) {
        try {
            await fs.writeJson(this.templatesFile, templates, { spaces: 2 });
            return true;
        } catch (error) {
            console.error('Error saving templates:', error);
            return false;
        }
    }

    // Load logs
    async loadLogs(limit = 1000) {
        try {
            if (await fs.pathExists(this.logsFile)) {
                const logs = await fs.readJson(this.logsFile);
                return logs.slice(0, limit);
            }
        } catch (error) {
            console.error('Error loading logs:', error);
        }
        return [];
    }

    // Save log entry
    async saveLog(logEntry) {
        try {
            const logs = await this.loadLogs();
            logs.unshift({
                id: Date.now().toString(),
                timestamp: new Date().toISOString(),
                ...logEntry
            });
            
            // Keep only last 2000 logs
            const trimmedLogs = logs.slice(0, 2000);
            await fs.writeJson(this.logsFile, trimmedLogs, { spaces: 2 });
            return true;
        } catch (error) {
            console.error('Error saving log:', error);
            return false;
        }
    }

    // Load contacts and chats
    async loadContactsAndChats() {
        try {
            if (!this.isReady) return;

            const contacts = await this.client.getContacts();
            const chats = await this.client.getChats();

            const contactsData = contacts.map(contact => ({
                id: contact.id.user,
                name: contact.name,
                pushname: contact.pushname,
                isGroup: contact.isGroup,
                isUser: contact.isUser,
                isWAContact: contact.isWAContact
            }));

            const chatsData = chats.map(chat => ({
                id: chat.id._serialized,
                name: chat.name,
                isGroup: chat.isGroup,
                timestamp: chat.timestamp,
                unreadCount: chat.unreadCount
            }));

            await fs.writeJson(this.contactsFile, contactsData, { spaces: 2 });
            await fs.writeJson(this.chatsFile, chatsData, { spaces: 2 });

            this.saveLog({
                type: 'contacts_loaded',
                status: 'success',
                message: `Loaded ${contactsData.length} contacts and ${chatsData.length} chats`
            });

        } catch (error) {
            console.error('Error loading contacts and chats:', error);
        }
    }

    // Auto-reply methods
    async getAutoReplies() {
        try {
            const autoReplyFile = path.join(this.dataDir, 'auto-replies.json');
            if (await fs.pathExists(autoReplyFile)) {
                return await fs.readJson(autoReplyFile);
            }
            return [];
        } catch (error) {
            console.error('Error loading auto-replies:', error);
            return [];
        }
    }

    // Utility Methods - Egyptian Phone Numbers
    validatePhoneNumber(phone) {
        const cleanPhone = phone.replace(/[^\d]/g, '');
        
        // Egyptian international format: 201XXXXXXXX (12 digits)
        if (cleanPhone.startsWith('20')) {
            // Must be 12 digits and start with 2010, 2011, 2012, or 2015
            return cleanPhone.length === 12 && 
                   /^20(10|11|12|15)\d{8}$/.test(cleanPhone);
        }
        
        // Egyptian local format: 01XXXXXXXX (11 digits)
        if (cleanPhone.startsWith('0')) {
            // Must be 11 digits and start with 010, 011, 012, or 015
            return cleanPhone.length === 11 && 
                   /^0(10|11|12|15)\d{8}$/.test(cleanPhone);
        }
        
        // Without prefix: 1XXXXXXXX (10 digits starting with 10, 11, 12, or 15)
        if (cleanPhone.match(/^1[0125]\d{8}$/)) {
            return cleanPhone.length === 10;
        }
        
        return false;
    }

    formatPhoneNumber(phone) {
        const cleanPhone = phone.replace(/[^\d]/g, '');
        
        // Already in international format: 201XXXXXXXX
        if (cleanPhone.startsWith('20') && cleanPhone.length === 12) {
            return cleanPhone;
        }
        
        // Local format with 0: 01XXXXXXXX -> 201XXXXXXXX
        if (cleanPhone.startsWith('0') && cleanPhone.length === 11) {
            return '20' + cleanPhone.substring(1);
        }
        
        // Without prefix: 1XXXXXXXX -> 201XXXXXXXX
        if (cleanPhone.match(/^1[0125]\d{8}$/) && cleanPhone.length === 10) {
            return '20' + cleanPhone;
        }
        
        // If none of the above, assume it should be Egyptian and add 20 prefix
        return '20' + cleanPhone;
    }

    // HR Integration Methods
    async sendWelcomeMessage(employeeData) {
        return await this.sendTemplateMessage(
            employeeData.phone,
            'welcome_employee',
            {
                employeeName: employeeData.name,
                companyName: employeeData.companyName || 'شركتنا',
                department: employeeData.department,
                position: employeeData.position,
                startDate: employeeData.startDate,
                email: employeeData.email,
                systemUrl: employeeData.systemUrl || 'http://localhost:3000'
            }
        );
    }

    async sendSalaryNotification(employeeData, salaryData) {
        return await this.sendTemplateMessage(
            employeeData.phone,
            'salary_notification',
            {
                employeeName: employeeData.name,
                month: salaryData.month,
                amount: salaryData.amount,
                paymentDate: salaryData.paymentDate || new Date().toLocaleDateString('ar-SA'),
                paymentMethod: salaryData.paymentMethod || 'تحويل بنكي',
                transactionId: salaryData.transactionId || 'TXN' + Date.now(),
                basicSalary: salaryData.basicSalary,
                allowances: salaryData.allowances || '0',
                deductions: salaryData.deductions || '0',
                netSalary: salaryData.netSalary || salaryData.amount
            }
        );
    }

    async sendMeetingReminder(attendees, meetingData) {
        const recipients = attendees.map(attendee => ({
            phone: attendee.phone,
            name: attendee.name,
            employeeName: attendee.name,
            subject: meetingData.subject,
            date: meetingData.date,
            time: meetingData.time,
            location: meetingData.location || 'لم يحدد',
            attendees: meetingData.attendeesList || 'حسب الدعوة',
            duration: meetingData.duration || 'ساعة واحدة',
            agenda: meetingData.agenda || 'سيتم الإعلان عنها',
            attachments: meetingData.attachments || 'لا توجد'
        }));

        return await this.sendBulkMessages(recipients, null, 'meeting_reminder');
    }

    async sendLeaveApprovalNotification(employeeData, leaveData) {
        return await this.sendTemplateMessage(
            employeeData.phone,
            'leave_approval',
            {
                employeeName: employeeData.name,
                status: leaveData.approved ? '✅ تم قبول' : '❌ تم رفض',
                requestDate: leaveData.requestDate,
                startDate: leaveData.startDate,
                endDate: leaveData.endDate,
                numberOfDays: leaveData.numberOfDays,
                leaveType: leaveData.leaveType,
                reason: leaveData.reason,
                reviewedBy: leaveData.reviewedBy,
                reviewDate: leaveData.reviewDate || new Date().toLocaleDateString('ar-SA'),
                managerNotes: leaveData.managerNotes || 'لا توجد ملاحظات إضافية'
            }
        );
    }

    async sendHRNotification(employees, message, category = 'general') {
        const recipients = employees.map(emp => ({
            phone: emp.phone,
            name: emp.name,
            title: 'إشعار من إدارة الموارد البشرية',
            content: message,
            date: new Date().toLocaleDateString('ar-SA'),
            sender: 'إدارة الموارد البشرية',
            department: emp.department || 'جميع الأقسام',
            additionalInfo: '',
            companyName: 'شركتنا'
        }));

        return await this.sendBulkMessages(recipients, null, 'general_announcement');
    }

    // Backup and restore
    async createBackup() {
        try {
            const backupDir = path.join(this.dataDir, 'backups');
            const timestamp = moment().format('YYYY-MM-DD_HH-mm-ss');
            const backupFile = path.join(backupDir, `backup_${timestamp}.json`);

            const backupData = {
                timestamp: new Date().toISOString(),
                config: await this.loadConfig(),
                templates: await this.loadTemplates(),
                stats: this.stats,
                logs: await this.loadLogs(500) // Last 500 logs
            };

            await fs.writeJson(backupFile, backupData, { spaces: 2 });
            
            this.saveLog({
                type: 'backup_created',
                status: 'success',
                message: `Backup created: ${backupFile}`
            });

            return { success: true, file: backupFile };
        } catch (error) {
            console.error('Error creating backup:', error);
            return { success: false, error: error.message };
        }
    }

    // Cleanup old logs and backups
    async cleanup() {
        try {
            const logs = await this.loadLogs();
            const oldLogs = logs.filter(log => 
                moment().diff(moment(log.timestamp), 'days') > 30
            );

            if (oldLogs.length > 0) {
                const recentLogs = logs.filter(log => 
                    moment().diff(moment(log.timestamp), 'days') <= 30
                );
                await fs.writeJson(this.logsFile, recentLogs, { spaces: 2 });
                
                this.saveLog({
                    type: 'cleanup_completed',
                    status: 'success',
                    message: `Cleaned ${oldLogs.length} old logs`
                });
            }

            return { success: true, removedLogs: oldLogs.length };
        } catch (error) {
            console.error('Error during cleanup:', error);
            return { success: false, error: error.message };
        }
    }

    // Clear Sessions and Reset WhatsApp
    async clearSessions() {
        try {
            console.log('🗑️ Starting session clearing process...');
            
            // 1. Disconnect the current client if connected
            if (this.client) {
                try {
                    console.log('📱 Disconnecting current WhatsApp client...');
                    await this.client.destroy();
                    this.client = null;
                    console.log('✅ WhatsApp client disconnected');
                } catch (error) {
                    console.log('⚠️ Error disconnecting client:', error.message);
                }
            }

            // 2. Clear session directory
            const sessionDir = path.join(this.dataDir, 'session');
            try {
                if (await fs.pathExists(sessionDir)) {
                    console.log('📂 Removing session directory:', sessionDir);
                    await fs.remove(sessionDir);
                    console.log('✅ Session directory removed');
                } else {
                    console.log('📂 Session directory doesn\'t exist');
                }
            } catch (error) {
                console.log('⚠️ Error removing session directory:', error.message);
            }

            // 3. Clear QR codes
            try {
                const qrFiles = [
                    path.join(this.dataDir, 'qr_debug.png'),
                    path.join(this.dataDir, 'qr_code.png')
                ];
                
                for (const qrFile of qrFiles) {
                    if (await fs.pathExists(qrFile)) {
                        await fs.remove(qrFile);
                        console.log('🗑️ Removed QR file:', qrFile);
                    }
                }
            } catch (error) {
                console.log('⚠️ Error removing QR files:', error.message);
            }

            // 4. Reset internal state completely
            this.isReady = false;
            this.isConnecting = false;
            this.qrCode = null;
            this.qrCodeUrl = null;
            this.status = 'disconnected';
            this.connectionStatus = 'disconnected'; // This is what getStatus() reads
            this.authInfo = null;
            this.connectedAt = null;
            this.clientInfo = null;
            
            // Reset stats to initial state
            this.stats = {
                totalMessages: 0,
                successfulMessages: 0,
                failedMessages: 0,
                bulkMessages: 0,
                templateMessages: 0,
                receivedMessages: 0,
                startTime: new Date().toISOString(),
                qrGenerations: 0
            };
            
            console.log('🔄 Internal state reset');

            // 5. Clear saved files (stats, config, etc.)
            try {
                const filesToClear = [
                    this.statsFile,    // stats.json
                    this.configFile,   // config.json
                    this.contactsFile, // contacts.json  
                    this.chatsFile     // chats.json
                ];
                
                for (const file of filesToClear) {
                    if (await fs.pathExists(file)) {
                        await fs.remove(file);
                        console.log('🗑️ Removed data file:', path.basename(file));
                    }
                }
                
                // Reset files to initial state
                await this.saveStats(); // This will create a new clean stats file
                
            } catch (error) {
                console.log('⚠️ Error clearing data files:', error.message);
            }

            // 6. Save log entry
            await this.saveLog({
                type: 'sessions_cleared',
                status: 'success',
                message: 'All sessions and data cleared successfully'
            });

            console.log('✅ Session clearing completed successfully');

            return {
                success: true,
                message: 'تم مسح جميع البيانات والجلسات بنجاح. يمكنك الآن البدء من جديد.',
                timestamp: new Date().toISOString(),
                actions: [
                    'Client disconnected',
                    'Session directory removed',
                    'QR codes cleared',
                    'Internal state reset'
                ]
            };
        } catch (error) {
            console.error('❌ Error clearing sessions:', error);
            
            await this.saveLog({
                type: 'sessions_clear_failed',
                status: 'error',
                message: error.message
            });

            return {
                success: false,
                message: 'فشل في مسح البيانات: ' + error.message,
                error: error.stack
            };
        }
    }
}

module.exports = new WhatsAppManager(); 