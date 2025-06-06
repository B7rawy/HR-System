import React, { useState } from 'react'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { 
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  DollarSign,
  ArrowUpCircle,
  ArrowDownCircle
} from 'lucide-react'
import { formatCurrency, formatDate } from '../utils/formatters'

const ApprovalsPage = () => {
  // محاكاة بيانات المعاملات قيد المراجعة
  const [pendingTransactions, setPendingTransactions] = useState([
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
    },
    {
      id: 11,
      description: 'إيرادات مشروع جديد',
      amount: 50000,
      type: 'income',
      category: 'عمولات',
      date: '2024-06-09',
      reference: 'INC-2024-011',
      status: 'قيد المراجعة',
      notes: 'دفعة أولى من مشروع التطوير الجديد',
      createdBy: 'سارة إبراهيم',
      approvedBy: '-'
    }
  ])

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')

  const handleApprove = (id) => {
    if (window.confirm('هل تريد الموافقة على هذه المعاملة؟')) {
      setPendingTransactions(prev => prev.map(t => 
        t.id === id 
          ? { 
              ...t, 
              status: 'مكتمل', 
              approvedBy: currentUser.name || 'المدير المالي',
              approvedAt: new Date().toISOString()
            } 
          : t
      ))
      // إزالة المعاملة من قائمة المراجعة بعد 2 ثانية
      setTimeout(() => {
        setPendingTransactions(prev => prev.filter(t => t.id !== id))
      }, 2000)
    }
  }

  const handleReject = (id) => {
    const reason = window.prompt('سبب الرفض (اختياري):')
    if (reason !== null) {
      setPendingTransactions(prev => prev.map(t => 
        t.id === id 
          ? { 
              ...t, 
              status: 'مرفوض', 
              rejectedBy: currentUser.name || 'المدير المالي',
              rejectionReason: reason || 'لم يتم تحديد سبب',
              rejectedAt: new Date().toISOString()
            } 
          : t
      ))
      // إزالة المعاملة من قائمة المراجعة بعد 2 ثانية
      setTimeout(() => {
        setPendingTransactions(prev => prev.filter(t => t.id !== id))
      }, 2000)
    }
  }

  const TransactionApprovalCard = ({ transaction }) => (
    <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-yellow-400">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-3 rounded-full ${
                transaction.type === 'income' 
                  ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
              }`}>
                {transaction.type === 'income' ? (
                  <ArrowDownCircle className="w-5 h-5" />
                ) : (
                  <ArrowUpCircle className="w-5 h-5" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {transaction.description}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {transaction.reference} • {formatDate(transaction.date)}
                </p>
                <Badge variant="outline" className="mt-1 text-yellow-600 border-yellow-200">
                  <Clock className="w-3 h-3 mr-1" />
                  قيد المراجعة
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${
              transaction.type === 'income' 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {transaction.type === 'income' ? 'إيرادات' : 'مصروفات'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <span className="text-gray-500 dark:text-gray-400">التصنيف: </span>
            <span className="font-medium text-gray-900 dark:text-white">{transaction.category}</span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">طالب الموافقة: </span>
            <span className="font-medium text-gray-900 dark:text-white">{transaction.createdBy}</span>
          </div>
        </div>

        {transaction.notes && (
          <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="text-gray-500 dark:text-gray-400 text-sm">تفاصيل المعاملة: </span>
            <p className="text-gray-700 dark:text-gray-300 mt-1">{transaction.notes}</p>
          </div>
        )}

        {/* أزرار الموافقة والرفض */}
        <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button 
            onClick={() => handleApprove(transaction.id)}
            className="flex-1 gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
            size="lg"
          >
            <CheckCircle className="w-5 h-5" />
            ✅ موافقة
          </Button>
          <Button 
            onClick={() => handleReject(transaction.id)}
            variant="outline"
            className="flex-1 gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 font-semibold py-3"
            size="lg"
          >
            <XCircle className="w-5 h-5" />
            ❌ رفض
          </Button>
          <Button 
            variant="outline"
            className="gap-2 px-6"
            size="lg"
          >
            <Eye className="w-4 h-4" />
            تفاصيل
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const stats = {
    totalPending: pendingTransactions.length,
    totalAmount: pendingTransactions.reduce((sum, t) => sum + t.amount, 0),
    expenses: pendingTransactions.filter(t => t.type === 'expense').length,
    income: pendingTransactions.filter(t => t.type === 'income').length
  }

  return (
    <div className="space-y-6">
      {/* رأس الصفحة */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
            <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              🔍 موافقات المعاملات المالية
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              راجع ووافق على المعاملات المالية المطلوبة
            </p>
          </div>
        </div>
      </div>

      {/* الإحصائيات السريعة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">المعاملات المعلقة</p>
                <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                  {stats.totalPending}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">إجمالي المبلغ</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {formatCurrency(stats.totalAmount)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700 dark:text-red-300">مصروفات معلقة</p>
                <p className="text-2xl font-bold text-red-900 dark:text-red-100">
                  {stats.expenses}
                </p>
              </div>
              <ArrowUpCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 dark:text-green-300">إيرادات معلقة</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {stats.income}
                </p>
              </div>
              <ArrowDownCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* قائمة المعاملات قيد المراجعة */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          المعاملات المطلوبة للمراجعة ({pendingTransactions.length})
        </h2>
        
        {pendingTransactions.length > 0 ? (
          pendingTransactions.map(transaction => (
            <TransactionApprovalCard key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-gray-500 dark:text-gray-400">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 opacity-50 text-green-500" />
                <h3 className="text-lg font-medium mb-2">🎉 ممتاز! لا توجد معاملات معلقة</h3>
                <p>تم الانتهاء من مراجعة جميع المعاملات المالية</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default ApprovalsPage 