const express = require('express');
const router = express.Router();
const { auditLogger, logActivity } = require('../middleware/auditLogger');

// بيانات وهمية للمعاملات
let transactions = [
  {
    id: '1',
    amount: 5000,
    type: 'دخل',
    description: 'راتب شهر يناير',
    category: 'رواتب',
    date: '2024-01-15',
    status: 'مكتمل'
  },
  {
    id: '2',
    amount: 1500,
    type: 'مصروف',
    description: 'مستلزمات مكتبية',
    category: 'مصروفات إدارية',
    date: '2024-01-10',
    status: 'قيد المراجعة'
  }
];

// جلب جميع المعاملات
router.get('/', auditLogger('عرض', 'المعاملات المالية'), (req, res) => {
  res.json({
    success: true,
    data: transactions
  });
});

// جلب معاملة واحدة
router.get('/:id', auditLogger('عرض', 'المعاملات المالية'), (req, res) => {
  const transaction = transactions.find(t => t.id === req.params.id);
  
  if (!transaction) {
    return res.status(404).json({
      success: false,
      message: 'المعاملة غير موجودة'
    });
  }
  
  res.json({
    success: true,
    data: transaction
  });
});

// إضافة معاملة جديدة
router.post('/', auditLogger('إضافة', 'المعاملات المالية'), (req, res) => {
  const newTransaction = {
    id: (transactions.length + 1).toString(),
    ...req.body,
    date: new Date().toISOString().split('T')[0],
    status: 'مكتمل'
  };
  
  transactions.push(newTransaction);
  
  res.status(201).json({
    success: true,
    data: newTransaction,
    message: 'تم إضافة المعاملة بنجاح'
  });
});

// تعديل معاملة
router.put('/:id', auditLogger('تعديل', 'المعاملات المالية'), (req, res) => {
  const index = transactions.findIndex(t => t.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'المعاملة غير موجودة'
    });
  }
  
  transactions[index] = { ...transactions[index], ...req.body };
  
  res.json({
    success: true,
    data: transactions[index],
    message: 'تم تعديل المعاملة بنجاح'
  });
});

// حذف معاملة
router.delete('/:id', auditLogger('حذف', 'المعاملات المالية'), (req, res) => {
  const index = transactions.findIndex(t => t.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'المعاملة غير موجودة'
    });
  }
  
  const deletedTransaction = transactions.splice(index, 1)[0];
  
  res.json({
    success: true,
    data: deletedTransaction,
    message: 'تم حذف المعاملة بنجاح'
  });
});

// الموافقة على معاملة
router.post('/:id/approve', auditLogger('موافقة', 'المعاملات المالية'), (req, res) => {
  const index = transactions.findIndex(t => t.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'المعاملة غير موجودة'
    });
  }
  
  transactions[index].status = 'مكتمل';
  
  res.json({
    success: true,
    data: transactions[index],
    message: 'تم الموافقة على المعاملة'
  });
});

// رفض معاملة
router.post('/:id/reject', auditLogger('رفض', 'المعاملات المالية'), (req, res) => {
  const index = transactions.findIndex(t => t.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'المعاملة غير موجودة'
    });
  }
  
  transactions[index].status = 'مرفوض';
  transactions[index].rejectionReason = req.body.reason;
  
  res.json({
    success: true,
    data: transactions[index],
    message: 'تم رفض المعاملة'
  });
});

module.exports = router; 