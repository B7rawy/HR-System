const fs = require('fs').promises;
const path = require('path');

// تأكد من وجود مجلد الوجات
const logsDir = path.join(__dirname, '../data/logs');
const logsFile = path.join(logsDir, 'system_logs.json');

// إنشاء مجلد الوجات إذا لم يكن موجوداً
async function ensureLogsDir() {
  try {
    await fs.access(logsDir);
  } catch (error) {
    await fs.mkdir(logsDir, { recursive: true });
  }
}

// قراءة الوجات الموجودة
async function readLogs() {
  try {
    await ensureLogsDir();
    const data = await fs.readFile(logsFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// كتابة الوجات
async function writeLogs(logs) {
  await ensureLogsDir();
  await fs.writeFile(logsFile, JSON.stringify(logs, null, 2));
}

// إضافة لوج جديد
async function addLog(logEntry) {
  const logs = await readLogs();
  logs.unshift({
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    ...logEntry
  });
  
  // الاحتفاظ بآخر 1000 سجل فقط
  if (logs.length > 1000) {
    logs.splice(1000);
  }
  
  await writeLogs(logs);
}

// middleware للتسجيل التلقائي
const auditLogger = (action, resource) => {
  return async (req, res, next) => {
    const originalSend = res.send;
    
    res.send = function(data) {
      // تسجيل العملية بعد نجاحها
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const logEntry = {
          action,
          resource,
          user: req.user ? req.user.name : 'غير معروف',
          userId: req.user ? req.user.id : null,
          method: req.method,
          endpoint: req.originalUrl,
          ip: req.ip || req.connection.remoteAddress,
          userAgent: req.get('User-Agent'),
          details: getActionDetails(req, action, resource),
          status: 'نجح',
          statusCode: res.statusCode
        };
        
        addLog(logEntry).catch(console.error);
      }
      
      return originalSend.call(this, data);
    };
    
    next();
  };
};

// استخراج تفاصيل العملية
function getActionDetails(req, action, resource) {
  const details = {};
  
  switch (action) {
    case 'إضافة':
      details.data = req.body;
      break;
    case 'تعديل':
      details.id = req.params.id;
      details.changes = req.body;
      break;
    case 'حذف':
      details.id = req.params.id;
      break;
    case 'عرض':
      details.query = req.query;
      break;
    case 'تسجيل دخول':
      details.email = req.body.email;
      break;
    case 'تسجيل خروج':
      break;
    default:
      details.data = req.body;
  }
  
  return details;
}

// تسجيل لوج يدوي
async function logActivity(user, action, resource, details = {}, status = 'نجح') {
  const logEntry = {
    action,
    resource,
    user: user?.name || 'النظام',
    userId: user?.id || null,
    details,
    status,
    ip: 'localhost',
    userAgent: 'نظام داخلي'
  };
  
  await addLog(logEntry);
}

module.exports = {
  auditLogger,
  logActivity,
  readLogs,
  addLog
}; 