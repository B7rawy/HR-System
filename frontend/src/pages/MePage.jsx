import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
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
  Archive,
  Minus,
  AlertTriangle,
  Calculator,
  TrendingDown,
  Calendar as CalendarIcon
} from 'lucide-react'
import { formatCurrency, formatDate } from '../utils/formatters'

const MePage = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedScreenshot, setSelectedScreenshot] = useState(null)
  const [showScreenshotModal, setShowScreenshotModal] = useState(false)

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
    phone: '01012345678',
    address: 'مصر الجديدة، القاهرة، جمهورية مصر العربية',
    joinDate: '2022-03-15',
    employeeId: 'EMP-2024-001',
    directManager: 'أحمد محمد',
    workLocation: 'المقر الرئيسي - الدور الثالث',
    salary: {
      basic: 12000, // راتب مناسب للسوق المصري
      allowances: 3000,
      housing: 2000,
      transportation: 1200,
      deductions: 1500,
      insurance: 650,
      tax: 850,
      hourlyDeductions: 480, // إجمالي خصومات الساعات المتأخرة
      net: 15520, // تم تعديل الراتب الصافي ليشمل خصومات الساعات
      lastPayDate: '2024-06-01',
      hourlyRate: 75, // معدل خصم الساعة الواحدة بالجنيه المصري
      requiredDailyHours: 8, // عدد الساعات المطلوبة يومياً
              dailyDeductions: [
          { date: '2024-06-01', requiredHours: 8, actualHours: 8, deduction: 0, hasPermission: false, reason: 'حضور كامل' },
          { date: '2024-06-02', requiredHours: 8, actualHours: 8, deduction: 0, hasPermission: false, reason: 'حضور كامل' },
          { date: '2024-06-03', requiredHours: 8, actualHours: 7.5, deduction: 38, hasPermission: false, reason: 'انصراف مبكر 30 دقيقة' },
          { date: '2024-06-04', requiredHours: 8, actualHours: 8, deduction: 0, hasPermission: false, reason: 'حضور كامل' },
          { date: '2024-06-05', requiredHours: 8, actualHours: 6, deduction: 150, hasPermission: false, reason: 'غياب جزئي - خروج مبكر ساعتين' },
          { date: '2024-06-06', requiredHours: 8, actualHours: 0, deduction: 0, hasPermission: true, reason: 'إجازة مرضية معتمدة' },
          { date: '2024-06-07', requiredHours: 0, actualHours: 0, deduction: 0, hasPermission: true, reason: 'عطلة أسبوعية' },
          { date: '2024-06-08', requiredHours: 8, actualHours: 7, deduction: 75, hasPermission: false, reason: 'تأخير في الحضور - ساعة واحدة' },
          { date: '2024-06-09', requiredHours: 8, actualHours: 5, deduction: 225, hasPermission: false, reason: 'انصراف مبكر - 3 ساعات' },
          { date: '2024-06-10', requiredHours: 8, actualHours: 8, deduction: 0, hasPermission: false, reason: 'حضور كامل' },
          { date: '2024-06-11', requiredHours: 8, actualHours: 7.5, deduction: 0, hasPermission: true, reason: 'إذن خروج مبكر معتمد' },
          { date: '2024-06-12', requiredHours: 8, actualHours: 6.5, deduction: 113, hasPermission: false, reason: 'تأخير في الحضور - ساعة ونصف' },
          { date: '2024-06-13', requiredHours: 8, actualHours: 8, deduction: 0, hasPermission: false, reason: 'حضور كامل' },
          { date: '2024-06-14', requiredHours: 0, actualHours: 0, deduction: 0, hasPermission: true, reason: 'عطلة أسبوعية' },
          { date: '2024-06-15', requiredHours: 8, actualHours: 4, deduction: 300, hasPermission: false, reason: 'غياب جزئي - نصف يوم بدون إذن' }
        ]
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
    desktopTracking: {
      appStatus: 'غير متصل', // متصل / غير متصل
      currentSession: {
        checkInTime: '08:15:23',
        workingTime: '0:00:00', // الوقت المنقضي منذ الحضور - يظهر صفر عند عدم الاتصال
        idleTime: '0:00:00', // وقت عدم النشاط - يظهر صفر عند عدم الاتصال
        activeTime: '0:00:00', // وقت النشاط الفعلي - يظهر صفر عند عدم الاتصال
        lastActivity: '2024-06-09T08:15:23Z',
        isActive: false // غير نشط عند عدم اتصال التطبيق
      },
      todayStats: {
        totalWorkTime: '0:00:00', // يظهر صفر عند عدم الاتصال
        totalIdleTime: '0:00:00', // يظهر صفر عند عدم الاتصال
        productivityScore: 0, // نسبة الإنتاجية صفر عند عدم الاتصال
        screenshotCount: 0, // لا توجد لقطات عند عدم الاتصال
        activityLevel: 'غير متاح' // غير متاح عند عدم الاتصال
      },
      weeklyStats: [
        { day: 'الأحد', workTime: '8:15:30', idleTime: '1:12:45', productivity: 87 },
        { day: 'الإثنين', workTime: '7:45:20', idleTime: '2:05:30', productivity: 79 },
        { day: 'الثلاثاء', workTime: '8:30:15', idleTime: '0:58:20', productivity: 90 },
        { day: 'الأربعاء', workTime: '7:12:45', idleTime: '1:35:40', productivity: 82 },
        { day: 'الخميس', workTime: '8:05:30', idleTime: '1:15:25', productivity: 86 },
        { day: 'الجمعة', workTime: '6:30:20', idleTime: '2:20:15', productivity: 75 },
        { day: 'السبت', workTime: '7:23:45', idleTime: '1:24:12', productivity: 84 }
      ],
      recentScreenshots: [
        // لا توجد لقطات شاشة عند عدم اتصال التطبيق
        // ستظهر هذه اللقطات عند اتصال التطبيق:
        // { id: 1, timestamp: '15:38:45', activity: 'عمل على Excel', thumbnail: '/screenshots/screenshot_1.jpg' },
        // { id: 2, timestamp: '15:23:12', activity: 'تصفح المواقع المهنية', thumbnail: '/screenshots/screenshot_2.jpg' },
        // { id: 3, timestamp: '15:08:30', activity: 'اجتماع فيديو', thumbnail: '/screenshots/screenshot_3.jpg' },
        // { id: 4, timestamp: '14:52:18', activity: 'كتابة التقارير', thumbnail: '/screenshots/screenshot_4.jpg' },
        // { id: 5, timestamp: '14:35:45', activity: 'مراجعة الإيميلات', thumbnail: '/screenshots/screenshot_5.jpg' }
      ],
      permissions: {
        canStartFromWeb: false, // لا يمكن بدء الحضور من الويب إلا بوجود التطبيق
        canViewScreenshots: true, // يمكن مشاهدة الصور فقط
        canDeleteScreenshots: false // لا يمكن مسح الصور
      }
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
    { id: 'desktop-tracking', label: 'مراقبة سطح المكتب', icon: Activity },
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

  // دالة لفتح نافذة عرض الصورة
  const openScreenshotModal = (screenshot) => {
    setSelectedScreenshot(screenshot)
    setShowScreenshotModal(true)
  }

  // دالة محاولة تسجيل الحضور/الانصراف
  const handleAttendanceAction = (action) => {
    if (employeeData.desktopTracking.appStatus !== 'متصل') {
      alert('⚠️ يجب تشغيل تطبيق سطح المكتب أولاً لتسجيل الحضور/الانصراف')
      return
    }
    
    // هنا يمكن إضافة منطق تسجيل الحضور/الانصراف
    alert(`✅ تم ${action} بنجاح`)
  }

  const renderDesktopTracking = () => (
    <div className="space-y-6">
      {/* تحذير حالة التطبيق */}
      {employeeData.desktopTracking.appStatus !== 'متصل' && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              <div>
                <h3 className="text-red-800 dark:text-red-200 font-semibold">تطبيق سطح المكتب غير متصل</h3>
                <p className="text-red-600 dark:text-red-300 text-sm">
                  يجب تشغيل تطبيق مراقبة سطح المكتب للحصول على البيانات الدقيقة وتسجيل الحضور/الانصراف
                </p>
              </div>
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  // محاكاة اتصال التطبيق للعرض التوضيحي
                  alert('🔧 هذا للعرض التوضيحي فقط\nفي الواقع، سيتم اتصال التطبيق تلقائياً عند تشغيله على سطح المكتب')
                }}
              >
                💻 تحميل التطبيق
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  alert('ℹ️ إرشادات تشغيل التطبيق:\n\n1. تحميل التطبيق من الرابط المخصص\n2. تثبيت التطبيق على جهاز العمل\n3. تسجيل الدخول بنفس بيانات الموقع\n4. سيتم اتصال التطبيق تلقائياً')
                }}
              >
                ❓ المساعدة
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* حالة الحضور الحالية */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-800 dark:text-blue-200 flex items-center space-x-2 rtl:space-x-reverse">
              <Clock className="w-5 h-5" />
              <span>حالة الحضور</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-600 dark:text-blue-300">الحالة:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  employeeData.attendance.todayStatus === 'حاضر' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                  {employeeData.attendance.todayStatus}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-600 dark:text-blue-300">وقت الدخول:</span>
                <span className="font-medium text-blue-800 dark:text-blue-200">{employeeData.desktopTracking.currentSession.checkInTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-600 dark:text-blue-300">وقت العمل:</span>
                <span className="font-medium text-blue-800 dark:text-blue-200">{employeeData.desktopTracking.currentSession.workingTime}</span>
              </div>
                             <Button 
                className={`w-full mt-3 ${
                  employeeData.desktopTracking.appStatus !== 'متصل'
                    ? 'bg-gray-400 cursor-not-allowed opacity-50' 
                    : employeeData.attendance.todayStatus === 'حاضر'
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-green-600 hover:bg-green-700'
                }`}
                onClick={() => handleAttendanceAction(employeeData.attendance.todayStatus === 'حاضر' ? 'الانصراف' : 'الحضور')}
                disabled={employeeData.desktopTracking.appStatus !== 'متصل'}
                title={employeeData.desktopTracking.appStatus !== 'متصل' ? 'يجب تشغيل تطبيق سطح المكتب أولاً' : ''}
              >
                {employeeData.desktopTracking.appStatus !== 'متصل' 
                  ? '🔒 تطبيق سطح المكتب مطلوب' 
                  : employeeData.attendance.todayStatus === 'حاضر' 
                    ? '🔴 تسجيل الانصراف' 
                    : '🟢 تسجيل الحضور'
                }
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-800 dark:text-green-200 flex items-center space-x-2 rtl:space-x-reverse">
              <Activity className="w-5 h-5" />
              <span>النشاط اليوم</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-600 dark:text-green-300">وقت النشاط:</span>
                <span className="font-medium text-green-800 dark:text-green-200">{employeeData.desktopTracking.currentSession.activeTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-600 dark:text-green-300">وقت عدم النشاط:</span>
                <span className="font-medium text-orange-600 dark:text-orange-400">{employeeData.desktopTracking.currentSession.idleTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-600 dark:text-green-300">مستوى النشاط:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  employeeData.desktopTracking.todayStats.activityLevel === 'عالي'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    : employeeData.desktopTracking.todayStats.activityLevel === 'متوسط'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                      : employeeData.desktopTracking.todayStats.activityLevel === 'غير متاح'
                        ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                  {employeeData.desktopTracking.todayStats.activityLevel}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${employeeData.desktopTracking.todayStats.productivityScore}%` }}
                ></div>
              </div>
              <div className="text-center text-sm text-green-600 dark:text-green-300">
                نسبة الإنتاجية: {employeeData.desktopTracking.todayStats.productivityScore}%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-800 dark:text-purple-200 flex items-center space-x-2 rtl:space-x-reverse">
              <Eye className="w-5 h-5" />
              <span>المراقبة</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-purple-600 dark:text-purple-300">حالة التطبيق:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  employeeData.desktopTracking.appStatus === 'متصل'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                  {employeeData.desktopTracking.appStatus}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-purple-600 dark:text-purple-300">لقطات الشاشة:</span>
                <span className="font-medium text-purple-800 dark:text-purple-200">{employeeData.desktopTracking.todayStats.screenshotCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-purple-600 dark:text-purple-300">آخر نشاط:</span>
                <span className="font-medium text-purple-800 dark:text-purple-200 text-xs">
                  {new Date(employeeData.desktopTracking.currentSession.lastActivity).toLocaleTimeString('ar-EG')}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-1000 ${
                  employeeData.desktopTracking.currentSession.isActive 
                    ? 'bg-green-500 animate-pulse' 
                    : 'bg-gray-400'
                }`} style={{ width: '100%' }}></div>
              </div>
              <div className="text-center text-xs text-purple-600 dark:text-purple-300">
                {employeeData.desktopTracking.currentSession.isActive ? '🟢 نشط حالياً' : '🔴 غير نشط'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* الإحصائيات الأسبوعية */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
            <BarChart3 className="w-5 h-5" />
            <span>إحصائيات الأسبوع</span>
          </CardTitle>
          <CardDescription>تتبع ساعات العمل والإنتاجية خلال الأسبوع</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={employeeData.desktopTracking.weeklyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'productivity' ? `${value}%` : value, 
                  name === 'productivity' ? 'الإنتاجية' : name === 'workTime' ? 'وقت العمل' : 'وقت عدم النشاط'
                ]}
              />
              <Legend />
              <Bar dataKey="productivity" fill="#10b981" name="الإنتاجية %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* لقطات الشاشة الأخيرة */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Eye className="w-5 h-5" />
              <span>لقطات الشاشة الأخيرة</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              🔒 للمشاهدة فقط - لا يمكن المسح
            </span>
          </CardTitle>
          <CardDescription>
            يتم أخذ لقطات عشوائية كل فترة لضمان الحضور الفعلي - البيانات محمية ولا يمكن مسحها
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {employeeData.desktopTracking.recentScreenshots.map((screenshot) => (
              <div 
                key={screenshot.id}
                className="border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                onClick={() => openScreenshotModal(screenshot)}
              >
                <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                  <Eye className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    لقطة شاشة
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      {screenshot.timestamp}
                    </span>
                    <Button size="sm" variant="outline" className="h-6 text-xs">
                      عرض
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {screenshot.activity}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {employeeData.desktopTracking.recentScreenshots.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Eye className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <p>لا توجد لقطات شاشة متاحة</p>
              <p className="text-sm">تأكد من تشغيل تطبيق سطح المكتب</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* تعليمات وإرشادات */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-blue-800 dark:text-blue-200 flex items-center space-x-2 rtl:space-x-reverse">
            <BookOpen className="w-5 h-5" />
            <span>إرشادات نظام مراقبة سطح المكتب</span>
          </CardTitle>
          <CardDescription className="text-blue-600 dark:text-blue-400">
            دليل شامل لاستخدام نظام مراقبة الحضور والإنتاجية
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 text-sm text-blue-700 dark:text-blue-300">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 flex items-center">
                <Shield className="w-4 h-4 ml-2" />
                المتطلبات الأساسية
              </h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">تطبيق سطح المكتب</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      تحميل وتثبيت التطبيق على جهاز العمل المخصص
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">اتصال إنترنت مستقر</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      لضمان مزامنة البيانات مع الخادم
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">تسجيل الدخول</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      استخدام نفس بيانات تسجيل الدخول للموقع
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-sm text-blue-700 dark:text-blue-300">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 flex items-center">
                <Activity className="w-4 h-4 ml-2" />
                المراقبة والتتبع
              </h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">تتبع النشاط التلقائي</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      مراقبة حركة الماوس ولوحة المفاتيح لحساب وقت العمل الفعلي
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">لقطات الشاشة العشوائية</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      كل 10-30 دقيقة للتحقق من الحضور الفعلي - محمية من المسح
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">حساب نسبة الإنتاجية</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      بناءً على نسبة الوقت النشط إلى الوقت الإجمالي
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-sm text-blue-700 dark:text-blue-300">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 flex items-center">
                <Clock className="w-4 h-4 ml-2" />
                تسجيل الحضور
              </h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">شرط التطبيق النشط</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      لا يمكن تسجيل الحضور من الموقع إلا بوجود التطبيق متصل
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">التسجيل المزدوج</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      يمكن التسجيل من التطبيق أو الموقع (بشرط اتصال التطبيق)
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">التوقيت الدقيق</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      تسجيل دقيق لأوقات الدخول والخروج والفترات الزمنية
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-sm text-blue-700 dark:text-blue-300">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 flex items-center">
                <Eye className="w-4 h-4 ml-2" />
                الخصوصية والأمان
              </h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">بيانات محمية</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      جميع البيانات مشفرة ومحمية وفقاً لمعايير الأمان
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">مشاهدة فقط</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      يمكن للموظف مشاهدة لقطات الشاشة الخاصة به فقط
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <Archive className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">عدم إمكانية المسح</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      البيانات محمية ولا يمكن حذفها من قبل الموظف
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-blue-200 dark:border-blue-700">
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-amber-800 dark:text-amber-200">تنبيه مهم</h4>
                  <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                    نظام المراقبة مصمم لضمان العدالة والشفافية في بيئة العمل. جميع البيانات تُستخدم لأغراض إدارية فقط ومحمية بأعلى معايير الخصوصية. في حالة وجود أي استفسارات، يرجى التواصل مع قسم الموارد البشرية.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* نافذة عرض الصورة */}
      {showScreenshotModal && selectedScreenshot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                لقطة شاشة - {selectedScreenshot.timestamp}
              </h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowScreenshotModal(false)}
              >
                إغلاق
              </Button>
            </div>
            <div className="p-4">
              <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <Eye className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300">معاينة لقطة الشاشة</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    النشاط: {selectedScreenshot.activity}
                  </p>
                </div>
              </div>
              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                🔒 هذه الصورة محمية ولا يمكن تحميلها أو مسحها
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderSalary = () => {
    // حساب إحصائيات الخصومات
    const totalWorkingDays = employeeData.salary.dailyDeductions.filter(day => day.requiredHours > 0).length
    const daysWithDeductions = employeeData.salary.dailyDeductions.filter(day => day.deduction > 0).length
    const totalMissedHours = employeeData.salary.dailyDeductions.reduce((sum, day) => {
      if (day.requiredHours > day.actualHours && !day.hasPermission) {
        return sum + (day.requiredHours - day.actualHours)
      }
      return sum
    }, 0)
    const averageDeductionPerDay = daysWithDeductions > 0 ? employeeData.salary.hourlyDeductions / daysWithDeductions : 0

    return (
      <div className="space-y-6">
        {/* الصف الأول - ملخص الراتب */}
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
                    <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg border border-red-200 dark:border-red-800">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                        <p className="text-sm font-medium text-red-600 dark:text-red-400">خصومات الساعات</p>
                      </div>
                      <p className="text-xl font-bold text-red-700 dark:text-red-300">-{formatCurrency(employeeData.salary.hourlyDeductions)}</p>
                      <p className="text-xs text-red-500 dark:text-red-400">{totalMissedHours.toFixed(1)} ساعة مفقودة</p>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <div className="flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                        <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">معدل الخصم</p>
                      </div>
                      <p className="text-xl font-bold text-yellow-700 dark:text-yellow-300">{formatCurrency(employeeData.salary.hourlyRate)}/ساعة</p>
                      <p className="text-xs text-yellow-500 dark:text-yellow-400">{daysWithDeductions} أيام بخصومات</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 text-white p-4 rounded-lg">
                    <p className="text-green-100 dark:text-green-200">الراتب الصافي</p>
                    <p className="text-3xl font-bold">{formatCurrency(employeeData.salary.net)}</p>
                    <p className="text-sm text-green-200 dark:text-green-300">بعد خصم {formatCurrency(employeeData.salary.hourlyDeductions)} من الراتب الأساسي</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <Calculator className="w-5 h-5 text-red-500 dark:text-red-400" />
                <span>سجل خصومات الساعات</span>
              </CardTitle>
              <CardDescription>إحصائيات الخصومات اليومية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* إحصائيات سريعة */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">{formatCurrency(employeeData.salary.hourlyDeductions)}</div>
                    <div className="text-xs text-red-700 dark:text-red-300 font-medium">إجمالي الخصومات</div>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{totalMissedHours.toFixed(1)}</div>
                    <div className="text-xs text-orange-700 dark:text-orange-300 font-medium">ساعات مفقودة</div>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{daysWithDeductions}</div>
                    <div className="text-xs text-yellow-700 dark:text-yellow-300 font-medium">أيام بخصومات</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(employeeData.salary.hourlyRate)}</div>
                    <div className="text-xs text-blue-700 dark:text-blue-300 font-medium">خصم/ساعة</div>
                  </div>
                </div>

                {/* ملخص نسب الخصومات */}
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">تأثير الخصومات على الراتب</span>
                    <span className="text-sm text-red-600 dark:text-red-400 font-bold">
                      -{((employeeData.salary.hourlyDeductions / employeeData.salary.basic) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${Math.min((employeeData.salary.hourlyDeductions / employeeData.salary.basic) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    من إجمالي الراتب الأساسي ({formatCurrency(employeeData.salary.basic)})
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* الصف الثاني - سجل الخصومات اليومية */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <CalendarIcon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              <span>سجل الخصومات اليومية</span>
            </CardTitle>
            <CardDescription>تفاصيل الخصومات لكل يوم عمل</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-right py-3 px-4 font-medium text-gray-900 dark:text-white">التاريخ</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">اليوم</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">المطلوب</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">الفعلي</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">الفرق</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">الخصم</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900 dark:text-white">السبب</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeData.salary.dailyDeductions.map((day, index) => {
                    const dayName = new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })
                    const hoursDifference = day.requiredHours - day.actualHours
                    
                    return (
                      <tr key={index} className={`border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                        day.deduction > 0 ? 'bg-red-50 dark:bg-red-900/10' : 
                        day.hasPermission && hoursDifference > 0 ? 'bg-green-50 dark:bg-green-900/10' : ''
                      }`}>
                        <td className="py-3 px-4 text-gray-900 dark:text-white">{formatDate(day.date)}</td>
                        <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">{dayName}</td>
                        <td className="py-3 px-4 text-center font-medium">
                          {day.requiredHours > 0 ? `${day.requiredHours}س` : '-'}
                        </td>
                        <td className="py-3 px-4 text-center font-medium">
                          {day.actualHours > 0 ? `${day.actualHours}س` : '-'}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {hoursDifference > 0 ? (
                            <span className={`font-medium ${day.hasPermission ? 'text-orange-600 dark:text-orange-400' : 'text-red-600 dark:text-red-400'}`}>
                              -{hoursDifference}س
                            </span>
                          ) : hoursDifference < 0 ? (
                            <span className="text-green-600 dark:text-green-400 font-medium">+{Math.abs(hoursDifference)}س</span>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {day.deduction > 0 ? (
                            <span className="text-red-600 dark:text-red-400 font-bold">-{formatCurrency(day.deduction)}</span>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                          <div className="flex items-center gap-2">
                            {day.hasPermission && hoursDifference > 0 && (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                            {day.deduction > 0 && !day.hasPermission && (
                              <AlertTriangle className="w-4 h-4 text-red-500" />
                            )}
                            <span className="text-xs">{day.reason}</span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            
            {/* ملخص الجدول */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-center">
                <div className="text-lg font-bold text-red-600 dark:text-red-400">
                  {formatCurrency(employeeData.salary.dailyDeductions.reduce((sum, day) => sum + day.deduction, 0))}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">إجمالي الخصومات</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {employeeData.salary.dailyDeductions.filter(day => day.hasPermission && day.requiredHours - day.actualHours > 0).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">أيام بإذن</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                  {((totalWorkingDays - daysWithDeductions) / totalWorkingDays * 100).toFixed(0)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">نسبة الالتزام</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* الصف الثالث - المزايا والحوافز */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <Gift className="w-5 h-5 text-purple-500 dark:text-purple-400" />
              <span>المزايا والحوافز</span>
            </CardTitle>
            <CardDescription>البدلات والمزايا الإضافية</CardDescription>
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
    )
  }

  const renderAttendance = () => {
    // بيانات حضور المالية (محاكاة بيانات)
    const monthlyAttendance = [
      { date: '2024-06-01', day: 'السبت', checkIn: '08:15', checkOut: '17:00', hours: 8.75, status: 'حاضر', overtime: 0.75 },
      { date: '2024-06-02', day: 'الأحد', checkIn: '08:00', checkOut: '16:30', hours: 8.5, status: 'حاضر', overtime: 0.5 },
      { date: '2024-06-03', day: 'الاثنين', checkIn: '08:30', checkOut: '17:15', hours: 8.75, status: 'متأخر', overtime: 0.75 },
      { date: '2024-06-04', day: 'الثلاثاء', checkIn: '08:00', checkOut: '16:45', hours: 8.75, status: 'حاضر', overtime: 0.75 },
      { date: '2024-06-05', day: 'الأربعاء', checkIn: '08:10', checkOut: '17:00', hours: 8.83, status: 'حاضر', overtime: 0.83 },
      { date: '2024-06-06', day: 'الخميس', checkIn: '-', checkOut: '-', hours: 0, status: 'غائب', overtime: 0 },
      { date: '2024-06-07', day: 'الجمعة', checkIn: '-', checkOut: '-', hours: 0, status: 'عطلة', overtime: 0 },
      { date: '2024-06-08', day: 'السبت', checkIn: '08:05', checkOut: '16:50', hours: 8.75, status: 'حاضر', overtime: 0.75 },
      { date: '2024-06-09', day: 'الأحد', checkIn: '08:15', checkOut: '-', hours: 7.5, status: 'حاضر', overtime: 0 },
    ]

    // حساب الإحصائيات
    const workingDays = monthlyAttendance.filter(day => day.status !== 'عطلة')
    const presentDays = workingDays.filter(day => day.status === 'حاضر' || day.status === 'متأخر')
    const absentDays = workingDays.filter(day => day.status === 'غائب')
    const lateDays = workingDays.filter(day => day.status === 'متأخر')
    
    const totalHours = presentDays.reduce((sum, day) => sum + day.hours, 0)
    const averageHours = totalHours / presentDays.length || 0
    const totalOvertime = presentDays.reduce((sum, day) => sum + day.overtime, 0)
    
    const attendanceRate = Math.round((presentDays.length / workingDays.length) * 100)

    return (
      <div className="space-y-6">
        {/* الصف الأول - حضور اليوم وإحصائيات */}
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
                
                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg text-center">
                  <p className="text-sm text-purple-600 dark:text-purple-400">ساعات العمل</p>
                  <p className="font-bold text-purple-700 dark:text-purple-300">{employeeData.attendance.totalHours} ساعة</p>
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
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{presentDays.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">أيام حضور</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">{absentDays.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">أيام غياب</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{lateDays.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">أيام تأخير</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{workingDays.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">أيام العمل</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 text-white p-3 rounded-lg text-center">
                  <p className="text-green-100 dark:text-green-200">نسبة الحضور</p>
                  <p className="text-2xl font-bold">{attendanceRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <Activity className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                <span>معدل الساعات اليومي</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock3 className="w-8 h-8 text-purple-500 dark:text-purple-400" />
                  </div>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{averageHours.toFixed(1)}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">ساعة يومياً</p>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                    <p className="text-sm text-blue-600 dark:text-blue-400">إجمالي الساعات</p>
                    <p className="font-bold text-blue-700 dark:text-blue-300">{totalHours.toFixed(1)} ساعة</p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg text-center">
                    <p className="text-sm text-orange-600 dark:text-orange-400">ساعات إضافية</p>
                    <p className="font-bold text-orange-700 dark:text-orange-300">{totalOvertime.toFixed(1)} ساعة</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* الصف الثاني - سجل الحضور الشهري */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <Calendar className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
              <span>سجل الحضور الشهري - يونيو 2024</span>
            </CardTitle>
            <CardDescription>تفاصيل الحضور والانصراف يومياً</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* مفاتيح الألوان */}
              <div className="flex flex-wrap gap-4 text-sm mb-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300">حاضر</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300">متأخر</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300">غائب</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300">عطلة</span>
                </div>
              </div>

              {/* جدول الحضور */}
              <div className="overflow-x-auto">
                <div className="min-w-full">
                  <div className="grid grid-cols-7 gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    <div className="text-center p-2">التاريخ</div>
                    <div className="text-center p-2">اليوم</div>
                    <div className="text-center p-2">دخول</div>
                    <div className="text-center p-2">خروج</div>
                    <div className="text-center p-2">الساعات</div>
                    <div className="text-center p-2">إضافي</div>
                    <div className="text-center p-2">الحالة</div>
                  </div>
                  
                  <div className="space-y-2">
                    {monthlyAttendance.map((day, index) => {
                      let statusColor = 'bg-gray-100 dark:bg-gray-700'
                      let statusTextColor = 'text-gray-600 dark:text-gray-300'
                      
                      if (day.status === 'حاضر') {
                        statusColor = 'bg-green-50 dark:bg-green-900/20'
                        statusTextColor = 'text-green-600 dark:text-green-400'
                      } else if (day.status === 'متأخر') {
                        statusColor = 'bg-yellow-50 dark:bg-yellow-900/20'
                        statusTextColor = 'text-yellow-600 dark:text-yellow-400'
                      } else if (day.status === 'غائب') {
                        statusColor = 'bg-red-50 dark:bg-red-900/20'
                        statusTextColor = 'text-red-600 dark:text-red-400'
                      }

                      return (
                        <div key={index} className={`grid grid-cols-7 gap-2 p-3 rounded-lg border ${statusColor} border-gray-200 dark:border-gray-600`}>
                          <div className="text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                            {new Date(day.date).getDate().toString().padStart(2, '0')}
                          </div>
                          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                            {day.day}
                          </div>
                          <div className="text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                            {day.checkIn}
                          </div>
                          <div className="text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                            {day.checkOut}
                          </div>
                          <div className="text-center text-sm font-bold text-blue-600 dark:text-blue-400">
                            {day.hours > 0 ? `${day.hours.toFixed(1)}h` : '-'}
                          </div>
                          <div className="text-center text-sm font-medium text-orange-600 dark:text-orange-400">
                            {day.overtime > 0 ? `+${day.overtime.toFixed(1)}h` : '-'}
                          </div>
                          <div className={`text-center text-sm font-medium ${statusTextColor}`}>
                            <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse">
                              <div className={`w-2 h-2 rounded-full ${
                                day.status === 'حاضر' ? 'bg-green-500' :
                                day.status === 'متأخر' ? 'bg-yellow-500' :
                                day.status === 'غائب' ? 'bg-red-500' : 'bg-gray-400'
                              }`}></div>
                              <span>{day.status}</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

                             {/* ملخص إحصائي */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                 <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                   <div className="text-sm text-blue-600 dark:text-blue-400">أعلى ساعات يومية</div>
                   <div className="text-lg font-bold text-blue-700 dark:text-blue-300">
                     {Math.max(...presentDays.map(d => d.hours)).toFixed(1)}h
                   </div>
                 </div>
                 <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                   <div className="text-sm text-green-600 dark:text-green-400">متوسط الدخول</div>
                   <div className="text-lg font-bold text-green-700 dark:text-green-300">08:12</div>
                 </div>
                 <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                   <div className="text-sm text-purple-600 dark:text-purple-400">متوسط الخروج</div>
                   <div className="text-lg font-bold text-purple-700 dark:text-purple-300">16:52</div>
                 </div>
                 <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                   <div className="text-sm text-orange-600 dark:text-orange-400">كفاءة الوقت</div>
                   <div className="text-lg font-bold text-orange-700 dark:text-orange-300">ممتازة</div>
                 </div>
               </div>

               {/* الرسم البياني لساعات العمل */}
               <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                 <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                   <BarChart3 className="w-5 h-5 text-blue-500 mr-2" />
                   تطور ساعات العمل اليومية
                 </h4>
                 <div className="h-64">
                   <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={monthlyAttendance.filter(day => day.status !== 'عطلة')}>
                       <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                       <XAxis 
                         dataKey="date" 
                         tickFormatter={(value) => new Date(value).getDate().toString()}
                         className="text-xs"
                       />
                       <YAxis className="text-xs" />
                       <Tooltip 
                         labelFormatter={(value) => `${new Date(value).getDate()} يونيو`}
                         formatter={(value, name) => [
                           name === 'hours' ? `${value} ساعة` : `${value} ساعة إضافية`,
                           name === 'hours' ? 'ساعات العمل' : 'الساعات الإضافية'
                         ]}
                         contentStyle={{
                           backgroundColor: 'rgba(255, 255, 255, 0.95)',
                           border: '1px solid #e5e5e5',
                           borderRadius: '8px',
                           boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                         }}
                       />
                       <Legend />
                       <Bar 
                         dataKey="hours" 
                         fill="#3b82f6" 
                         name="ساعات العمل"
                         radius={[4, 4, 0, 0]}
                       />
                       <Bar 
                         dataKey="overtime" 
                         fill="#f59e0b" 
                         name="ساعات إضافية"
                         radius={[4, 4, 0, 0]}
                       />
                     </BarChart>
                   </ResponsiveContainer>
                 </div>
               </div>
            </div>
          </CardContent>
        </Card>

                 {/* الصف الثالث - تحليل الأداء والاتجاهات */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <Card>
             <CardHeader>
               <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                 <TrendingUp className="w-5 h-5 text-green-500 dark:text-green-400" />
                 <span>اتجاه معدل الحضور الأسبوعي</span>
               </CardTitle>
               <CardDescription>متوسط ساعات العمل لكل أسبوع</CardDescription>
             </CardHeader>
             <CardContent>
               <div className="h-48">
                 <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={[
                     { week: 'الأسبوع 1', avgHours: 8.2, attendance: 95 },
                     { week: 'الأسبوع 2', avgHours: 8.5, attendance: 98 },
                     { week: 'الأسبوع 3', avgHours: 8.3, attendance: 92 },
                     { week: 'الأسبوع 4', avgHours: 8.4, attendance: 96 }
                   ]}>
                     <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                     <XAxis dataKey="week" className="text-xs" />
                     <YAxis className="text-xs" />
                     <Tooltip 
                       formatter={(value, name) => [
                         name === 'avgHours' ? `${value} ساعة` : `${value}%`,
                         name === 'avgHours' ? 'متوسط الساعات' : 'نسبة الحضور'
                       ]}
                       contentStyle={{
                         backgroundColor: 'rgba(255, 255, 255, 0.95)',
                         border: '1px solid #e5e5e5',
                         borderRadius: '8px',
                         boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                       }}
                     />
                     <Line 
                       type="monotone" 
                       dataKey="avgHours" 
                       stroke="#10b981" 
                       strokeWidth={3}
                       dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                       name="متوسط الساعات"
                     />
                     <Line 
                       type="monotone" 
                       dataKey="attendance" 
                       stroke="#3b82f6" 
                       strokeWidth={2}
                       strokeDasharray="5 5"
                       dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
                       name="نسبة الحضور"
                     />
                   </LineChart>
                 </ResponsiveContainer>
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
               <div className="space-y-4">
                 <div className="grid grid-cols-2 gap-3">
                   <Button className="justify-start" variant="outline">
                     <Clock3 className="w-4 h-4 ml-2" />
                     تسجيل خروج
                   </Button>
                   <Button className="justify-start" variant="outline">
                     <Calendar className="w-4 h-4 ml-2" />
                     طلب إجازة
                   </Button>
                   <Button className="justify-start" variant="outline">
                     <FileText className="w-4 h-4 ml-2" />
                     تقرير الحضور
                   </Button>
                   <Button className="justify-start" variant="outline">
                     <Download className="w-4 h-4 ml-2" />
                     تصدير البيانات
                   </Button>
                 </div>
                 
                 {/* إحصائيات سريعة */}
                 <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                   <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">إحصائيات سريعة</h4>
                   <div className="space-y-2">
                     <div className="flex justify-between items-center text-sm">
                       <span className="text-gray-600 dark:text-gray-400">أفضل يوم هذا الشهر:</span>
                       <span className="font-medium text-green-600 dark:text-green-400">الأربعاء (8.8h)</span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                       <span className="text-gray-600 dark:text-gray-400">النمط الأسبوعي:</span>
                       <span className="font-medium text-blue-600 dark:text-blue-400">متحسن</span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                       <span className="text-gray-600 dark:text-gray-400">التقييم:</span>
                       <span className="font-medium text-purple-600 dark:text-purple-400">موظف مثالي</span>
                     </div>
                   </div>
                 </div>
               </div>
             </CardContent>
           </Card>
         </div>
      </div>
    )
  }

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
      case 'desktop-tracking': return renderDesktopTracking()
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