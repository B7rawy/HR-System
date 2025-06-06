import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { 
  User, 
  Calendar,
  DollarSign,
  TrendingUp,
  Award,
  Clock,
  Target,
  Gift,
  Eye,
  Download,
  Star,
  CheckCircle,
  Shield,
  Home,
  Car,
  FileText,
  CreditCard,
  GraduationCap,
  Bell,
  Plus,
  Edit3,
  BarChart3,
  Users,
  Activity,
  FileCheck,
  Clock3,
  Wallet,
  Phone as PhoneIcon,
  UserCheck,
  BookOpen,
  Archive
} from 'lucide-react'
import { formatCurrency, formatDate } from '../utils/formatters'

const MePage = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview')

  console.log('MePage user:', user) // للتحقق من البيانات في console

  // التحقق من وجود المستخدم
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">لم يتم تسجيل الدخول</h2>
          <p className="text-gray-600 dark:text-gray-300">يرجى تسجيل الدخول للوصول إلى هذه الصفحة</p>
        </div>
      </div>
    )
  }

  // بيانات الموظف
  const employeeData = {
    name: user.name || user.username || 'فاطمة أحمد',
    position: 'محاسبة أولى',
    department: 'القسم المالي',
    email: user.email || 'fatima@company.com',
    phone: '0501234567',
    address: 'الرياض، المملكة العربية السعودية',
    joinDate: '2022-03-15',
    employeeId: 'EMP-2024-001',
    directManager: 'أحمد محمد',
    workLocation: 'المقر الرئيسي - الدور الثالث',
    salary: {
      basic: 8500,
      allowances: 2000,
      housing: 1500,
      transportation: 800,
      deductions: 950,
      insurance: 450,
      tax: 500,
      net: 11350,
      lastPayDate: '2024-06-01'
    },
    performance: {
      rating: 4.2,
      tasks: 28,
      completed: 26,
      attendance: 96,
      goals: 12,
      achievedGoals: 10,
      lastReview: '2024-03-15'
    },
    attendance: {
      todayStatus: 'حاضر',
      checkInTime: '08:15',
      checkOutTime: '-',
      totalHours: '7.5',
      thisMonthDays: 22,
      presentDays: 21,
      lateDays: 2,
      absences: 1
    },
    benefits: [
      { id: 1, title: 'تأمين صحي شامل', status: 'نشط', coverage: '100%', icon: Shield },
      { id: 2, title: 'تأمين اجتماعي', status: 'نشط', coverage: '10%', icon: Users },
      { id: 3, title: 'بدل سكن', status: 'نشط', amount: 1500, icon: Home },
      { id: 4, title: 'بدل مواصلات', status: 'نشط', amount: 800, icon: Car },
      { id: 5, title: 'بدل هاتف', status: 'نشط', amount: 200, icon: PhoneIcon },
      { id: 6, title: 'تدريب مهني', status: 'متاح', coverage: 'مجاني', icon: BookOpen }
    ],
    documents: [
      { id: 1, title: 'عقد العمل', date: '2022-03-15', type: 'PDF', size: '245 KB', icon: FileText },
      { id: 2, title: 'صورة الهوية', date: '2022-03-15', type: 'JPG', size: '156 KB', icon: CreditCard },
      { id: 3, title: 'الشهادات العلمية', date: '2022-03-15', type: 'PDF', size: '892 KB', icon: GraduationCap },
      { id: 4, title: 'السيرة الذاتية', date: '2024-01-15', type: 'PDF', size: '324 KB', icon: FileText },
      { id: 5, title: 'شهادة الخبرة', date: '2023-12-20', type: 'PDF', size: '178 KB', icon: Award },
      { id: 6, title: 'التقييم السنوي', date: '2024-03-15', type: 'PDF', size: '267 KB', icon: BarChart3 }
    ],
    requests: [
      { id: 1, type: 'إجازة سنوية', date: '2024-06-01', duration: '5 أيام', status: 'موافق عليها', color: 'green' },
      { id: 2, type: 'إجازة مرضية', date: '2024-05-20', duration: '2 أيام', status: 'قيد المراجعة', color: 'yellow' },
      { id: 3, type: 'تعديل بيانات', date: '2024-05-15', duration: '-', status: 'مكتملة', color: 'blue' },
      { id: 4, type: 'شهادة راتب', date: '2024-05-10', duration: '-', status: 'مكتملة', color: 'blue' }
    ],
    notifications: [
      { id: 1, title: 'تم صرف الراتب', message: 'تم صرف راتب شهر يونيو بنجاح', time: '10 دقائق', type: 'success', read: false },
      { id: 2, title: 'اجتماع فريق العمل', message: 'اجتماع يوم الأحد الساعة 10 صباحاً', time: '2 ساعات', type: 'info', read: false },
      { id: 3, title: 'تذكير تقييم الأداء', message: 'موعد التقييم الربع سنوي قريباً', time: '5 ساعات', type: 'warning', read: true },
      { id: 4, title: 'دورة تدريبية جديدة', message: 'دورة Excel المتقدم متاحة الآن', time: '1 يوم', type: 'info', read: true }
    ]
  }

  const tabs = [
    { id: 'overview', label: 'نظرة عامة', icon: BarChart3 },
    { id: 'salary', label: 'الراتب والمزايا', icon: DollarSign },
    { id: 'attendance', label: 'الحضور والانصراف', icon: Clock },
    { id: 'performance', label: 'الأداء والتقييم', icon: TrendingUp },
    { id: 'documents', label: 'المستندات', icon: FileText },
    { id: 'requests', label: 'الطلبات والإجازات', icon: Calendar }
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      {/* ترحيب ومعلومات سريعة */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 text-white p-6 rounded-xl shadow-xl">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 rtl:space-x-reverse">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-10 h-10" />
          </div>
          <div className="flex-1 text-center md:text-right">
            <h1 className="text-3xl font-bold mb-2">مرحباً، {employeeData.name}</h1>
            <p className="text-blue-100 text-lg">{employeeData.position} - {employeeData.department}</p>
            <p className="text-blue-200 text-sm mt-2">رقم الموظف: {employeeData.employeeId}</p>
            <div className="mt-4 flex flex-col md:flex-row gap-2 text-sm">
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                📅 انضمام: {formatDate(employeeData.joinDate)}
              </span>
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                👥 المدير المباشر: {employeeData.directManager}
              </span>
            </div>
          </div>
          <div className="text-center md:text-left">
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <p className="text-xs text-blue-200">حالة اليوم</p>
              <p className="text-lg font-bold text-green-200">{employeeData.attendance.todayStatus}</p>
              <p className="text-xs text-blue-200">دخول: {employeeData.attendance.checkInTime}</p>
            </div>
          </div>
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 dark:text-green-400 text-sm font-medium">الراتب الصافي</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">{formatCurrency(employeeData.salary.net)}</p>
              </div>
              <Wallet className="w-8 h-8 text-green-500 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">نسبة الحضور</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{employeeData.performance.attendance}%</p>
              </div>
              <UserCheck className="w-8 h-8 text-blue-500 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">تقييم الأداء</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{employeeData.performance.rating}/5</p>
              </div>
              <Star className="w-8 h-8 text-purple-500 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">المهام المكتملة</p>
                <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">{employeeData.performance.completed}/{employeeData.performance.tasks}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-orange-500 dark:text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* التنبيهات والإشعارات */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <Bell className="w-5 h-5 text-orange-500 dark:text-orange-400" />
              <span>الإشعارات الحديثة</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {employeeData.notifications.slice(0, 4).map((notification) => (
                <div key={notification.id} className={`flex items-start space-x-3 rtl:space-x-reverse p-3 rounded-lg ${
                  notification.type === 'success' ? 'bg-green-50 dark:bg-green-900/20' :
                  notification.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20' : 'bg-blue-50 dark:bg-blue-900/20'
                }`}>
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    notification.type === 'success' ? 'bg-green-500 dark:bg-green-400' :
                    notification.type === 'warning' ? 'bg-yellow-500 dark:bg-yellow-400' : 'bg-blue-500 dark:bg-blue-400'
                  }`} />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{notification.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{notification.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <Calendar className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              <span>الطلبات الأخيرة</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {employeeData.requests.slice(0, 4).map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{request.type}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{formatDate(request.date)}</p>
                    {request.duration !== '-' && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">{request.duration}</p>
                    )}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    request.color === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                    request.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                    'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  }`}>
                    {request.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderSalary = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <DollarSign className="w-5 h-5 text-green-500 dark:text-green-400" />
              <span>تفاصيل الراتب الشهري</span>
            </CardTitle>
            <CardDescription>راتب شهر يونيو 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">الراتب الأساسي</p>
                  <p className="text-xl font-bold text-green-700 dark:text-green-300">{formatCurrency(employeeData.salary.basic)}</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">البدلات</p>
                  <p className="text-xl font-bold text-blue-700 dark:text-blue-300">{formatCurrency(employeeData.salary.allowances)}</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">بدل سكن</p>
                  <p className="text-xl font-bold text-purple-700 dark:text-purple-300">{formatCurrency(employeeData.salary.housing)}</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                  <p className="text-sm font-medium text-orange-600 dark:text-orange-400">بدل مواصلات</p>
                  <p className="text-xl font-bold text-orange-700 dark:text-orange-300">{formatCurrency(employeeData.salary.transportation)}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                    <p className="text-sm font-medium text-red-600 dark:text-red-400">التأمينات</p>
                    <p className="text-xl font-bold text-red-700 dark:text-red-300">-{formatCurrency(employeeData.salary.insurance)}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">الضرائب</p>
                    <p className="text-xl font-bold text-gray-700 dark:text-gray-200">-{formatCurrency(employeeData.salary.tax)}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                <div className="bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 text-white p-4 rounded-lg">
                  <p className="text-green-100 dark:text-green-200">الراتب الصافي</p>
                  <p className="text-3xl font-bold">{formatCurrency(employeeData.salary.net)}</p>
                  <p className="text-sm text-green-200 dark:text-green-300">آخر صرف: {formatDate(employeeData.salary.lastPayDate)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <Gift className="w-5 h-5 text-purple-500 dark:text-purple-400" />
              <span>المزايا والحوافز</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employeeData.benefits.map((benefit) => {
                const Icon = benefit.icon
                return (
                  <div key={benefit.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Icon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{benefit.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {benefit.amount ? `${formatCurrency(benefit.amount)} شهرياً` : 
                           benefit.coverage ? `تغطية: ${benefit.coverage}` : ''}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">{benefit.status}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderAttendance = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <Clock className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              <span>حضور اليوم</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8 text-green-500 dark:text-green-400" />
                </div>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">{employeeData.attendance.todayStatus}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <p className="text-sm text-blue-600 dark:text-blue-400">دخول</p>
                  <p className="font-bold text-blue-700 dark:text-blue-300">{employeeData.attendance.checkInTime}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-300">خروج</p>
                  <p className="font-bold text-gray-700">{employeeData.attendance.checkOutTime}</p>
                </div>
              </div>
              
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <p className="text-sm text-purple-600">ساعات العمل</p>
                <p className="font-bold text-purple-700">{employeeData.attendance.totalHours} ساعة</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <BarChart3 className="w-5 h-5 text-green-500" />
              <span>إحصائيات الشهر</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{employeeData.attendance.presentDays}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">أيام حضور</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">{employeeData.attendance.absences}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">أيام غياب</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{employeeData.attendance.lateDays}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">أيام تأخير</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{employeeData.attendance.thisMonthDays}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">أيام العمل</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 text-white p-3 rounded-lg text-center">
                <p className="text-green-100 dark:text-green-200">نسبة الحضور</p>
                <p className="text-2xl font-bold">{employeeData.performance.attendance}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <Activity className="w-5 h-5 text-orange-500 dark:text-orange-400" />
              <span>إجراءات سريعة</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Clock3 className="w-4 h-4 ml-2" />
                تسجيل خروج
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="w-4 h-4 ml-2" />
                طلب إجازة
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="w-4 h-4 ml-2" />
                تقرير الحضور
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Edit3 className="w-4 h-4 ml-2" />
                تعديل البيانات
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderPerformance = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <TrendingUp className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              <span>تقييم الأداء</span>
            </CardTitle>
            <CardDescription>آخر تقييم: {formatDate(employeeData.performance.lastReview)}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{employeeData.performance.rating}</div>
                    <div className="text-sm text-yellow-600 dark:text-yellow-400">من 5</div>
                  </div>
                </div>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">أداء ممتاز</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">تقييم فوق المتوسط</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-green-700 dark:text-green-300">{employeeData.performance.completed}</div>
                  <div className="text-sm text-green-600 dark:text-green-400">مهام مكتملة</div>
                </div>
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Target className="w-6 h-6 text-blue-500 dark:text-blue-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-blue-700 dark:text-blue-300">{employeeData.performance.achievedGoals}</div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">أهداف محققة</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <Award className="w-5 h-5 text-purple-500 dark:text-purple-400" />
              <span>الإنجازات والمهارات</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">المهارات الأساسية</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 dark:text-gray-300">المحاسبة المالية</span>
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className={`w-4 h-4 ${i <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Excel المتقدم</span>
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className={`w-4 h-4 ${i <= 5 ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 dark:text-gray-300">إدارة الوقت</span>
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className={`w-4 h-4 ${i <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">الإنجازات الأخيرة</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" />
                    <span className="text-gray-700 dark:text-gray-300">تطوير نظام التقارير المالية</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" />
                    <span className="text-gray-700 dark:text-gray-300">قيادة مشروع تحسين العمليات</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" />
                    <span className="text-gray-700 dark:text-gray-300">إكمال دورة CPA</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderDocuments = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Archive className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              <span>المستندات والملفات</span>
            </div>
            <Button size="sm">
              <Plus className="w-4 h-4 ml-2" />
              إضافة ملف
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {employeeData.documents.map((document) => {
              const Icon = document.icon
              return (
                <div key={document.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md dark:hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
                  <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <Icon className="w-8 h-8 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white truncate">{document.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(document.date)}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{document.type} • {document.size}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex space-x-2 rtl:space-x-reverse">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 ml-2" />
                      عرض
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="w-4 h-4 ml-2" />
                      تحميل
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderRequests = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Plus className="w-5 h-5 text-green-500 dark:text-green-400" />
                <span>طلب جديد</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full justify-start bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700">
                <Calendar className="w-4 h-4 ml-2" />
                طلب إجازة سنوية
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileCheck className="w-4 h-4 ml-2" />
                شهادة راتب
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Edit3 className="w-4 h-4 ml-2" />
                تعديل البيانات الشخصية
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Bell className="w-4 h-4 ml-2" />
                استفسار إداري
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <Clock className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              <span>الطلبات السابقة</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {employeeData.requests.map((request) => (
                <div key={request.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{request.type}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      request.color === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                      request.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                      'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <p>تاريخ الطلب: {formatDate(request.date)}</p>
                    {request.duration !== '-' && <p>المدة: {request.duration}</p>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview': return renderOverview()
      case 'salary': return renderSalary()
      case 'attendance': return renderAttendance()
      case 'performance': return renderPerformance()
      case 'documents': return renderDocuments()
      case 'requests': return renderRequests()
      default: return renderOverview()
    }
  }

  return (
    <div className="space-y-6">
      {/* التبويبات */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto">
        <div className="flex space-x-0 rtl:space-x-reverse min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 rtl:space-x-reverse px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* محتوى التبويب */}
      {renderTabContent()}
    </div>
  )
}

export default MePage 