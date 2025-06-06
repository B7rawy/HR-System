import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useNotifications } from '../components/NotificationSystem'
import { Label } from '../components/ui/label'
import { 
  Users, 
  DollarSign, 
  Download,
  Play,
  CheckCircle,
  AlertTriangle,
  Eye,
  Edit,
  FileText,
  Save,
  X,
  Plus,
  Minus
} from 'lucide-react'
import { formatCurrency, formatDate } from '../utils/formatters'

// دالة للحصول على الشهر الحالي
const getCurrentMonth = () => {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

// بيانات مؤقتة للموظفين
const employeesSampleData = [
  {
    id: 1,
    employeeId: 'EMP001',
    name: 'أحمد محمد علي',
    department: 'التطوير',
    position: 'مطور برمجيات رئيسي',
    baseSalary: 12000,
    currentSalary: 12000,
    allowances: {
      transport: 800,
      food: 500,
      housing: 2000,
      performance: 1000
    },
    deductions: {
      insurance: 600,
      taxes: 720,
      loans: 500
    },
    monthlyAdjustments: {
      bonuses: [
        { id: 1, type: 'مكافأة أداء', amount: 500, reason: 'تفوق في المشروع', date: '2024-06-15' }
      ],
      deductions: []
    },
    performance: { rating: 4.8 },
    status: 'active'
  }
]

const PayrollPage = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotifications()
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth())
  const [searchTerm, setSearchTerm] = useState('')
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [payrollStatus] = useState('pending')
  const [employees, setEmployees] = useState(employeesSampleData)
  const [sortBy, setSortBy] = useState('name')
  const [filterDepartment, setFilterDepartment] = useState('all')
  const [paymentHistory, setPaymentHistory] = useState([])

  // بيانات مؤقتة للموظفين ورواتبهم مع نظام التعديلات
  const [employeesPayroll, setEmployeesPayroll] = useState([
    {
      id: 1,
      employeeId: 'EMP001',
      name: 'أحمد محمد علي',
      department: 'التطوير',
      position: 'مطور برمجيات رئيسي',
      baseSalary: 12000,
      allowances: {
        transport: 800,
        food: 500,
        housing: 2000,
        performance: 1000
      },
      deductions: {
        insurance: 600,
        taxes: 720,
        loans: 500,
        absence: 0
      },
      // تعديلات الشهر الحالي
      monthlyAdjustments: {
        bonuses: [
          { id: 1, type: 'مكافأة أداء', amount: 500, reason: 'تفوق في المشروع الأخير', date: '2024-06-15' }
        ],
        deductions: [
          { id: 1, type: 'خصم تأخير', amount: 200, reason: 'تأخير 3 أيام', date: '2024-06-10' }
        ]
      },
      workingDays: 22,
      actualDays: 22,
      overtime: 8,
      overtimeRate: 50,
      status: 'ready_to_pay', // ready_to_pay, paid, pending
      lastProcessed: null,
      paymentDate: null
    },
    {
      id: 2,
      employeeId: 'EMP002',
      name: 'فاطمة أحمد حسن',
      department: 'المالية',
      position: 'محاسبة مالية',
      baseSalary: 9500,
      allowances: {
        transport: 800,
        food: 500,
        housing: 1500,
        performance: 800
      },
      deductions: {
        insurance: 475,
        taxes: 570,
        loans: 0,
        absence: 0
      },
      monthlyAdjustments: {
        bonuses: [
          { id: 1, type: 'مكافأة التميز', amount: 800, reason: 'تميز في إعداد التقارير', date: '2024-06-20' }
        ],
        deductions: []
      },
      workingDays: 22,
      actualDays: 21,
      overtime: 4,
      overtimeRate: 45,
      status: 'ready_to_pay',
      lastProcessed: null,
      paymentDate: null
    },
    {
      id: 3,
      employeeId: 'EMP003',
      name: 'محمد عبد الله',
      department: 'الموارد البشرية',
      position: 'أخصائي موارد بشرية',
      baseSalary: 8500,
      allowances: {
        transport: 800,
        food: 500,
        housing: 1200,
        performance: 600
      },
      deductions: {
        insurance: 425,
        taxes: 510,
        loans: 300,
        absence: 200
      },
      monthlyAdjustments: {
        bonuses: [],
        deductions: [
          { id: 1, type: 'خصم غياب', amount: 300, reason: 'غياب بدون إذن يومين', date: '2024-06-05' }
        ]
      },
      workingDays: 22,
      actualDays: 20,
      overtime: 0,
      overtimeRate: 40,
      status: 'ready_to_pay',
      lastProcessed: null,
      paymentDate: null
    },
    {
      id: 4,
      employeeId: 'EMP004',
      name: 'كريم البحراوي',
      department: 'التسويق',
      position: 'مصمم جرافيك',
      baseSalary: 6500,
      allowances: {
        transport: 400,
        food: 250,
        housing: 700,
        performance: 400
      },
      deductions: {
        insurance: 325,
        taxes: 390,
        loans: 0,
        absence: 0
      },
      monthlyAdjustments: {
        bonuses: [],
        deductions: []
      },
      workingDays: 22,
      actualDays: 22,
      overtime: 2,
      overtimeRate: 35,
      status: 'ready_to_pay',
      lastProcessed: null,
      paymentDate: null
    },
    {
      id: 5,
      employeeId: 'EMP005',
      name: 'ماجد',
      department: 'الحسابات',
      position: 'محاسب',
      baseSalary: 7000,
      allowances: {
        transport: 500,
        food: 300,
        housing: 800,
        performance: 500
      },
      deductions: {
        insurance: 350,
        taxes: 420,
        loans: 0,
        absence: 0
      },
      monthlyAdjustments: {
        bonuses: [],
        deductions: []
      },
      workingDays: 22,
      actualDays: 22,
      overtime: 5,
      overtimeRate: 40,
      status: 'ready_to_pay',
      lastProcessed: null,
      paymentDate: null
    }
  ])

  const [editForm, setEditForm] = useState({
    bonusType: '',
    bonusAmount: '',
    bonusReason: '',
    deductionType: '',
    deductionAmount: '',
    deductionReason: ''
  })

  // حساب الراتب الصافي مع التعديلات الشهرية
  const calculateNetSalary = (employee) => {
    const totalAllowances = Object.values(employee.allowances).reduce((sum, val) => sum + val, 0)
    const totalDeductions = Object.values(employee.deductions).reduce((sum, val) => sum + val, 0)
    const monthlyBonuses = employee.monthlyAdjustments?.bonuses?.reduce((sum, bonus) => sum + bonus.amount, 0) || 0
    const monthlyDeductionsAmount = employee.monthlyAdjustments?.deductions?.reduce((sum, deduction) => sum + deduction.amount, 0) || 0
    
    return employee.baseSalary + totalAllowances + monthlyBonuses - totalDeductions - monthlyDeductionsAmount
  }

  // إحصائيات الرواتب
  const payrollStats = {
    totalEmployees: employeesPayroll.length,
    readyToPay: employeesPayroll.filter(emp => emp.status === 'ready_to_pay').length,
    paidEmployees: employeesPayroll.filter(emp => emp.status === 'paid').length,
    totalPayroll: employeesPayroll.reduce((sum, emp) => sum + calculateNetSalary(emp), 0),
    totalBonuses: employeesPayroll.reduce((sum, emp) => 
      sum + (emp.monthlyAdjustments?.bonuses?.reduce((b, bonus) => b + bonus.amount, 0) || 0), 0),
    totalDeductions: employeesPayroll.reduce((sum, emp) => 
      sum + (emp.monthlyAdjustments?.deductions?.reduce((d, deduction) => d + deduction.amount, 0) || 0), 0)
  }

  // دفع راتب موظف واحد
  const payEmployee = (employeeId) => {
    const employee = employeesPayroll.find(emp => emp.id === employeeId)
    if (!employee) return

    const netSalary = calculateNetSalary(employee)
    const paymentRecord = {
      id: Date.now(),
      employeeId: employee.employeeId,
      employeeName: employee.name,
      month: selectedMonth,
      amount: netSalary,
      paymentDate: new Date().toISOString().split('T')[0],
      adjustments: {
        bonuses: [...(employee.monthlyAdjustments?.bonuses || [])],
        deductions: [...(employee.monthlyAdjustments?.deductions || [])]
      }
    }

    // تسجيل الدفعة
    setPaymentHistory(prev => [...prev, paymentRecord])

    // تحديث حالة الموظف
    setEmployeesPayroll(prev => prev.map(emp => 
      emp.id === employeeId 
        ? { 
            ...emp, 
            status: 'paid', 
            paymentDate: new Date().toISOString().split('T')[0],
            lastProcessed: new Date().toISOString().split('T')[0]
          }
        : emp
    ))

    showSuccess(`تم دفع راتب ${employee.name} بمبلغ ${formatCurrency(netSalary)} بنجاح!`, {
      title: 'دفع راتب 💰',
      description: `${employee.position} - ${employee.department}`
    })
  }

  // دفع جميع الرواتب المستحقة
  const payAllSalaries = () => {
    const readyEmployees = employeesPayroll.filter(emp => emp.status === 'ready_to_pay')
    
    if (readyEmployees.length === 0) {
      showInfo('لا توجد رواتب مستحقة للدفع!', {
      title: 'معلومة 💡'
    })
      return
    }

    if (window.confirm(`هل أنت متأكد من دفع رواتب ${readyEmployees.length} موظف؟`)) {
      readyEmployees.forEach(employee => {
        payEmployee(employee.id)
      })
    }
  }

  // إضافة مكافأة أو خصم
  const addAdjustment = (type) => {
    if (!selectedEmployee) return

    const adjustment = {
      id: Date.now(),
      type: type === 'bonus' ? editForm.bonusType : editForm.deductionType,
      amount: parseFloat(type === 'bonus' ? editForm.bonusAmount : editForm.deductionAmount),
      reason: type === 'bonus' ? editForm.bonusReason : editForm.deductionReason,
      date: new Date().toISOString().split('T')[0]
    }

    setEmployeesPayroll(prev => prev.map(emp => 
      emp.id === selectedEmployee.id 
        ? {
            ...emp,
            monthlyAdjustments: {
              ...emp.monthlyAdjustments,
              [type === 'bonus' ? 'bonuses' : 'deductions']: [
                ...(emp.monthlyAdjustments?.[type === 'bonus' ? 'bonuses' : 'deductions'] || []),
                adjustment
              ]
            }
          }
        : emp
    ))

    // إعادة تعيين النموذج
    if (type === 'bonus') {
      setEditForm(prev => ({ ...prev, bonusType: '', bonusAmount: '', bonusReason: '' }))
    } else {
      setEditForm(prev => ({ ...prev, deductionType: '', deductionAmount: '', deductionReason: '' }))
    }
  }

  // حذف تعديل
  const removeAdjustment = (type, adjustmentId) => {
    setEmployeesPayroll(prev => prev.map(emp => 
      emp.id === selectedEmployee.id 
        ? {
            ...emp,
            monthlyAdjustments: {
              ...emp.monthlyAdjustments,
              [type]: emp.monthlyAdjustments?.[type]?.filter(adj => adj.id !== adjustmentId) || []
            }
          }
        : emp
    ))
  }

  // عرض تفاصيل راتب موظف
  const viewEmployeeDetails = (employee) => {
    setSelectedEmployee(employee)
    setShowDetailsModal(true)
  }

  // تعديل راتب موظف
  const editEmployeeSalary = (employee) => {
    setSelectedEmployee(employee)
    setShowEditModal(true)
  }

  // مودال تفاصيل الراتب
  const PayrollDetailsModal = ({ employee, onClose }) => {
    if (!employee) return null

    const netSalary = calculateNetSalary(employee)
    const totalAllowances = Object.values(employee.allowances).reduce((sum, val) => sum + val, 0)
    const totalDeductions = Object.values(employee.deductions).reduce((sum, val) => sum + val, 0)
    const monthlyBonuses = employee.monthlyAdjustments?.bonuses?.reduce((sum, bonus) => sum + bonus.amount, 0) || 0
    const monthlyDeductionsAmount = employee.monthlyAdjustments?.deductions?.reduce((sum, deduction) => sum + deduction.amount, 0) || 0

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">تفاصيل راتب {employee.name}</h3>
              <Button variant="ghost" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* معلومات الموظف */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">معلومات الموظف</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">رقم الموظف:</span>
                    <span className="font-medium">{employee.employeeId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">القسم:</span>
                    <span className="font-medium">{employee.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">المنصب:</span>
                    <span className="font-medium">{employee.position}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">أيام العمل:</span>
                    <span className="font-medium">{employee.actualDays}/{employee.workingDays}</span>
                  </div>
                </CardContent>
              </Card>

              {/* الراتب الأساسي */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">الراتب الأساسي</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(employee.baseSalary)}
                  </div>
                </CardContent>
              </Card>

              {/* البدلات */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">البدلات الثابتة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>بدل مواصلات:</span>
                    <span>{formatCurrency(employee.allowances.transport)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>بدل طعام:</span>
                    <span>{formatCurrency(employee.allowances.food)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>بدل سكن:</span>
                    <span>{formatCurrency(employee.allowances.housing)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>بدل أداء:</span>
                    <span>{formatCurrency(employee.allowances.performance)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>إجمالي البدلات:</span>
                    <span className="text-green-600">{formatCurrency(totalAllowances)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* الخصومات الثابتة */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">الخصومات الثابتة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>التأمين:</span>
                    <span>{formatCurrency(employee.deductions.insurance)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الضرائب:</span>
                    <span>{formatCurrency(employee.deductions.taxes)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>القروض:</span>
                    <span>{formatCurrency(employee.deductions.loans)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الغياب:</span>
                    <span>{formatCurrency(employee.deductions.absence)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>إجمالي الخصومات:</span>
                    <span className="text-red-600">{formatCurrency(totalDeductions)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* المكافآت الشهرية */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">مكافآت هذا الشهر</CardTitle>
                </CardHeader>
                <CardContent>
                  {employee.monthlyAdjustments?.bonuses?.length > 0 ? (
                    <div className="space-y-2">
                      {employee.monthlyAdjustments.bonuses.map((bonus) => (
                        <div key={bonus.id} className="border-b pb-2">
                          <div className="flex justify-between">
                            <span className="font-medium">{bonus.type}</span>
                            <span className="text-green-600">{formatCurrency(bonus.amount)}</span>
                          </div>
                          <div className="text-sm text-gray-500">{bonus.reason}</div>
                          <div className="text-xs text-gray-400">{formatDate(bonus.date)}</div>
                        </div>
                      ))}
                      <div className="border-t pt-2 flex justify-between font-bold">
                        <span>إجمالي المكافآت:</span>
                        <span className="text-green-600">{formatCurrency(monthlyBonuses)}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center">لا توجد مكافآت لهذا الشهر</p>
                  )}
                </CardContent>
              </Card>

              {/* الخصومات الشهرية */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">خصومات هذا الشهر</CardTitle>
                </CardHeader>
                <CardContent>
                  {employee.monthlyAdjustments?.deductions?.length > 0 ? (
                    <div className="space-y-2">
                      {employee.monthlyAdjustments.deductions.map((deduction) => (
                        <div key={deduction.id} className="border-b pb-2">
                          <div className="flex justify-between">
                            <span className="font-medium">{deduction.type}</span>
                            <span className="text-red-600">{formatCurrency(deduction.amount)}</span>
                          </div>
                          <div className="text-sm text-gray-500">{deduction.reason}</div>
                          <div className="text-xs text-gray-400">{formatDate(deduction.date)}</div>
                        </div>
                      ))}
                      <div className="border-t pt-2 flex justify-between font-bold">
                        <span>إجمالي الخصومات:</span>
                        <span className="text-red-600">{formatCurrency(monthlyDeductionsAmount)}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center">لا توجد خصومات لهذا الشهر</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* الراتب الصافي */}
            <Card className="bg-blue-50 border-blue-200 mt-6">
              <CardHeader>
                <CardTitle className="text-xl text-blue-800 text-center">الراتب الصافي النهائي</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {formatCurrency(netSalary)}
                </div>
                <div className="text-sm text-blue-500">
                  الحالة: {employee.status === 'paid' ? 'مدفوع' : employee.status === 'ready_to_pay' ? 'جاهز للدفع' : 'معلق'}
                </div>
                {employee.paymentDate && (
                  <div className="text-sm text-blue-500">
                    تاريخ الدفع: {formatDate(employee.paymentDate)}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* أزرار الإجراءات */}
            <div className="mt-6 flex gap-3">
              {employee.status === 'ready_to_pay' && (
                <Button 
                  onClick={() => payEmployee(employee.id)} 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <DollarSign className="w-4 h-4 ml-2" />
                  دفع الراتب
                </Button>
              )}
              <Button onClick={() => editEmployeeSalary(employee)} variant="outline" className="flex-1">
                <Edit className="w-4 h-4 ml-2" />
                تعديل الراتب
              </Button>
              <Button variant="outline" className="flex-1">
                <Download className="w-4 h-4 ml-2" />
                تحميل كشف الراتب
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // مودال تعديل الراتب
  const EditSalaryModal = ({ employee, onClose }) => {
    if (!employee) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">تعديل راتب {employee.name}</h3>
              <Button variant="ghost" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* إضافة مكافأة */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">إضافة مكافأة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="bonusType">نوع المكافأة</Label>
                    <Input
                      id="bonusType"
                      value={editForm.bonusType}
                      onChange={(e) => setEditForm(prev => ({...prev, bonusType: e.target.value}))}
                      placeholder="مثال: مكافأة أداء"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bonusAmount">المبلغ</Label>
                    <Input
                      id="bonusAmount"
                      type="number"
                      value={editForm.bonusAmount}
                      onChange={(e) => setEditForm(prev => ({...prev, bonusAmount: e.target.value}))}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bonusReason">السبب</Label>
                    <Input
                      id="bonusReason"
                      value={editForm.bonusReason}
                      onChange={(e) => setEditForm(prev => ({...prev, bonusReason: e.target.value}))}
                      placeholder="سبب المكافأة"
                    />
                  </div>
                  <Button 
                    onClick={() => addAdjustment('bonus')} 
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={!editForm.bonusType || !editForm.bonusAmount}
                  >
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة مكافأة
                  </Button>
                </CardContent>
              </Card>

              {/* إضافة خصم */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">إضافة خصم</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="deductionType">نوع الخصم</Label>
                    <Input
                      id="deductionType"
                      value={editForm.deductionType}
                      onChange={(e) => setEditForm(prev => ({...prev, deductionType: e.target.value}))}
                      placeholder="مثال: خصم تأخير"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deductionAmount">المبلغ</Label>
                    <Input
                      id="deductionAmount"
                      type="number"
                      value={editForm.deductionAmount}
                      onChange={(e) => setEditForm(prev => ({...prev, deductionAmount: e.target.value}))}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deductionReason">السبب</Label>
                    <Input
                      id="deductionReason"
                      value={editForm.deductionReason}
                      onChange={(e) => setEditForm(prev => ({...prev, deductionReason: e.target.value}))}
                      placeholder="سبب الخصم"
                    />
                  </div>
                  <Button 
                    onClick={() => addAdjustment('deduction')} 
                    className="w-full bg-red-600 hover:bg-red-700"
                    disabled={!editForm.deductionType || !editForm.deductionAmount}
                  >
                    <Minus className="w-4 h-4 ml-2" />
                    إضافة خصم
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* عرض التعديلات الحالية */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* المكافآت الحالية */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">المكافآت الحالية</CardTitle>
                </CardHeader>
                <CardContent>
                  {employee.monthlyAdjustments?.bonuses?.length > 0 ? (
                    <div className="space-y-2">
                      {employee.monthlyAdjustments.bonuses.map((bonus) => (
                        <div key={bonus.id} className="flex justify-between items-center p-2 bg-green-50 rounded">
                          <div>
                            <div className="font-medium">{bonus.type}</div>
                            <div className="text-sm text-gray-600">{formatCurrency(bonus.amount)}</div>
                          </div>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => removeAdjustment('bonuses', bonus.id)}
                            className="text-red-600"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center">لا توجد مكافآت</p>
                  )}
                </CardContent>
              </Card>

              {/* الخصومات الحالية */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">الخصومات الحالية</CardTitle>
                </CardHeader>
                <CardContent>
                  {employee.monthlyAdjustments?.deductions?.length > 0 ? (
                    <div className="space-y-2">
                      {employee.monthlyAdjustments.deductions.map((deduction) => (
                        <div key={deduction.id} className="flex justify-between items-center p-2 bg-red-50 rounded">
                          <div>
                            <div className="font-medium">{deduction.type}</div>
                            <div className="text-sm text-gray-600">{formatCurrency(deduction.amount)}</div>
                          </div>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => removeAdjustment('deductions', deduction.id)}
                            className="text-red-600"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center">لا توجد خصومات</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* الراتب المحدث */}
            <Card className="bg-blue-50 border-blue-200 mt-6">
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  الراتب المحدث: {formatCurrency(calculateNetSalary(employee))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
          )
    }

  // فحص صلاحيات المدير
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
  
  // إضافة مدير افتراضي إذا لم يكن هناك مستخدم
  if (!currentUser.role) {
    const defaultAdmin = {
      id: 1,
      name: 'المدير العام',
      email: 'admin@company.com',
      role: 'admin',
      department: 'الإدارة'
    }
    localStorage.setItem('user', JSON.stringify(defaultAdmin))
  }

  if (currentUser.role !== 'admin' && Object.keys(currentUser).length > 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-center text-red-600">
              <Users className="w-12 h-12 mx-auto mb-4" />
              غير مصرح
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600">
              هذه الصفحة متاحة للمديرين فقط. يرجى تسجيل الدخول كمدير.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 page-enter">
      {/* العنوان والإحصائيات */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white gradient-text">نظام دفع الرواتب</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            إدارة ومعالجة رواتب الموظفين مع المكافآت والخصومات
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="month">الشهر:</Label>
            <Input
              id="month"
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-40"
            />
          </div>
          
          <Button 
            onClick={payAllSalaries}
            disabled={payrollStats.readyToPay === 0}
            className="gap-2 bg-green-600 hover:bg-green-700"
          >
            <DollarSign className="w-4 h-4" />
            دفع جميع الرواتب ({payrollStats.readyToPay})
          </Button>
        </div>
      </div>

      {/* الإحصائيات المحدثة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الموظفين</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {payrollStats.totalEmployees}
            </div>
            <p className="text-xs text-gray-500 mt-1">موظف نشط</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">جاهز للدفع</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {payrollStats.readyToPay}
            </div>
            <p className="text-xs text-gray-500 mt-1">راتب معلق</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">تم الدفع</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {payrollStats.paidEmployees}
            </div>
            <p className="text-xs text-gray-500 mt-1">راتب مدفوع</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المكافآت</CardTitle>
            <Plus className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(payrollStats.totalBonuses)}
            </div>
            <p className="text-xs text-gray-500 mt-1">هذا الشهر</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الخصومات</CardTitle>
            <Minus className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(payrollStats.totalDeductions)}
            </div>
            <p className="text-xs text-gray-500 mt-1">هذا الشهر</p>
          </CardContent>
        </Card>
      </div>

      {/* جدول الرواتب المحدث */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            رواتب الموظفين - {selectedMonth}
          </CardTitle>
          <CardDescription>
            عرض وإدارة رواتب جميع الموظفين مع المكافآت والخصومات
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-right py-3 px-4 font-medium text-gray-900">الموظف</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">الراتب الأساسي</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">المكافآت</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">الخصومات</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">الراتب الصافي</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">الحالة</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {employeesPayroll.map((employee) => {
                  const netSalary = calculateNetSalary(employee)
                  const monthlyBonuses = employee.monthlyAdjustments?.bonuses?.reduce((sum, bonus) => sum + bonus.amount, 0) || 0
                  const monthlyDeductions = employee.monthlyAdjustments?.deductions?.reduce((sum, deduction) => sum + deduction.amount, 0) || 0

                  return (
                    <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">{employee.employeeId}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium">{formatCurrency(employee.baseSalary)}</td>
                      <td className="py-3 px-4 text-green-600">
                        {monthlyBonuses > 0 ? `+${formatCurrency(monthlyBonuses)}` : '-'}
                      </td>
                      <td className="py-3 px-4 text-red-600">
                        {monthlyDeductions > 0 ? `-${formatCurrency(monthlyDeductions)}` : '-'}
                      </td>
                      <td className="py-3 px-4 font-bold text-blue-600">{formatCurrency(netSalary)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          employee.status === 'paid' 
                            ? 'bg-green-100 text-green-800' 
                            : employee.status === 'ready_to_pay'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {employee.status === 'paid' ? 'مدفوع' : employee.status === 'ready_to_pay' ? 'جاهز للدفع' : 'معلق'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => viewEmployeeDetails(employee)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => editEmployeeSalary(employee)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          {employee.status === 'ready_to_pay' && (
                            <Button 
                              size="sm" 
                              onClick={() => payEmployee(employee.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <DollarSign className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* المودالات */}
      {showDetailsModal && (
        <PayrollDetailsModal
          employee={selectedEmployee}
          onClose={() => {
            setShowDetailsModal(false)
            setSelectedEmployee(null)
          }}
        />
      )}

      {showEditModal && (
        <EditSalaryModal
          employee={selectedEmployee}
          onClose={() => {
            setShowEditModal(false)
            setSelectedEmployee(null)
          }}
        />
      )}
    </div>
  )
}

export default PayrollPage 