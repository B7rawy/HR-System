import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { 
  ArrowLeft,
  Mail, 
  Phone, 
  Calendar,
  MapPin,
  Star,
  Shield,
  Target,
  Clock,
  DollarSign,
  CheckCircle,
  User,
  BarChart3,
  Award
} from 'lucide-react'
import { formatDate } from '../utils/formatters'

const EmployeeDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // بيانات الموظفين - نفس البيانات من صفحة إدارة الموظفين
  const employees = [
    {
      id: 1,
      name: 'أحمد محمد علي',
      employeeId: 'EMP001',
      email: 'ahmed.mohamed@company.com',
      phone: '+20 100 123 4567',
      position: 'مطور برمجيات رئيسي',
      department: 'التطوير',
      baseSalary: 15000,
      currentSalary: 15000,
      joinDate: '2022-01-15',
      status: 'نشط',
      teamLead: true,
      allowances: {
        transportation: 800,
        housing: 1500,
        meal: 500
      },
      deductions: {
        socialInsurance: 750,
        tax: 1200
      },
      monthlyAdjustments: {
        bonuses: [
          { id: 1, type: 'مكافأة أداء', amount: 1000, date: '2024-01-15', description: 'أداء متميز في المشروع' }
        ],
        deductions: []
      },
      performance: {
        rating: 4.8,
        lastReview: '2024-01-15',
        goals: ['تطوير مهارات القيادة', 'تحسين أداء الفريق', 'إكمال شهادة AWS'],
        achievements: ['قاد فريق تطوير الموقع الجديد', 'حقق زيادة 30% في الإنتاجية']
      },
      attendance: {
        totalWorkingDays: 22,
        presentDays: 21,
        absentDays: 1,
        totalHours: 168,
        overtimeHours: 8,
        leaveBalance: 18,
        dailyAttendance: [
          { date: '2024-06-01', checkIn: '08:00', checkOut: '17:00', hours: 8, status: 'حاضر' },
          { date: '2024-06-02', checkIn: '08:15', checkOut: '17:30', hours: 8.25, status: 'حاضر' },
          { date: '2024-06-03', checkIn: null, checkOut: null, hours: 0, status: 'غائب' },
          { date: '2024-06-04', checkIn: '07:45', checkOut: '18:00', hours: 9.25, status: 'حاضر' },
          { date: '2024-06-05', checkIn: '08:30', checkOut: '17:00', hours: 7.5, status: 'حاضر' }
        ]
      },
      leaveRequests: [
        { id: 1, type: 'إجازة سنوية', startDate: '2024-07-15', endDate: '2024-07-20', days: 5, status: 'معتمدة', reason: 'إجازة صيفية' },
        { id: 2, type: 'إجازة مرضية', startDate: '2024-05-10', endDate: '2024-05-12', days: 2, status: 'معتمدة', reason: 'مرض طارئ' },
        { id: 3, type: 'إجازة اضطرارية', startDate: '2024-08-01', endDate: '2024-08-01', days: 1, status: 'قيد المراجعة', reason: 'ظروف عائلية' }
      ],
      salaryHistory: [
        { date: '2024-01-01', baseSalary: 10800, allowances: 1800, bonuses: 1000, deductions: 1300, netSalary: 12300 },
        { date: '2024-02-01', baseSalary: 10800, allowances: 1800, bonuses: 0, deductions: 1300, netSalary: 11300 },
        { date: '2024-03-01', baseSalary: 10800, allowances: 1800, bonuses: 500, deductions: 1300, netSalary: 11800 }
      ],
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS'],
      projects: ['تطوير موقع الشركة', 'تطبيق إدارة الموارد البشرية'],
      experience: '5 سنوات',
      education: 'بكالوريوس هندسة حاسوب',
      location: 'القاهرة، مصر'
    },
    {
      id: 2,
      name: 'فاطمة أحمد حسن',
      employeeId: 'EMP002',
      email: 'fatma.ahmed@company.com',
      phone: '+20 101 234 5678',
      position: 'محاسبة مالية',
      department: 'المالية',
      baseSalary: 12000,
      currentSalary: 12000,
      joinDate: '2022-03-20',
      status: 'نشط',
      teamLead: false,
      allowances: {
        transportation: 600,
        housing: 1200,
        meal: 400
      },
      deductions: {
        socialInsurance: 600,
        tax: 800
      },
      monthlyAdjustments: {
        bonuses: [],
        deductions: []
      },
      performance: {
        rating: 4.6,
        lastReview: '2024-02-10',
        goals: ['تطوير مهارات SAP', 'تحسين دقة التقارير'],
        achievements: ['تقليل الأخطاء المحاسبية بنسبة 95%']
      },
      attendance: {
        totalWorkingDays: 22,
        presentDays: 22,
        absentDays: 0,
        totalHours: 176,
        overtimeHours: 0,
        leaveBalance: 20,
        dailyAttendance: [
          { date: '2024-06-01', checkIn: '08:00', checkOut: '17:00', hours: 8, status: 'حاضر' },
          { date: '2024-06-02', checkIn: '08:00', checkOut: '17:00', hours: 8, status: 'حاضر' },
          { date: '2024-06-03', checkIn: '08:00', checkOut: '17:00', hours: 8, status: 'حاضر' },
          { date: '2024-06-04', checkIn: '08:00', checkOut: '17:00', hours: 8, status: 'حاضر' },
          { date: '2024-06-05', checkIn: '08:05', checkOut: '17:00', hours: 7.92, status: 'حاضر' }
        ]
      },
      leaveRequests: [
        { id: 1, type: 'إجازة مرضية', startDate: '2024-04-20', endDate: '2024-04-22', days: 2, status: 'معتمدة', reason: 'مرض' },
        { id: 2, type: 'إجازة سنوية', startDate: '2024-09-01', endDate: '2024-09-07', days: 6, status: 'قيد المراجعة', reason: 'إجازة عائلية' }
      ],
      salaryHistory: [
        { date: '2024-01-01', baseSalary: 12850, allowances: 1400, bonuses: 0, deductions: 1592, netSalary: 12658 },
        { date: '2024-02-01', baseSalary: 12850, allowances: 1400, bonuses: 800, deductions: 1592, netSalary: 13458 },
        { date: '2024-03-01', baseSalary: 12850, allowances: 1400, bonuses: 0, deductions: 1592, netSalary: 12658 }
      ],
      skills: ['المحاسبة', 'Excel', 'SAP', 'QuickBooks'],
      projects: ['تدقيق الحسابات', 'إعداد الميزانية'],
      experience: '4 سنوات',
      education: 'بكالوريوس تجارة - محاسبة',
      location: 'الجيزة، مصر'
    },
    {
      id: 3,
      name: 'محمد عبد الله',
      employeeId: 'EMP003',
      email: 'mohamed.abdullah@company.com',
      phone: '+20 102 345 6789',
      position: 'أخصائي موارد بشرية',
      department: 'الموارد البشرية',
      baseSalary: 11000,
      currentSalary: 11000,
      joinDate: '2023-05-10',
      status: 'نشط',
      teamLead: false,
      allowances: {
        transportation: 550,
        housing: 1000,
        meal: 350
      },
      deductions: {
        socialInsurance: 550,
        tax: 750
      },
      monthlyAdjustments: {
        bonuses: [],
        deductions: [
          { id: 1, type: 'غياب', amount: 200, date: '2024-02-20', description: 'غياب بدون إذن' }
        ]
      },
      performance: {
        rating: 4.2,
        lastReview: '2024-01-20',
        goals: ['تحسين عملية التوظيف', 'تطوير برامج التدريب'],
        achievements: ['تقليل وقت التوظيف بنسبة 20%']
      },
      attendance: {
        totalWorkingDays: 22,
        presentDays: 20,
        absentDays: 2,
        totalHours: 160,
        overtimeHours: 2,
        leaveBalance: 15,
        dailyAttendance: [
          { date: '2024-06-01', checkIn: '08:20', checkOut: '17:00', hours: 7.67, status: 'حاضر' },
          { date: '2024-06-02', checkIn: null, checkOut: null, hours: 0, status: 'غائب' },
          { date: '2024-06-03', checkIn: '08:00', checkOut: '18:00', hours: 9, status: 'حاضر' },
          { date: '2024-06-04', checkIn: null, checkOut: null, hours: 0, status: 'غائب' },
          { date: '2024-06-05', checkIn: '08:30', checkOut: '17:30', hours: 8, status: 'حاضر' }
        ]
      },
      leaveRequests: [
        { id: 1, type: 'إجازة اضطرارية', startDate: '2024-05-15', endDate: '2024-05-16', days: 2, status: 'معتمدة', reason: 'ظروف شخصية' },
        { id: 2, type: 'إجازة سنوية', startDate: '2024-08-10', endDate: '2024-08-15', days: 5, status: 'قيد المراجعة', reason: 'إجازة سنوية' }
      ],
      salaryHistory: [
        { date: '2024-01-01', baseSalary: 10165, allowances: 1250, bonuses: 0, deductions: 1558, netSalary: 9857 },
        { date: '2024-02-01', baseSalary: 10165, allowances: 1250, bonuses: 0, deductions: 1758, netSalary: 9657 },
        { date: '2024-03-01', baseSalary: 10165, allowances: 1250, bonuses: 300, deductions: 1358, netSalary: 10357 }
      ],
      skills: ['إدارة الموارد البشرية', 'التوظيف', 'التدريب'],
      projects: ['برنامج التوجيه الجديد', 'تحديث سياسات الشركة'],
      experience: '3 سنوات',
      education: 'بكالوريوس إدارة أعمال',
      location: 'القاهرة، مصر'
    }
  ]

  const employee = employees.find(emp => emp.id === parseInt(id))

  if (!employee) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-center text-red-600">
              <User className="w-12 h-12 mx-auto mb-4" />
              موظف غير موجود
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              لم يتم العثور على الموظف المطلوب
            </p>
            <Button onClick={() => navigate('/employees')}>
              <ArrowLeft className="w-4 h-4 ml-2" />
              العودة لإدارة الموظفين
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const attendanceRate = Math.round((employee.attendance.presentDays / employee.attendance.totalWorkingDays) * 100)
  const yearsOfExperience = Math.floor((new Date() - new Date(employee.joinDate)) / (365.25 * 24 * 60 * 60 * 1000))

  const avatarColors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500']
  const getAvatarColor = (id) => avatarColors[id % avatarColors.length]
  const getInitials = (name) => name.split(' ')[0].charAt(0)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* رأس الصفحة */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/employees')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 ml-2" />
            العودة لإدارة الموظفين
          </Button>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold ${getAvatarColor(employee.id)}`}>
                  {getInitials(employee.name)}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{employee.name}</h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300">{employee.position}</p>
                  <div className="flex items-center space-x-4 space-x-reverse mt-2">
                    <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                      EMP-{employee.id.toString().padStart(3, '0')}
                    </span>
                    <span className="px-2 py-1 rounded-full text-sm bg-green-100 text-green-800">
                      {employee.status}
                    </span>
                    {employee.teamLead && (
                      <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full flex items-center">
                        <Shield className="w-3 h-3 ml-1" />
                        قائد فريق
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* المحتوى الرئيسي */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* العمود الأيسر */}
          <div className="space-y-6">
            {/* معلومات الاتصال */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">معلومات الاتصال</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Mail className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <div>
                    <p className="text-sm font-medium dark:text-gray-300">البريد الإلكتروني</p>
                    <p className="text-blue-600 dark:text-blue-400">{employee.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Phone className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <div>
                    <p className="text-sm font-medium dark:text-gray-300">الهاتف</p>
                    <p className="text-blue-600 dark:text-blue-400">{employee.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <MapPin className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <div>
                    <p className="text-sm font-medium dark:text-gray-300">الموقع</p>
                    <p className="dark:text-gray-400">{employee.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* معلومات التوظيف */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">معلومات التوظيف</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="dark:text-gray-300">تاريخ الانضمام:</span>
                  <span className="dark:text-white">{formatDate(employee.joinDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="dark:text-gray-300">سنوات الخبرة:</span>
                  <span className="dark:text-white">{yearsOfExperience} سنوات</span>
                </div>
                <div className="flex justify-between">
                  <span className="dark:text-gray-300">التعليم:</span>
                  <span className="dark:text-white">{employee.education}</span>
                </div>
                <div className="flex justify-between">
                  <span className="dark:text-gray-300">الراتب الأساسي:</span>
                  <span className="text-green-600 dark:text-green-400">{employee.baseSalary?.toLocaleString('en-US')} ج.م</span>
                </div>
                <div className="flex justify-between">
                  <span className="dark:text-gray-300">صافي الراتب:</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">
                    {(
                      employee.baseSalary + 
                      Object.values(employee.allowances).reduce((sum, val) => sum + val, 0) +
                      employee.monthlyAdjustments.bonuses.reduce((sum, bonus) => sum + bonus.amount, 0) -
                      Object.values(employee.deductions).reduce((sum, val) => sum + val, 0) -
                      employee.monthlyAdjustments.deductions.reduce((sum, deduction) => sum + deduction.amount, 0)
                    ).toLocaleString("en-US")} ج.م
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* العمود الأوسط والأيمن */}
          <div className="lg:col-span-2 space-y-6">
            {/* إحصائيات سريعة */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground dark:text-gray-400">معدل الحضور</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">{attendanceRate}%</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground dark:text-gray-400">تقييم الأداء</p>
                      <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{employee.performance.rating}/5</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground dark:text-gray-400">المشاريع</p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{employee.projects.length}</p>
                    </div>
                    <Target className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground dark:text-gray-400">رصيد الإجازات</p>
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{employee.attendance.leaveBalance}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* المهارات */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">المهارات والخبرات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {employee.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* تفاصيل الراتب */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white flex items-center">
                  <DollarSign className="w-5 h-5 ml-2" />
                  تفاصيل الراتب الحالي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">الراتب الأساسي:</span>
                        <span className="font-bold dark:text-white">{employee.baseSalary.toLocaleString("en-US")} ج.م</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">بدل مواصلات:</span>
                        <span className="text-green-600 dark:text-green-400">+{employee.allowances.transportation.toLocaleString("en-US")} ج.م</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">بدل سكن:</span>
                        <span className="text-green-600 dark:text-green-400">+{employee.allowances.housing.toLocaleString("en-US")} ج.م</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">بدل وجبة:</span>
                        <span className="text-green-600 dark:text-green-400">+{employee.allowances.meal.toLocaleString("en-US")} ج.م</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">التأمينات:</span>
                        <span className="text-red-600 dark:text-red-400">-{employee.deductions.socialInsurance.toLocaleString("en-US")} ج.م</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">الضرائب:</span>
                        <span className="text-red-600 dark:text-red-400">-{employee.deductions.tax.toLocaleString("en-US")} ج.م</span>
                      </div>
                      {employee.monthlyAdjustments.bonuses.length > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">مكافآت إضافية:</span>
                          <span className="text-green-600 dark:text-green-400">
                            +{employee.monthlyAdjustments.bonuses.reduce((sum, bonus) => sum + bonus.amount, 0).toLocaleString("en-US")} ج.م
                          </span>
                        </div>
                      )}
                      {employee.monthlyAdjustments.deductions.length > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">خصومات إضافية:</span>
                          <span className="text-red-600 dark:text-red-400">
                            -{employee.monthlyAdjustments.deductions.reduce((sum, deduction) => sum + deduction.amount, 0).toLocaleString("en-US")} ج.م
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <hr className="dark:border-gray-700" />
                  <div className="flex justify-between text-lg font-bold">
                    <span className="dark:text-white">صافي الراتب:</span>
                    <span className="text-blue-600 dark:text-blue-400">
                      {(
                        employee.baseSalary + 
                        Object.values(employee.allowances).reduce((sum, val) => sum + val, 0) +
                        employee.monthlyAdjustments.bonuses.reduce((sum, bonus) => sum + bonus.amount, 0) -
                        Object.values(employee.deductions).reduce((sum, val) => sum + val, 0) -
                        employee.monthlyAdjustments.deductions.reduce((sum, deduction) => sum + deduction.amount, 0)
                      ).toLocaleString("en-US")} ج.م
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* سجل الحضور اليومي */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white flex items-center">
                  <Clock className="w-5 h-5 ml-2" />
                  سجل الحضور اليومي (آخر 5 أيام)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b dark:border-gray-700">
                        <th className="text-right py-2 text-gray-600 dark:text-gray-400">التاريخ</th>
                        <th className="text-right py-2 text-gray-600 dark:text-gray-400">الدخول</th>
                        <th className="text-right py-2 text-gray-600 dark:text-gray-400">الخروج</th>
                        <th className="text-right py-2 text-gray-600 dark:text-gray-400">الساعات</th>
                        <th className="text-right py-2 text-gray-600 dark:text-gray-400">الحالة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employee.attendance.dailyAttendance.map((day, index) => (
                        <tr key={index} className="border-b dark:border-gray-700">
                          <td className="py-2 dark:text-white">{day.date}</td>
                          <td className="py-2 dark:text-white">{day.checkIn || '-'}</td>
                          <td className="py-2 dark:text-white">{day.checkOut || '-'}</td>
                          <td className="py-2 dark:text-white">{day.hours} ساعة</td>
                          <td className="py-2">
                            <span className={`px-2 py-1 rounded text-xs ${
                              day.status === 'حاضر' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            }`}>
                              {day.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي الساعات</p>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{employee.attendance.totalHours}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">ساعات إضافية</p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">{employee.attendance.overtimeHours}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">معدل الحضور</p>
                    <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{attendanceRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* طلبات الإجازات */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white flex items-center">
                  <Calendar className="w-5 h-5 ml-2" />
                  طلبات الإجازات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employee.leaveRequests.map((request) => (
                    <div key={request.id} className="border dark:border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium dark:text-white">{request.type}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{request.reason}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          request.status === 'معتمدة' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : request.status === 'قيد المراجعة'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {request.status}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>من {request.startDate} إلى {request.endDate}</span>
                        <span>{request.days} أيام</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* تاريخ الراتب */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white flex items-center">
                  <BarChart3 className="w-5 h-5 ml-2" />
                  تاريخ الراتب (آخر 3 أشهر)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b dark:border-gray-700">
                        <th className="text-right py-2 text-gray-600 dark:text-gray-400">الشهر</th>
                        <th className="text-right py-2 text-gray-600 dark:text-gray-400">الراتب الأساسي</th>
                        <th className="text-right py-2 text-gray-600 dark:text-gray-400">البدلات</th>
                        <th className="text-right py-2 text-gray-600 dark:text-gray-400">المكافآت</th>
                        <th className="text-right py-2 text-gray-600 dark:text-gray-400">الخصومات</th>
                        <th className="text-right py-2 text-gray-600 dark:text-gray-400">صافي الراتب</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employee.salaryHistory.map((salary, index) => (
                        <tr key={index} className="border-b dark:border-gray-700">
                          <td className="py-2 dark:text-white">{salary.date}</td>
                          <td className="py-2 dark:text-white">{salary.baseSalary.toLocaleString("en-US")}</td>
                          <td className="py-2 text-green-600 dark:text-green-400">+{salary.allowances.toLocaleString("en-US")}</td>
                          <td className="py-2 text-green-600 dark:text-green-400">+{salary.bonuses.toLocaleString("en-US")}</td>
                          <td className="py-2 text-red-600 dark:text-red-400">-{salary.deductions.toLocaleString("en-US")}</td>
                          <td className="py-2 font-bold text-blue-600 dark:text-blue-400">{salary.netSalary.toLocaleString("en-US")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* المشاريع */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">المشاريع الحالية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {employee.projects.map((project, index) => (
                    <div key={index} className="flex items-center space-x-3 space-x-reverse p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="flex-1 dark:text-white">{project}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">نشط</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* الأداء والإنجازات */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  <Award className="w-5 h-5 ml-2" />
                  الأداء والإنجازات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold dark:text-white mb-3">الأهداف الحالية</h4>
                    <div className="space-y-2">
                      {employee.performance.goals.map((goal, index) => (
                        <div key={index} className="flex items-center space-x-2 space-x-reverse">
                          <Target className="w-4 h-4 text-blue-500" />
                          <span className="dark:text-gray-300">{goal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold dark:text-white mb-3">الإنجازات المميزة</h4>
                    <div className="space-y-2">
                      {employee.performance.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center space-x-2 space-x-reverse">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="dark:text-gray-300">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetailsPage 