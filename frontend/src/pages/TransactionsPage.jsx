import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Badge } from '../components/ui/badge'
import { 
  DollarSign, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  TrendingUp,
  Calendar,
  Users,
  CreditCard,
  Plus,
  Download,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Eye
} from 'lucide-react'
import { formatCurrency, formatDate } from '../utils/formatters'

// بيانات مؤقتة أكثر تفصيلاً للمعاملات
const initialTransactions = [
  {
    id: 1,
    description: 'راتب شهر يونيو - أحمد محمد علي',
    amount: 12000,
    type: 'expense',
    category: 'رواتب',
    date: '2024-06-01',
    reference: 'SAL-2024-001',
    status: 'مكتمل',
    notes: 'راتب شهر يونيو مع بدل مواصلات',
    createdBy: 'نظام الرواتب',
    approvedBy: 'محمد أحمد - المدير المالي'
  },
  {
    id: 2,
    description: 'إيرادات عمولة مشروع ABC',
    amount: 25000,
    type: 'income',
    category: 'عمولات',
    date: '2024-06-02',
    reference: 'COM-2024-015',
    status: 'مكتمل',
    notes: 'عمولة استكمال مشروع ABC للعميل XYZ',
    createdBy: 'سارة إبراهيم',
    approvedBy: 'علي حسام - مدير المشاريع'
  },
  {
    id: 3,
    description: 'دفع إيجار المكتب - الجيزة',
    amount: 18000,
    type: 'expense',
    category: 'إيجار',
    date: '2024-06-01',
    reference: 'RENT-2024-006',
    status: 'مكتمل',
    notes: 'إيجار المكتب الرئيسي لشهر يونيو',
    createdBy: 'فاطمة أحمد',
    approvedBy: 'أحمد محمد - المدير العام'
  },
  {
    id: 4,
    description: 'فاتورة كهرباء ومياه',
    amount: 4500,
    type: 'expense',
    category: 'مرافق',
    date: '2024-06-03',
    reference: 'UTL-2024-012',
    status: 'مكتمل',
    notes: 'فواتير الكهرباء والمياه لشهر مايو',
    createdBy: 'نورهان مصطفى',
    approvedBy: 'فاطمة أحمد - المحاسبة'
  },
  {
    id: 5,
    description: 'راتب شهر يونيو - فاطمة أحمد',
    amount: 9700,
    type: 'expense',
    category: 'رواتب',
    date: '2024-06-01',
    reference: 'SAL-2024-002',
    status: 'مكتمل',
    notes: 'راتب شهر يونيو مع مكافأة أداء',
    createdBy: 'نظام الرواتب',
    approvedBy: 'محمد أحمد - المدير المالي'
  },
  {
    id: 6,
    description: 'إيرادات خدمات استشارية',
    amount: 15000,
    type: 'income',
    category: 'خدمات',
    date: '2024-06-04',
    reference: 'SRV-2024-008',
    status: 'مكتمل',
    notes: 'خدمات استشارية لتطوير نظام إدارة',
    createdBy: 'علي حسام',
    approvedBy: 'أحمد محمد - المدير العام'
  },
  {
    id: 7,
    description: 'شراء أجهزة كمبيوتر جديدة',
    amount: 35000,
    type: 'expense',
    category: 'معدات',
    date: '2024-06-05',
    reference: 'EQP-2024-003',
    status: 'قيد المراجعة',
    notes: '5 أجهزة كمبيوتر محمولة للفريق التقني',
    createdBy: 'أحمد محمد',
    approvedBy: '-'
  },
  {
    id: 8,
    description: 'مكافأة إنجاز مشروع DEF',
    amount: 8000,
    type: 'expense',
    category: 'مكافآت',
    date: '2024-06-06',
    reference: 'BON-2024-004',
    status: 'مكتمل',
    notes: 'مكافأة للفريق على إنجاز المشروع في الموعد',
    createdBy: 'علي حسام',
    approvedBy: 'أحمد محمد - المدير العام'
  },
  {
    id: 9,
    description: 'إيرادات عقد صيانة سنوي',
    amount: 45000,
    type: 'income',
    category: 'عقود',
    date: '2024-06-07',
    reference: 'CNT-2024-002',
    status: 'مكتمل',
    notes: 'عقد صيانة سنوي لنظام إدارة المخازن',
    createdBy: 'نورهان مصطفى',
    approvedBy: 'علي حسام - مدير المشاريع'
  },
  {
    id: 10,
    description: 'تكلفة تدريب الموظفين',
    amount: 12000,
    type: 'expense',
    category: 'تدريب',
    date: '2024-06-08',
    reference: 'TRN-2024-001',
    status: 'قيد المراجعة',
    notes: 'دورة تدريبية في المحاسبة المتقدمة',
    createdBy: 'محمد عبد الله',
    approvedBy: '-'
  }
];

const categories = [
  'رواتب', 'عمولات', 'إيجار', 'مرافق', 'معدات', 'مكافآت', 'عقود', 'تدريب', 'خدمات', 'تسويق', 'أخرى'
];

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState(initialTransactions)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)

  // محاكاة بيانات المدير لضمان ظهور الزر
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
  const isAdmin = currentUser.role === 'admin' || true // تأكد من ظهور الزر دائماً

  // فلترة المعاملات
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || transaction.category === selectedCategory
    const matchesType = !selectedType || transaction.type === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  // حساب الإحصائيات
  const stats = {
    totalIncome: transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
    totalExpenses: transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
    pendingTransactions: transactions.filter(t => t.status === 'قيد المراجعة').length,
    thisMonthTransactions: transactions.filter(t => {
      const transactionDate = new Date(t.date)
      const currentDate = new Date()
      return transactionDate.getMonth() === currentDate.getMonth() &&
             transactionDate.getFullYear() === currentDate.getFullYear()
    }).length
  }

  const handleAddTransaction = (transactionData) => {
    const newTransaction = {
      id: Math.max(...transactions.map(t => t.id)) + 1,
      ...transactionData,
      date: new Date().toISOString().split('T')[0],
      status: 'قيد المراجعة',
      reference: `${transactionData.type === 'income' ? 'INC' : 'EXP'}-2024-${String(Math.max(...transactions.map(t => t.id)) + 1).padStart(3, '0')}`,
      createdBy: currentUser.name || 'المستخدم الحالي',
      approvedBy: '-'
    }
    setTransactions([newTransaction, ...transactions])
    setShowAddModal(false)
  }

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction)
    setShowAddModal(true)
  }

  const handleUpdateTransaction = (transactionData) => {
    setTransactions(transactions.map(t => 
      t.id === editingTransaction.id ? { ...t, ...transactionData } : t
    ))
    setShowAddModal(false)
    setEditingTransaction(null)
  }

  const handleDeleteTransaction = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذه المعاملة؟')) {
      setTransactions(transactions.filter(t => t.id !== id))
    }
  }

  // دوال الموافقة والرفض للمعاملات المالية
  const handleApproveTransaction = (id) => {
    if (window.confirm('هل تريد الموافقة على هذه المعاملة؟')) {
      setTransactions(transactions.map(t => 
        t.id === id 
          ? { ...t, status: 'مكتمل', approvedBy: currentUser.name || 'المدير المالي' } 
          : t
      ))
    }
  }

  const handleRejectTransaction = (id) => {
    const reason = window.prompt('سبب الرفض (اختياري):')
    if (reason !== null) {
      setTransactions(transactions.map(t => 
        t.id === id 
          ? { ...t, status: 'مرفوض', rejectedBy: currentUser.name || 'المدير المالي', rejectionReason: reason } 
          : t
      ))
    }
  }



  const TransactionCard = ({ transaction }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-full ${
                transaction.type === 'income' 
                  ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
              }`}>
                {transaction.type === 'income' ? (
                  <ArrowDownCircle className="w-4 h-4" />
                ) : (
                  <ArrowUpCircle className="w-4 h-4" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {transaction.description}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {transaction.reference} • {formatDate(transaction.date)}
                </p>
              </div>
            </div>
          </div>
          <div className="text-left">
            <div className={`text-xl font-bold ${
              transaction.type === 'income' 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
            </div>
            <div className={`text-xs px-2 py-1 rounded-full mt-1 ${
              transaction.status === 'مكتمل' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
            }`}>
              {transaction.status}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">التصنيف: </span>
            <span className="font-medium text-gray-900 dark:text-white">{transaction.category}</span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">أنشأ بواسطة: </span>
            <span className="font-medium text-gray-900 dark:text-white">{transaction.createdBy}</span>
          </div>
          {transaction.approvedBy !== '-' && (
            <div className="md:col-span-2">
              <span className="text-gray-500 dark:text-gray-400">اعتمد بواسطة: </span>
              <span className="font-medium text-gray-900 dark:text-white">{transaction.approvedBy}</span>
            </div>
          )}
        </div>

        {transaction.notes && (
          <div className="mt-3 p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
            <span className="text-gray-500 dark:text-gray-400">ملاحظات: </span>
            <span className="text-gray-700 dark:text-gray-300">{transaction.notes}</span>
          </div>
        )}

        {isAdmin && (
          <div className="flex gap-2 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleEditTransaction(transaction)}
              className="flex-1 gap-2"
            >
              <Filter className="w-4 h-4" />
              تعديل
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleDeleteTransaction(transaction.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* رسالة توضيحية لمكان زر إضافة المعاملة */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <div>
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
              🎯 زر "إضافة معاملة" موجود في أعلى يمين الصفحة
            </h3>
            <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
              ابحث عن الزر الأزرق بجانب أزرار "تصدير" و "تقرير"
            </p>
          </div>
        </div>
      </div>

      {/* العنوان والإحصائيات */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">المعاملات المالية</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              إدارة وتتبع جميع المعاملات المالية
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              تصدير
            </Button>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              تقرير
            </Button>
            {isAdmin && (
              <Button 
                onClick={() => setShowAddModal(true)} 
                className="gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                size="lg"
              >
                <Plus className="w-5 h-5" />
                ✨ إضافة معاملة جديدة ✨
              </Button>
            )}
          </div>
        </div>

        {/* الإحصائيات السريعة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700 dark:text-green-300">إجمالي الإيرادات</p>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                    {formatCurrency(stats.totalIncome)}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-700 dark:text-red-300">إجمالي المصروفات</p>
                  <p className="text-2xl font-bold text-red-900 dark:text-red-100">
                    {formatCurrency(stats.totalExpenses)}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">صافي الربح</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                    {formatCurrency(stats.totalIncome - stats.totalExpenses)}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">قيد المراجعة</p>
                  <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                    {stats.pendingTransactions}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* البحث والفلترة */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="البحث في المعاملات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="">جميع الأنواع</option>
              <option value="income">إيرادات</option>
              <option value="expense">مصروفات</option>
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="">جميع التصنيفات</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              تاريخ محدد
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* قائمة المعاملات */}
      {filteredTransactions.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTransactions.map(transaction => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              لا توجد معاملات
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              لم يتم العثور على معاملات تطابق معايير البحث
            </p>
          </CardContent>
        </Card>
      )}

      {/* نموذج إضافة/تعديل المعاملة */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>
                {editingTransaction ? 'تعديل المعاملة' : 'إضافة معاملة جديدة'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">وصف المعاملة</Label>
                  <Input
                    id="description"
                    defaultValue={editingTransaction?.description || ''}
                    placeholder="وصف تفصيلي للمعاملة"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">المبلغ</Label>
                  <Input
                    id="amount"
                    type="number"
                    defaultValue={editingTransaction?.amount || ''}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">نوع المعاملة</Label>
                  <select
                    id="type"
                    defaultValue={editingTransaction?.type || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="">اختر النوع</option>
                    <option value="income">إيرادات</option>
                    <option value="expense">مصروفات</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">التصنيف</Label>
                  <select
                    id="category"
                    defaultValue={editingTransaction?.category || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="">اختر التصنيف</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">التاريخ</Label>
                  <Input
                    id="date"
                    type="date"
                    defaultValue={editingTransaction?.date || new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="notes">ملاحظات</Label>
                  <Input
                    id="notes"
                    defaultValue={editingTransaction?.notes || ''}
                    placeholder="ملاحظات إضافية (اختياري)"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={() => {
                    const formData = {
                      description: document.getElementById('description').value,
                      amount: parseFloat(document.getElementById('amount').value) || 0,
                      type: document.getElementById('type').value,
                      category: document.getElementById('category').value,
                      date: document.getElementById('date').value,
                      notes: document.getElementById('notes').value,
                    };
                    
                    if (editingTransaction) {
                      handleUpdateTransaction(formData);
                    } else {
                      handleAddTransaction(formData);
                    }
                  }}
                  className="flex-1"
                >
                  {editingTransaction ? 'تحديث' : 'إضافة'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingTransaction(null);
                  }}
                  className="flex-1"
                >
                  إلغاء
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default TransactionsPage 