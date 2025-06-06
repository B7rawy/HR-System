const express = require('express');
const router = express.Router();
const { readLogs, addLog } = require('../middleware/auditLogger');

// جلب جميع الوجات
router.get('/', async (req, res) => {
  try {
    const logs = await readLogs();
    const { page = 1, limit = 50, search, action, resource, dateFrom, dateTo } = req.query;
    
    let filteredLogs = logs;
    
    // تطبيق الفلاتر
    if (search) {
      const searchLower = search.toLowerCase();
      filteredLogs = filteredLogs.filter(log => 
        log.user?.toLowerCase().includes(searchLower) ||
        log.action?.toLowerCase().includes(searchLower) ||
        log.resource?.toLowerCase().includes(searchLower) ||
        log.endpoint?.toLowerCase().includes(searchLower)
      );
    }
    
    if (action) {
      filteredLogs = filteredLogs.filter(log => log.action === action);
    }
    
    if (resource) {
      filteredLogs = filteredLogs.filter(log => log.resource === resource);
    }
    
    if (dateFrom) {
      filteredLogs = filteredLogs.filter(log => new Date(log.timestamp) >= new Date(dateFrom));
    }
    
    if (dateTo) {
      filteredLogs = filteredLogs.filter(log => new Date(log.timestamp) <= new Date(dateTo));
    }
    
    // ترقيم الصفحات
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedLogs = filteredLogs.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: {
        logs: paginatedLogs,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(filteredLogs.length / limit),
          total: filteredLogs.length,
          hasNext: endIndex < filteredLogs.length,
          hasPrev: startIndex > 0
        }
      }
    });
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في جلب الوجات'
    });
  }
});

// جلب إحصائيات الوجات
router.get('/stats', async (req, res) => {
  try {
    const logs = await readLogs();
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const stats = {
      total: logs.length,
      today: logs.filter(log => new Date(log.timestamp) >= todayStart).length,
      thisWeek: logs.filter(log => new Date(log.timestamp) >= weekStart).length,
      thisMonth: logs.filter(log => new Date(log.timestamp) >= monthStart).length,
      byAction: {},
      byResource: {},
      byUser: {},
      recentActivity: logs.slice(0, 10)
    };
    
    // إحصائيات حسب النوع
    logs.forEach(log => {
      // حسب العملية
      stats.byAction[log.action] = (stats.byAction[log.action] || 0) + 1;
      
      // حسب المورد
      stats.byResource[log.resource] = (stats.byResource[log.resource] || 0) + 1;
      
      // حسب المستخدم
      stats.byUser[log.user] = (stats.byUser[log.user] || 0) + 1;
    });
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching logs stats:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في جلب إحصائيات الوجات'
    });
  }
});

// مسح الوجات (للمديرين فقط)
router.delete('/clear', async (req, res) => {
  try {
    const { logActivity } = require('../middleware/auditLogger');
    
    // تسجيل عملية المسح قبل المسح
    await logActivity(
      req.user,
      'مسح',
      'سجل النظام',
      { message: 'تم مسح جميع سجلات النظام' }
    );
    
    // مسح الوجات
    const { writeLogs } = require('../middleware/auditLogger');
    await writeLogs([]);
    
    res.json({
      success: true,
      message: 'تم مسح جميع الوجات بنجاح'
    });
  } catch (error) {
    console.error('Error clearing logs:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في مسح الوجات'
    });
  }
});

// تصدير الوجات
router.get('/export', async (req, res) => {
  try {
    const logs = await readLogs();
    const { format = 'json' } = req.query;
    
    if (format === 'csv') {
      let csv = 'التاريخ,المستخدم,العملية,المورد,الحالة,التفاصيل\n';
      logs.forEach(log => {
        csv += `"${log.timestamp}","${log.user}","${log.action}","${log.resource}","${log.status}","${JSON.stringify(log.details)}"\n`;
      });
      
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="system-logs-${new Date().toISOString().split('T')[0]}.csv"`);
      res.send('\ufeff' + csv); // BOM for UTF-8
    } else {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="system-logs-${new Date().toISOString().split('T')[0]}.json"`);
      res.json(logs);
    }
  } catch (error) {
    console.error('Error exporting logs:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في تصدير الوجات'
    });
  }
});

module.exports = router; 