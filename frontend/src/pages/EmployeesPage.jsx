import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useNotifications } from '../components/NotificationSystem'
import WhatsAppService from '../services/WhatsAppService'
import { 
  Users, 
  DollarSign, 
  Gift, 
  TrendingUp, 
  Plus, 
  Edit, 
  X, 
  Eye,
  MessageCircle,
  Send,
  FileText,
  Calendar,
  Bell
} from 'lucide-react'

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  
  // حالات نظام الرسائل
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [selectedEmployeeForMessage, setSelectedEmployeeForMessage] = useState(null)
  const [messageType, setMessageType] = useState('notification') // notification, salary, leave, custom
  const [customMessage, setCustomMessage] = useState('')
  const [messageTemplate, setMessageTemplate] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  // حالات الرسائل
  const [messageStatus, setMessageStatus] = useState(null) // null, 'sending', 'success', 'failed'
  const [messageError, setMessageError] = useState('')
  const [messageSuccess, setMessageSuccess] = useState('')
  const [showMessageTypeModal, setShowMessageTypeModal] = useState(false) // popup اختيار نوع الرسالة

  const { showSuccess, showError, showWarning } = useNotifications()

  // بيانات تجريبية للموظفين
  useEffect(() => {
    const sampleEmployees = [
      {
        id: 1,
        name: 'أحمد محمد علي',
        position: 'مطور برمجيات',
        department: 'تقنية المعلومات',
        phone: '+201234567890',
        email: 'ahmed.mohamed@company.com',
        hireDate: '2022-01-15',
        baseSalary: 8000,
        allowances: {
          transportation: 500,
          housing: 1000,
          food: 300
        },
        deductions: {
          insurance: 200,
          tax: 400
        },
        monthlyAdjustments: {
          bonuses: [],
          deductions: []
        },
        attendance: {
          presentDays: 22,
          absentDays: 0,
          totalWorkingDays: 22,
          leaveBalance: 25
        },
        performance: {
          rating: 4.5,
          lastReview: '2024-01-01'
        }
      },
      {
        id: 2,
        name: 'فاطمة حسن محمود',
        position: 'محاسبة',
        department: 'المالية',
        phone: '+201987654321',
        email: 'fatma.hassan@company.com',
        hireDate: '2021-03-10',
        baseSalary: 7000,
        allowances: {
          transportation: 400,
          housing: 800,
          food: 250
        },
        deductions: {
          insurance: 180,
          tax: 350
        },
        monthlyAdjustments: {
          bonuses: [
            { id: 1, amount: 500, reason: 'مكافأة تميز', date: '2024-01-01' }
          ],
          deductions: []
        },
        attendance: {
          presentDays: 20,
          absentDays: 2,
          totalWorkingDays: 22,
          leaveBalance: 18
        },
        performance: {
          rating: 4.8,
          lastReview: '2024-01-01'
        }
      },
      {
        id: 3,
        name: 'كريم البحراوي',
        position: 'مصمم جرافيك',
        department: 'التسويق',
        phone: '+201016772118',
        email: 'kareem.bahrawi@company.com',
        hireDate: '2023-09-15',
        baseSalary: 6500,
        allowances: {
          transportation: 400,
          housing: 700,
          food: 250
        },
        deductions: {
          insurance: 150,
          tax: 300
        },
        monthlyAdjustments: {
          bonuses: [],
          deductions: []
        },
        attendance: {
          presentDays: 22,
          absentDays: 0,
          totalWorkingDays: 22,
          leaveBalance: 22
        },
        performance: {
          rating: 4.3,
          lastReview: '2024-01-01'
        }
      },
      {
        id: 4,
        name: 'ماجد',
        position: 'محاسب',
        department: 'الحسابات',
        phone: '+201080606086',
        email: 'majed@company.com',
        hireDate: '2024-01-10',
        baseSalary: 7000,
        allowances: {
          transportation: 500,
          housing: 800,
          food: 300
        },
        deductions: {
          insurance: 200,
          tax: 350
        },
        monthlyAdjustments: {
          bonuses: [],
          deductions: []
        },
        attendance: {
          presentDays: 22,
          absentDays: 0,
          totalWorkingDays: 22,
          leaveBalance: 21
        },
        performance: {
          rating: 4.5,
          lastReview: '2024-01-20'
        }
      }
    ]
    setEmployees(sampleEmployees)
  }, [])

  // حساب الراتب الحالي للموظف
  const calculateCurrentSalary = (employee) => {
    const baseSalary = employee.baseSalary || 0
    const allowancesTotal = Object.values(employee.allowances || {}).reduce((sum, allowance) => sum + allowance, 0)
    const deductionsTotal = Object.values(employee.deductions || {}).reduce((sum, deduction) => sum + deduction, 0)
    const bonusesTotal = (employee.monthlyAdjustments?.bonuses || []).reduce((sum, bonus) => sum + bonus.amount, 0)
    const adjustmentDeductionsTotal = (employee.monthlyAdjustments?.deductions || []).reduce((sum, deduction) => sum + deduction.amount, 0)
    
    return baseSalary + allowancesTotal - deductionsTotal + bonusesTotal - adjustmentDeductionsTotal
  }

  // تصفية الموظفين حسب البحث
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // تنسيق العملة
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0
    }).format(amount)
  }

  // تنسيق التاريخ
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ar-EG')
  }

  const addEmployee = (employeeData) => {
    const newEmployee = {
      id: Date.now(),
      ...employeeData,
      monthlyAdjustments: { bonuses: [], deductions: [] },
      attendance: {
        presentDays: 0,
        absentDays: 0,
        totalWorkingDays: 22,
        leaveBalance: 30
      },
      performance: {
        rating: 5,
        lastReview: new Date().toISOString().split('T')[0]
      }
    }
    setEmployees([...employees, newEmployee])
    showSuccess('تم إضافة الموظف بنجاح')
    setShowAddModal(false)
  }

  const updateEmployee = (employeeData, employeeId) => {
    setEmployees(employees.map(emp => 
      emp.id === employeeId ? { ...emp, ...employeeData } : emp
    ))
    showSuccess('تم تحديث بيانات الموظف بنجاح')
    setShowEditModal(false)
    setSelectedEmployee(null)
  }

  const deleteEmployee = (employeeId) => {
    setEmployees(employees.filter(emp => emp.id !== employeeId))
    showSuccess('تم حذف الموظف بنجاح')
  }

  const loadEmployeeForEdit = (employee) => {
    setSelectedEmployee(employee)
    setShowEditModal(true)
  }

  // دوال نظام الرسائل
  const openMessageModal = (employee, type = 'notification') => {
    setSelectedEmployeeForMessage(employee)
    setMessageType(type)
    setShowMessageModal(true)
    setMessageStatus(null)
    setMessageError('')
    setMessageSuccess('')
    generateMessageTemplate(employee, type)
  }

  // فتح popup اختيار نوع الرسالة
  const openMessageTypeModal = (employee) => {
    setSelectedEmployeeForMessage(employee)
    setShowMessageTypeModal(true)
  }

  const generateMessageTemplate = (employee, type) => {
    const currentDate = new Date().toLocaleDateString('ar-EG')
    const currentSalary = calculateCurrentSalary(employee)
    
    switch (type) {
      case 'salary':
        setMessageTemplate(`
📊 *كشف راتب شهر ${new Date().toLocaleDateString('ar-EG', { month: 'long', year: 'numeric' })}*

السيد/ة: *${employee.name}*
المنصب: ${employee.position}
القسم: ${employee.department}

💰 *تفاصيل الراتب:*
• الراتب الأساسي: ${formatCurrency(employee.baseSalary)}
• البدلات: ${formatCurrency(Object.values(employee.allowances || {}).reduce((sum, allowance) => sum + allowance, 0))}
• الخصومات: ${formatCurrency(Object.values(employee.deductions || {}).reduce((sum, deduction) => sum + deduction, 0))}

💸 *إجمالي الراتب: ${formatCurrency(currentSalary)}*

📅 تاريخ الإستحقاق: ${currentDate}

شكراً لك على جهودك المبذولة 🙏
        `.trim())
        break
        
      case 'leave':
        setMessageTemplate(`
🏖️ *تحديث رصيد الإجازات*

عزيزي/عزيزتي: *${employee.name}*

📊 *تفاصيل رصيد الإجازات:*
• الرصيد المتاح: ${employee.attendance?.leaveBalance || 0} يوم
• الأيام المستخدمة: ${30 - (employee.attendance?.leaveBalance || 0)} يوم
• إجمالي الأيام السنوية: 30 يوم

📅 تاريخ التحديث: ${currentDate}

للاستفسار عن تقديم طلب إجازة، يرجى التواصل مع قسم الموارد البشرية.

نتمنى لك إجازة سعيدة! 🌟
        `.trim())
        break
        
      case 'notification':
        setMessageTemplate(`
🔔 *إشعار هام*

عزيزي/عزيزتي: *${employee.name}*
المنصب: ${employee.position}
القسم: ${employee.department}

يرجى العلم أنه...

[اكتب الإشعار هنا]

📅 التاريخ: ${currentDate}

شكراً لك على اهتمامك.
        `.trim())
        break
        
      case 'custom':
        setMessageTemplate(`
السلام عليكم ورحمة الله وبركاته

عزيزي/عزيزتي: *${employee.name}*

[اكتب رسالتك هنا]

مع تحيات إدارة الموارد البشرية 
📅 ${currentDate}
        `.trim())
        break
        
      default:
        setMessageTemplate('')
    }
  }

  const sendMessage = async () => {
    if (!selectedEmployeeForMessage || (!messageTemplate.trim() && !customMessage.trim())) {
      setMessageStatus('failed')
      setMessageError('يرجى التأكد من اختيار الموظف وكتابة الرسالة')
      return
    }

    setMessageStatus('sending')
    setMessageError('')
    setMessageSuccess('')
    setIsLoading(true)
    
    try {
      const phone = selectedEmployeeForMessage.phone
      const message = customMessage.trim() || messageTemplate
      
      const result = await WhatsAppService.sendMessage(phone, message)
      
      if (result.success) {
        setMessageStatus('success')
        setMessageSuccess(`تم إرسال الرسالة بنجاح إلى ${selectedEmployeeForMessage.name}`)
        showSuccess(`تم إرسال الرسالة بنجاح إلى ${selectedEmployeeForMessage.name}`)
        
        // إغلاق النافذة بعد 2 ثانية
        setTimeout(() => {
          setShowMessageModal(false)
          setCustomMessage('')
          setMessageTemplate('')
          setSelectedEmployeeForMessage(null)
          setMessageStatus(null)
          setMessageSuccess('')
        }, 2000)
      } else {
        setMessageStatus('failed')
        setMessageError(result.error || 'حدث خطأ غير معروف أثناء إرسال الرسالة')
        showError(`فشل في إرسال الرسالة: ${result.error || 'حدث خطأ غير معروف'}`)
      }
    } catch (error) {
      console.error('خطأ في إرسال الرسالة:', error)
      setMessageStatus('failed')
      setMessageError(error.message || 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.')
      showError('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.')
    } finally {
      setIsLoading(false)
    }
  }

  const sendBulkMessage = async (employeeList, messageText) => {
    if (!employeeList.length || !messageText.trim()) {
      showError('يرجى التأكد من اختيار الموظفين وكتابة الرسالة')
      return
    }

    setIsLoading(true)
    try {
      const results = await Promise.all(
        employeeList.map(employee => 
          WhatsAppService.sendMessage(employee.phone, messageText)
        )
      )
      
      const successCount = results.filter(result => result.success).length
      const failCount = results.length - successCount
      
      if (successCount > 0) {
        showSuccess(`تم إرسال ${successCount} رسالة بنجاح`)
      }
      if (failCount > 0) {
        showWarning(`فشل في إرسال ${failCount} رسالة`)
      }
    } catch (error) {
      console.error('خطأ في إرسال الرسائل المجمعة:', error)
      showError('حدث خطأ أثناء إرسال الرسائل')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 page-enter">
      {/* العنوان والبحث */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white gradient-text">
            إدارة الموظفين والرواتب
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            إدارة معلومات الموظفين ورواتبهم مع نظام المكافآت والخصومات
          </p>
        </div>
        
        <div className="flex gap-3 items-center">
          <Input
            placeholder="البحث عن موظف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          
          <div className="flex gap-2">
            <Button 
              onClick={() => {
                // إرسال رسالة جماعية لجميع الموظفين
                const allMessage = `
🔔 *رسالة جماعية لجميع الموظفين*

السلام عليكم ورحمة الله وبركاته

نود إعلامكم بأنه...

[اكتب الرسالة هنا]

شكراً لكم على اهتمامكم وتعاونكم.

مع تحيات إدارة الموارد البشرية
📅 ${new Date().toLocaleDateString('ar-EG')}
                `.trim()
                
                const confirmSend = window.confirm(`هل تريد إرسال رسالة جماعية لجميع الموظفين (${employees.length} موظف)؟`)
                if (confirmSend) {
                  const customBulkMessage = prompt('اكتب الرسالة الجماعية:', allMessage)
                  if (customBulkMessage) {
                    sendBulkMessage(employees, customBulkMessage)
                  }
                }
              }}
              className="bg-green-600 hover:bg-green-700"
              title="إرسال رسالة جماعية لجميع الموظفين"
            >
              <MessageCircle className="w-4 h-4 ml-2" />
              رسالة جماعية
            </Button>

            <Button 
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 ml-2" />
              إضافة موظف جديد
            </Button>
          </div>
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الموظفين</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{employees.length}</div>
            <p className="text-xs text-gray-500 mt-1">موظف نشط</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">متوسط الراتب</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {employees.length > 0 ? formatCurrency(
                employees.reduce((sum, emp) => sum + calculateCurrentSalary(emp), 0) / employees.length
              ) : '0 جنيه'}
            </div>
            <p className="text-xs text-gray-500 mt-1">شامل البدلات</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">مكافآت هذا الشهر</CardTitle>
            <Gift className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {employees.reduce((sum, emp) => 
                sum + (emp.monthlyAdjustments?.bonuses?.reduce((b, bonus) => b + bonus.amount, 0) || 0), 0
              )} جنيه
            </div>
            <p className="text-xs text-gray-500 mt-1">مكافأة</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الرواتب</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {formatCurrency(employees.reduce((sum, emp) => sum + calculateCurrentSalary(emp), 0))}
            </div>
            <p className="text-xs text-gray-500 mt-1">صافي الرواتب</p>
          </CardContent>
        </Card>
      </div>

      {/* جدول الموظفين */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>قائمة الموظفين ({filteredEmployees.length})</CardTitle>
          
          {/* أزرار الإرسال الجماعي */}
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={async () => {
                const confirmSend = window.confirm(`هل تريد إرسال كشوف الرواتب لجميع الموظفين (${employees.length} موظف)؟`)
                if (confirmSend) {
                  setIsLoading(true)
                  try {
                    const results = await Promise.all(
                      employees.map(async (employee, index) => {
                        const currentDate = new Date().toLocaleDateString('ar-EG')
                        const currentSalary = calculateCurrentSalary(employee)
                        
                        const salaryMessage = `
📊 *كشف راتب شهر ${new Date().toLocaleDateString('ar-EG', { month: 'long', year: 'numeric' })}*

السيد/ة: *${employee.name}*
المنصب: ${employee.position}
القسم: ${employee.department}

💰 *تفاصيل الراتب:*
• الراتب الأساسي: ${formatCurrency(employee.baseSalary)}
• البدلات: ${formatCurrency(Object.values(employee.allowances || {}).reduce((sum, allowance) => sum + allowance, 0))}
• الخصومات: ${formatCurrency(Object.values(employee.deductions || {}).reduce((sum, deduction) => sum + deduction, 0))}

💸 *إجمالي الراتب: ${formatCurrency(currentSalary)}*

📅 تاريخ الإستحقاق: ${currentDate}

شكراً لك على جهودك المبذولة 🙏
                        `.trim()
                        
                        // تأخير بسيط بين الرسائل لتجنب الإرسال السريع
                        await new Promise(resolve => setTimeout(resolve, index * 2000))
                        return WhatsAppService.sendMessage(employee.phone, salaryMessage)
                      })
                    )
                    
                    const successCount = results.filter(result => result.success).length
                    showSuccess(`تم إرسال ${successCount} كشف راتب بنجاح من أصل ${employees.length}`)
                  } catch (error) {
                    showError('حدث خطأ أثناء إرسال كشوف الرواتب')
                  } finally {
                    setIsLoading(false)
                  }
                }
              }}
              className="bg-blue-600 hover:bg-blue-700"
              title="إرسال كشوف الرواتب لجميع الموظفين"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1"></div>
              ) : (
                <FileText className="w-4 h-4 mr-1" />
              )}
              {isLoading ? 'جاري الإرسال...' : 'كشوف رواتب جماعية'}
            </Button>
            
            <Button
              size="sm"
              onClick={async () => {
                const confirmSend = window.confirm(`هل تريد إرسال تحديث رصيد الإجازات لجميع الموظفين (${employees.length} موظف)؟`)
                if (confirmSend) {
                  setIsLoading(true)
                  try {
                    const results = await Promise.all(
                      employees.map(async (employee, index) => {
                        const currentDate = new Date().toLocaleDateString('ar-EG')
                        
                        const leaveMessage = `
🏖️ *تحديث رصيد الإجازات*

عزيزي/عزيزتي: *${employee.name}*

📊 *تفاصيل رصيد الإجازات:*
• الرصيد المتاح: ${employee.attendance?.leaveBalance || 0} يوم
• الأيام المستخدمة: ${30 - (employee.attendance?.leaveBalance || 0)} يوم
• إجمالي الأيام السنوية: 30 يوم

📅 تاريخ التحديث: ${currentDate}

للاستفسار عن تقديم طلب إجازة، يرجى التواصل مع قسم الموارد البشرية.

نتمنى لك إجازة سعيدة! 🌟
                        `.trim()
                        
                        // تأخير بسيط بين الرسائل
                        await new Promise(resolve => setTimeout(resolve, index * 2000))
                        return WhatsAppService.sendMessage(employee.phone, leaveMessage)
                      })
                    )
                    
                    const successCount = results.filter(result => result.success).length
                    showSuccess(`تم إرسال ${successCount} تحديث إجازات بنجاح من أصل ${employees.length}`)
                  } catch (error) {
                    showError('حدث خطأ أثناء إرسال تحديثات الإجازات')
                  } finally {
                    setIsLoading(false)
                  }
                }
              }}
              className="bg-yellow-600 hover:bg-yellow-700"
              title="إرسال تحديث الإجازات لجميع الموظفين"
              disabled={isLoading}
            >
              <Calendar className="w-4 h-4 mr-1" />
              تحديث إجازات جماعي
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-right p-4 font-medium">الاسم</th>
                  <th className="text-right p-4 font-medium">المنصب</th>
                  <th className="text-right p-4 font-medium">القسم</th>
                  <th className="text-right p-4 font-medium">الراتب الأساسي</th>
                  <th className="text-right p-4 font-medium">البدلات</th>
                  <th className="text-right p-4 font-medium">الخصومات</th>
                  <th className="text-right p-4 font-medium">صافي الراتب</th>
                  <th className="text-center p-4 font-medium">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => {
                  const allowancesTotal = Object.values(employee.allowances || {}).reduce((sum, allowance) => sum + allowance, 0)
                  const deductionsTotal = Object.values(employee.deductions || {}).reduce((sum, deduction) => sum + deduction, 0)
                  const netSalary = calculateCurrentSalary(employee)

                  return (
                    <tr key={employee.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-gray-500">{employee.phone}</div>
                        </div>
                      </td>
                      <td className="p-4">{employee.position}</td>
                      <td className="p-4">{employee.department}</td>
                      <td className="p-4 font-medium">{formatCurrency(employee.baseSalary)}</td>
                      <td className="p-4 text-green-600">+{formatCurrency(allowancesTotal)}</td>
                      <td className="p-4 text-red-600">-{formatCurrency(deductionsTotal)}</td>
                      <td className="p-4">
                        <span className="font-bold text-lg text-green-600">
                          {formatCurrency(netSalary)}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1 justify-center flex-wrap">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedEmployee(employee)
                              setShowDetailsModal(true)
                            }}
                            className="border-gray-600 text-gray-600 hover:bg-gray-50"
                            title="عرض التفاصيل"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => loadEmployeeForEdit(employee)}
                            className="border-gray-600 text-gray-600 hover:bg-gray-50"
                            title="تعديل بيانات الموظف"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>

                          {/* زر الرسائل */}
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => openMessageTypeModal(employee)}
                            className="border-green-600 text-green-600 hover:bg-green-50"
                            title="إرسال رسالة WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => deleteEmployee(employee.id)}
                            className="border-red-600 text-red-600 hover:bg-red-50"
                            title="حذف الموظف"
                          >
                            <X className="w-4 h-4" />
                          </Button>
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

      {/* Empty state */}
      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            لا توجد موظفين
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {searchTerm ? 'لم يتم العثور على نتائج للبحث' : 'ابدأ بإضافة موظف جديد'}
          </p>
          {!searchTerm && (
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4 ml-2" />
              إضافة موظف جديد
            </Button>
          )}
        </div>
      )}

      {/* نافذة إرسال الرسائل */}
      {showMessageModal && selectedEmployeeForMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                إرسال رسالة WhatsApp إلى {selectedEmployeeForMessage.name}
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowMessageModal(false)
                  setSelectedEmployeeForMessage(null)
                  setMessageTemplate('')
                  setCustomMessage('')
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {/* اختيار نوع الرسالة */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  نوع الرسالة
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Button
                    variant={messageType === 'salary' ? 'default' : 'outline'}
                    onClick={() => {
                      setMessageType('salary')
                      generateMessageTemplate(selectedEmployeeForMessage, 'salary')
                    }}
                    className="flex flex-col items-center gap-1 h-auto py-3"
                  >
                    <FileText className="w-4 h-4" />
                    <span className="text-xs">كشف راتب</span>
                  </Button>
                  
                  <Button
                    variant={messageType === 'leave' ? 'default' : 'outline'}
                    onClick={() => {
                      setMessageType('leave')
                      generateMessageTemplate(selectedEmployeeForMessage, 'leave')
                    }}
                    className="flex flex-col items-center gap-1 h-auto py-3"
                  >
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs">رصيد الإجازات</span>
                  </Button>
                  
                  <Button
                    variant={messageType === 'notification' ? 'default' : 'outline'}
                    onClick={() => {
                      setMessageType('notification')
                      generateMessageTemplate(selectedEmployeeForMessage, 'notification')
                    }}
                    className="flex flex-col items-center gap-1 h-auto py-3"
                  >
                    <Bell className="w-4 h-4" />
                    <span className="text-xs">إشعار</span>
                  </Button>
                  
                  <Button
                    variant={messageType === 'custom' ? 'default' : 'outline'}
                    onClick={() => {
                      setMessageType('custom')
                      generateMessageTemplate(selectedEmployeeForMessage, 'custom')
                    }}
                    className="flex flex-col items-center gap-1 h-auto py-3"
                  >
                    <Send className="w-4 h-4" />
                    <span className="text-xs">رسالة مخصصة</span>
                  </Button>
                </div>
              </div>

              {/* معاينة القالب */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  معاينة القالب
                </label>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200">
                    {messageTemplate}
                  </pre>
                </div>
              </div>

              {/* تخصيص الرسالة */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  تعديل الرسالة (اختياري)
                </label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="اتركه فارغاً لاستخدام القالب الافتراضي أو اكتب رسالة مخصصة..."
                  className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* معلومات الموظف */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  معلومات الموظف
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">الاسم:</span>
                    <span className="font-medium text-gray-900 dark:text-white mr-2">
                      {selectedEmployeeForMessage.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">رقم الهاتف:</span>
                    <span className="font-medium text-gray-900 dark:text-white mr-2">
                      {selectedEmployeeForMessage.phone}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">المنصب:</span>
                    <span className="font-medium text-gray-900 dark:text-white mr-2">
                      {selectedEmployeeForMessage.position}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">القسم:</span>
                    <span className="font-medium text-gray-900 dark:text-white mr-2">
                      {selectedEmployeeForMessage.department}
                    </span>
                  </div>
                </div>
              </div>

              {/* حالة الرسالة */}
              {messageStatus && (
                <div className={`p-4 rounded-lg border ${
                  messageStatus === 'success' ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' :
                  messageStatus === 'failed' ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' :
                  'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
                }`}>
                  <div className="flex items-center gap-2">
                    {messageStatus === 'sending' && (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                        <span className="text-blue-800 dark:text-blue-200 font-medium">جاري إرسال الرسالة...</span>
                      </>
                    )}
                    {messageStatus === 'success' && (
                      <>
                        <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-green-800 dark:text-green-200 font-medium">✅ {messageSuccess}</span>
                      </>
                    )}
                    {messageStatus === 'failed' && (
                      <>
                        <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-red-800 dark:text-red-200 font-medium">❌ فشل في إرسال الرسالة</span>
                          <span className="text-red-600 dark:text-red-400 text-sm mt-1">السبب: {messageError}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* أزرار الإجراءات */}
              <div className="flex gap-3 justify-end pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowMessageModal(false)
                    setSelectedEmployeeForMessage(null)
                    setMessageTemplate('')
                    setCustomMessage('')
                    setMessageStatus(null)
                    setMessageError('')
                    setMessageSuccess('')
                  }}
                  disabled={isLoading}
                >
                  إلغاء
                </Button>
                
                <Button
                  onClick={sendMessage}
                  disabled={isLoading || (!messageTemplate.trim() && !customMessage.trim()) || messageStatus === 'success'}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      جاري الإرسال...
                    </>
                  ) : messageStatus === 'success' ? (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      تم الإرسال بنجاح
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      إرسال الرسالة
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}



      {/* نافذة اختيار نوع الرسالة */}
      {showMessageTypeModal && selectedEmployeeForMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                إرسال رسالة WhatsApp
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                إلى: <span className="font-semibold text-gray-900 dark:text-white">{selectedEmployeeForMessage.name}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {selectedEmployeeForMessage.position} - {selectedEmployeeForMessage.department}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white text-center mb-6">
                اختر نوع الرسالة
              </h4>
              
              <div className="grid grid-cols-1 gap-4">
                {/* كشف راتب */}
                <button
                  onClick={() => {
                    openMessageModal(selectedEmployeeForMessage, 'salary')
                    setShowMessageTypeModal(false)
                  }}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-xl hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right flex-1">
                    <h5 className="font-semibold text-gray-900 dark:text-white">كشف راتب</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">إرسال تفاصيل الراتب الشهري</p>
                  </div>
                  <div className="text-blue-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>

                {/* رصيد الإجازات */}
                <button
                  onClick={() => {
                    openMessageModal(selectedEmployeeForMessage, 'leave')
                    setShowMessageTypeModal(false)
                  }}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-700 rounded-xl hover:from-yellow-100 hover:to-orange-100 dark:hover:from-yellow-900/30 dark:hover:to-orange-900/30 transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right flex-1">
                    <h5 className="font-semibold text-gray-900 dark:text-white">رصيد الإجازات</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">إرسال تحديث الإجازات المتاحة</p>
                  </div>
                  <div className="text-yellow-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>

                {/* إشعار */}
                <button
                  onClick={() => {
                    openMessageModal(selectedEmployeeForMessage, 'notification')
                    setShowMessageTypeModal(false)
                  }}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-700 rounded-xl hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Bell className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right flex-1">
                    <h5 className="font-semibold text-gray-900 dark:text-white">إشعار هام</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">إرسال إشعار عام أو تنبيه</p>
                  </div>
                  <div className="text-purple-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>

                {/* رسالة مخصصة */}
                <button
                  onClick={() => {
                    openMessageModal(selectedEmployeeForMessage, 'custom')
                    setShowMessageTypeModal(false)
                  }}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-2 border-green-200 dark:border-green-700 rounded-xl hover:from-green-100 hover:to-teal-100 dark:hover:from-green-900/30 dark:hover:to-teal-900/30 transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right flex-1">
                    <h5 className="font-semibold text-gray-900 dark:text-white">رسالة مخصصة</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">كتابة رسالة حرة ومخصصة</p>
                  </div>
                  <div className="text-green-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>
              </div>

              {/* زر إلغاء */}
              <div className="pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowMessageTypeModal(false)
                    setSelectedEmployeeForMessage(null)
                  }}
                  className="w-full"
                >
                  إلغاء
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmployeesPage 