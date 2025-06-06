const express = require('express');
const rateLimit = require('express-rate-limit');
const WhatsAppManager = require('../services/WhatsAppManager');
const router = express.Router();

// Rate limiting middleware
const createRateLimit = (windowMs, max, message) => rateLimit({
    windowMs,
    max,
    message: { success: false, message },
    standardHeaders: true,
    legacyHeaders: false,
});

// General rate limit
const generalLimit = createRateLimit(15 * 60 * 1000, 100, 'Too many requests');

// Message sending rate limit
const messageLimit = createRateLimit(60 * 1000, 20, 'Too many messages sent');

// Bulk messaging rate limit
const bulkLimit = createRateLimit(60 * 1000, 5, 'Too many bulk operations');

// Health check and clear sessions (no rate limiting)
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'WhatsApp service is running',
        timestamp: new Date().toISOString(),
        uptime: WhatsAppManager.getUptime()
    });
});

// Clear Sessions and Reset (No rate limiting for this critical operation)
router.post('/clear-sessions', async (req, res) => {
    try {
        const result = await WhatsAppManager.clearSessions();
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error.stack
        });
    }
});

// Apply general rate limiting to all other routes
router.use(generalLimit);

// Connection Management
router.post('/initialize', async (req, res) => {
    try {
        const result = await WhatsAppManager.initialize();
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.post('/disconnect', async (req, res) => {
    try {
        const result = await WhatsAppManager.disconnect();
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.get('/status', (req, res) => {
    try {
        const status = WhatsAppManager.getStatus();
        res.json({
            success: true,
            ...status
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Message Operations
router.post('/send', messageLimit, async (req, res) => {
    try {
        const { to, message, options } = req.body;
        
        if (!to || !message) {
            return res.status(400).json({
                success: false,
                message: 'Phone number and message are required'
            });
        }

        const result = await WhatsAppManager.sendMessage(to, message, options || {});
        res.json(result);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.post('/send-template', messageLimit, async (req, res) => {
    try {
        const { to, templateName, templateData } = req.body;
        
        if (!to || !templateName) {
            return res.status(400).json({
                success: false,
                message: 'Phone number and template name are required'
            });
        }

        const result = await WhatsAppManager.sendTemplateMessage(to, templateName, templateData || {});
        res.json(result);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.post('/send-bulk', bulkLimit, async (req, res) => {
    try {
        const { recipients, message, templateName, options } = req.body;
        
        if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Recipients array is required'
            });
        }

        if (recipients.length > 50) {
            return res.status(400).json({
                success: false,
                message: 'Maximum 50 recipients allowed per bulk operation'
            });
        }

        const result = await WhatsAppManager.sendBulkMessages(
            recipients,
            message,
            templateName,
            options || {}
        );
        
        res.json({
            success: true,
            ...result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.post('/send-media', messageLimit, async (req, res) => {
    try {
        const { to, mediaPath, caption, options } = req.body;
        
        if (!to || !mediaPath) {
            return res.status(400).json({
                success: false,
                message: 'Phone number and media path are required'
            });
        }

        const result = await WhatsAppManager.sendMedia(to, mediaPath, caption || '', options || {});
        res.json(result);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Template Management
router.get('/templates', async (req, res) => {
    try {
        const templates = await WhatsAppManager.loadTemplates();
        res.json({
            success: true,
            templates,
            total: templates.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Load test templates
router.post('/load-test-templates', async (req, res) => {
    try {
        const fs = require('fs-extra');
        const path = require('path');
        
        const testTemplatesPath = path.join(__dirname, '../data/whatsapp/test-templates.json');
        
        if (await fs.pathExists(testTemplatesPath)) {
            const testTemplatesData = await fs.readJson(testTemplatesPath);
            const currentTemplates = await WhatsAppManager.loadTemplates();
            
            // Add test templates to current ones (avoid duplicates)
            for (const testTemplate of testTemplatesData.templates) {
                const exists = currentTemplates.find(t => t.id === testTemplate.id);
                if (!exists) {
                    currentTemplates.push(testTemplate);
                }
            }
            
            await WhatsAppManager.saveTemplates(currentTemplates);
            
            res.json({
                success: true,
                message: 'Test templates loaded successfully',
                added: testTemplatesData.templates.length,
                total: currentTemplates.length
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Test templates file not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.get('/templates/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const templates = await WhatsAppManager.loadTemplates();
        const template = templates.find(t => t.id === id);
        
        if (!template) {
            return res.status(404).json({
                success: false,
                message: 'Template not found'
            });
        }

        res.json({
            success: true,
            template
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.post('/templates', async (req, res) => {
    try {
        const { name, content, description, category, variables } = req.body;
        
        if (!name || !content) {
            return res.status(400).json({
                success: false,
                message: 'Template name and content are required'
            });
        }

        const templates = await WhatsAppManager.loadTemplates();
        
        if (templates.find(t => t.name === name)) {
            return res.status(400).json({
                success: false,
                message: 'Template name already exists'
            });
        }

        const newTemplate = {
            id: Date.now().toString(),
            name: name.toLowerCase().replace(/[^a-z0-9_]/g, '_'),
            content,
            description: description || '',
            category: category || 'general',
            variables: variables || [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        templates.push(newTemplate);
        await WhatsAppManager.saveTemplates(templates);

        res.json({
            success: true,
            message: 'Template created successfully',
            template: newTemplate
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.put('/templates/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, content, description, category, variables } = req.body;
        
        const templates = await WhatsAppManager.loadTemplates();
        const templateIndex = templates.findIndex(t => t.id === id);
        
        if (templateIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Template not found'
            });
        }

        if (name && name !== templates[templateIndex].name) {
            if (templates.find(t => t.name === name && t.id !== id)) {
                return res.status(400).json({
                    success: false,
                    message: 'Template name already exists'
                });
            }
        }

        const updatedTemplate = {
            ...templates[templateIndex],
            name: name ? name.toLowerCase().replace(/[^a-z0-9_]/g, '_') : templates[templateIndex].name,
            content: content || templates[templateIndex].content,
            description: description !== undefined ? description : templates[templateIndex].description,
            category: category || templates[templateIndex].category,
            variables: variables || templates[templateIndex].variables,
            updatedAt: new Date().toISOString()
        };

        templates[templateIndex] = updatedTemplate;
        await WhatsAppManager.saveTemplates(templates);

        res.json({
            success: true,
            message: 'Template updated successfully',
            template: updatedTemplate
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.delete('/templates/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const templates = await WhatsAppManager.loadTemplates();
        const templateIndex = templates.findIndex(t => t.id === id);
        
        if (templateIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Template not found'
            });
        }

        const deletedTemplate = templates.splice(templateIndex, 1)[0];
        await WhatsAppManager.saveTemplates(templates);

        res.json({
            success: true,
            message: 'Template deleted successfully',
            template: deletedTemplate
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Template preview
router.post('/templates/preview', async (req, res) => {
    try {
        const { templateName, templateData } = req.body;
        
        if (!templateName) {
            return res.status(400).json({
                success: false,
                message: 'Template name is required'
            });
        }

        const templates = await WhatsAppManager.loadTemplates();
        const template = templates.find(t => t.name === templateName);
        
        if (!template) {
            return res.status(404).json({
                success: false,
                message: 'Template not found'
            });
        }

        let preview = template.content;
        const data = templateData || {};
        
        Object.keys(data).forEach(key => {
            const placeholder = new RegExp(`{{${key}}}`, 'g');
            preview = preview.replace(placeholder, data[key] || '');
        });

        res.json({
            success: true,
            preview,
            template: {
                name: template.name,
                description: template.description,
                category: template.category,
                variables: template.variables
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Statistics and Analytics
router.get('/stats', async (req, res) => {
    try {
        const days = parseInt(req.query.days) || 30;
        const stats = await WhatsAppManager.getMessageStats(days);
        
        res.json({
            success: true,
            stats,
            period: `${days} days`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.get('/logs', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 100;
        const type = req.query.type;
        const status = req.query.status;
        
        let logs = await WhatsAppManager.loadLogs(limit * 2); // Load more for filtering
        
        if (type) {
            logs = logs.filter(log => log.type === type);
        }
        
        if (status) {
            logs = logs.filter(log => log.status === status);
        }
        
        logs = logs.slice(0, limit);
        
        res.json({
            success: true,
            logs,
            total: logs.length,
            filters: { type, status, limit }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Utility endpoints
router.post('/validate-phone', (req, res) => {
    try {
        const { phone } = req.body;
        
        if (!phone) {
            return res.status(400).json({
                success: false,
                message: 'Phone number is required'
            });
        }

        const isValid = WhatsAppManager.validatePhoneNumber(phone);
        const formatted = isValid ? WhatsAppManager.formatPhoneNumber(phone) : null;

        res.json({
            success: true,
            isValid,
            formatted,
            original: phone
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.post('/format-phone', (req, res) => {
    try {
        const { phones } = req.body;
        
        if (!Array.isArray(phones)) {
            return res.status(400).json({
                success: false,
                message: 'Phones array is required'
            });
        }

        const results = phones.map(phone => ({
            original: phone,
            formatted: WhatsAppManager.formatPhoneNumber(phone),
            isValid: WhatsAppManager.validatePhoneNumber(phone)
        }));

        res.json({
            success: true,
            results
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// HR Integration Routes
router.post('/hr/welcome', messageLimit, async (req, res) => {
    try {
        const employeeData = req.body;
        
        if (!employeeData.phone || !employeeData.name) {
            return res.status(400).json({
                success: false,
                message: 'Employee phone and name are required'
            });
        }

        const result = await WhatsAppManager.sendWelcomeMessage(employeeData);
        res.json(result);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.post('/hr/salary-notification', messageLimit, async (req, res) => {
    try {
        const { employeeData, salaryData } = req.body;
        
        if (!employeeData?.phone || !salaryData?.amount) {
            return res.status(400).json({
                success: false,
                message: 'Employee data and salary amount are required'
            });
        }

        const result = await WhatsAppManager.sendSalaryNotification(employeeData, salaryData);
        res.json(result);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.post('/hr/meeting-reminder', bulkLimit, async (req, res) => {
    try {
        const { attendees, meetingData } = req.body;
        
        if (!attendees || !Array.isArray(attendees) || !meetingData) {
            return res.status(400).json({
                success: false,
                message: 'Attendees array and meeting data are required'
            });
        }

        const result = await WhatsAppManager.sendMeetingReminder(attendees, meetingData);
        res.json({
            success: true,
            ...result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.post('/hr/leave-approval', messageLimit, async (req, res) => {
    try {
        const { employeeData, leaveData } = req.body;
        
        if (!employeeData?.phone || !leaveData) {
            return res.status(400).json({
                success: false,
                message: 'Employee data and leave data are required'
            });
        }

        const result = await WhatsAppManager.sendLeaveApprovalNotification(employeeData, leaveData);
        res.json(result);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.post('/hr/notification', bulkLimit, async (req, res) => {
    try {
        const { employees, message, category } = req.body;
        
        if (!employees || !Array.isArray(employees) || !message) {
            return res.status(400).json({
                success: false,
                message: 'Employees array and message are required'
            });
        }

        const result = await WhatsAppManager.sendHRNotification(employees, message, category);
        res.json({
            success: true,
            ...result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// System Management
router.post('/backup', async (req, res) => {
    try {
        const result = await WhatsAppManager.createBackup();
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.post('/cleanup', async (req, res) => {
    try {
        const result = await WhatsAppManager.cleanup();
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get QR Code as base64 (Enhanced)
router.get('/qr-code', (req, res) => {
    try {
        const status = WhatsAppManager.getStatus();
        const qrCode = WhatsAppManager.qrCode;
        
        console.log('🔍 QR Code request - Status:', status.status, 'QR Available:', !!qrCode);
        
        if (!qrCode || qrCode.length < 100) {
            console.log('❌ QR Code not ready or invalid');
            return res.json({
                success: false,
                message: 'QR Code not available yet - please wait for generation',
                status: status.status,
                qrAvailable: !!qrCode,
                details: {
                    isInitializing: status.status === 'connecting',
                    needsAuth: status.status === 'disconnected'
                }
            });
        }

        console.log('✅ Sending valid QR Code (length:', qrCode.length, ')');
        res.json({
            success: true,
            qrCode: qrCode,
            status: status.status,
            timestamp: new Date().toISOString(),
            qrMetadata: {
                length: qrCode.length,
                type: qrCode.startsWith('data:image/png;base64,') ? 'base64' : 'unknown',
                generatedAt: status.qrGeneratedAt || new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('❌ Error in QR Code endpoint:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get QR code',
            error: error.message,
            errorType: 'server_error'
        });
    }
});

// Get QR Code as image (Enhanced)
router.get('/qr-image', (req, res) => {
    try {
        const qrCode = WhatsAppManager.qrCode;
        
        console.log('🖼️ QR Image request - QR Available:', !!qrCode);
        
        if (qrCode && qrCode.startsWith('data:image/png;base64,')) {
            const base64Data = qrCode.replace('data:image/png;base64,', '');
            const imageBuffer = Buffer.from(base64Data, 'base64');
            
            console.log('✅ Sending QR image (', imageBuffer.length, 'bytes)');
            
            res.set({
                'Content-Type': 'image/png',
                'Content-Length': imageBuffer.length,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            });
            
            res.send(imageBuffer);
        } else {
            // محاولة استخدام الملف المحفوظ كخيار بديل
            const fs = require('fs');
            const path = require('path');
            const qrPath = path.join(__dirname, '../data/whatsapp/qr_debug.png');
            
            if (fs.existsSync(qrPath)) {
                console.log('📁 Serving saved QR file as fallback');
                res.setHeader('Content-Type', 'image/png');
                res.setHeader('Cache-Control', 'no-cache');
                res.sendFile(qrPath);
            } else {
                console.log('❌ QR Image not available');
                res.status(404).json({
                    success: false,
                    message: 'QR Code image not available',
                    qrAvailable: !!qrCode,
                    isValidFormat: qrCode ? qrCode.startsWith('data:image/png;base64,') : false
                });
            }
        }
    } catch (error) {
        console.error('❌ Error in QR Image endpoint:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to serve QR image',
            error: error.message
        });
    }
});

// QR Code Status Check (NEW)
router.get('/qr-status', (req, res) => {
    try {
        const status = WhatsAppManager.getStatus();
        const qrCode = WhatsAppManager.qrCode;
        
        res.json({
            success: true,
            qrReady: !!qrCode && qrCode.length > 100,
            status: status.status,
            timestamp: new Date().toISOString(),
            qrMetadata: qrCode ? {
                hasQR: true,
                length: qrCode.length,
                type: qrCode.startsWith('data:image/png;base64,') ? 'base64' : 'unknown',
                generatedAt: status.qrGeneratedAt || 'unknown'
            } : {
                hasQR: false,
                reason: status.status === 'disconnected' ? 'not_initialized' : 'generating'
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
router.get('/qr-status', (req, res) => {
    try {
        const status = WhatsAppManager.getStatus();
        const qrCode = WhatsAppManager.qrCode;
        
        res.json({
            success: true,
            qrReady: !!qrCode && qrCode.length > 100,
            status: status.status,
            timestamp: new Date().toISOString(),
            qrMetadata: qrCode ? {
                hasQR: true,
                length: qrCode.length,
                type: qrCode.startsWith('data:image/png;base64,') ? 'base64' : 'unknown',
                generatedAt: status.qrGeneratedAt || 'unknown'
            } : {
                hasQR: false,
                reason: status.status === 'disconnected' ? 'not_initialized' : 'generating'
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// WebSocket-like events endpoint (Server-Sent Events)
router.get('/events', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Cache-Control'
    });

    const sendEvent = (data) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    // Send initial status
    sendEvent({
        type: 'status',
        data: WhatsAppManager.getStatus()
    });

    // Set up event listeners
    const onQR = (data) => sendEvent({ type: 'qr', data });
    const onReady = (data) => sendEvent({ type: 'ready', data });
    const onDisconnected = (data) => sendEvent({ type: 'disconnected', data });
    const onMessageReceived = (data) => sendEvent({ type: 'message_received', data });

    WhatsAppManager.on('qr', onQR);
    WhatsAppManager.on('ready', onReady);
    WhatsAppManager.on('disconnected', onDisconnected);
    WhatsAppManager.on('message_received', onMessageReceived);

    // Clean up on client disconnect
    req.on('close', () => {
        // Remove event listeners (simplified - in real implementation would need proper cleanup)
        console.log('Client disconnected from events stream');
    });

    // Send heartbeat every 30 seconds
    const heartbeat = setInterval(() => {
        sendEvent({ type: 'heartbeat', data: { timestamp: new Date().toISOString() } });
    }, 30000);

    req.on('close', () => {
        clearInterval(heartbeat);
    });
});

module.exports = router; 