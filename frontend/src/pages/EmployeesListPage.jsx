import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { 
  Search, 
  Mail, 
  Phone, 
  Building, 
  Users,
  Calendar,
  Award,
  MapPin,
  Star,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Shield,
  Target,
  Clock
} from 'lucide-react'
import { formatDate } from '../utils/formatters'

const EmployeesListPage = () => {
  const navigate = useNavigate()
  // بيانات مؤقتة أكثر تفصيلاً لقائمة الموظفين
  const employees = [
    {
      id: 1,
      name: 'أحمد محمد علي',
      email: 'ahmed.mohamed@company.com',
      phone: '+20 100 123 4567',
      position: 'مطور ويب رئيسي',
      department: 'تقنية المعلومات',
      joinDate: '2022-01-15',
      status: 'نشط',
      location: 'القاهرة، مصر',
      avatar: null,
      skills: ['React', 'Node.js', 'MongoDB'],
      experience: '5 سنوات',
      education: 'بكالوريوس هندسة حاسوب',
      salary: 15000,
      teamLead: true,
      projects: ['تطوير موقع الشركة', 'تطبيق إدارة الموارد البشرية']
    },
    {
      id: 2,
      name: 'فاطمة أحمد حسن',
      email: 'fatma.ahmed@company.com',
      phone: '+20 101 234 5678',
      position: 'محاسبة مالية',
      department: 'المالية',
      joinDate: '2022-03-20',
      status: 'نشط',
      location: 'الجيزة، مصر',
      avatar: null,
      skills: ['المحاسبة', 'Excel', 'التدقيق'],
      experience: '4 سنوات',
      education: 'بكالوريوس تجارة - محاسبة',
      salary: 12000,
      teamLead: false,
      projects: ['تدقيق الحسابات الشهرية', 'إعداد الميزانية السنوية']
    },
    {
      id: 3,
      name: 'محمد عبد الله',
      email: 'mohamed.abdullah@company.com',
      phone: '+20 102 345 6789',
      position: 'أخصائي موارد بشرية',
      department: 'الموارد البشرية',
      joinDate: '2021-11-10',
      status: 'نشط',
      location: 'الإسكندرية، مصر',
      avatar: null,
      skills: ['إدارة الموارد البشرية', 'التوظيف', 'التدريب'],
      experience: '6 سنوات',
      education: 'بكالوريوس إدارة أعمال',
      salary: 11000,
      teamLead: false,
      projects: ['برنامج التوجيه للموظفين الجدد', 'تطوير سياسات الموارد البشرية']
    },
    {
      id: 4,
      name: 'سارة إبراهيم',
      email: 'sara.ibrahim@company.com',
      phone: '+20 103 456 7890',
      position: 'مصممة جرافيك',
      department: 'التسويق',
      joinDate: '2023-02-01',
      status: 'نشط',
      location: 'القاهرة، مصر',
      avatar: null,
      skills: ['Photoshop', 'Illustrator', 'InDesign'],
      experience: '3 سنوات',
      education: 'بكالوريوس فنون جميلة',
      salary: 9000,
      teamLead: false,
      projects: ['تصميم هوية الشركة الجديدة', 'حملة إعلانية للمنتج الجديد']
    },
    {
      id: 5,
      name: 'علي حسام الدين',
      email: 'ali.hossam@company.com',
      phone: '+20 104 567 8901',
      position: 'مدير مشاريع',
      department: 'إدارة المشاريع',
      joinDate: '2020-06-15',
      status: 'نشط',
      location: 'الجيزة، مصر',
      avatar: null,
      skills: ['إدارة المشاريع', 'Agile', 'Scrum'],
      experience: '8 سنوات',
      education: 'ماجستير إدارة أعمال',
      salary: 18000,
      teamLead: true,
      projects: ['مشروع تطوير النظام المحاسبي', 'مشروع التحول الرقمي']
    },
    {
      id: 6,
      name: 'نورهان مصطفى',
      email: 'nourhan.mostafa@company.com',
      phone: '+20 105 678 9012',
      position: 'محللة بيانات',
      department: 'تقنية المعلومات',
      joinDate: '2022-09-01',
      status: 'إجازة',
      location: 'الإسكندرية، مصر',
      avatar: null,
      skills: ['Python', 'SQL', 'Power BI'],
      experience: '4 سنوات',
      education: 'بكالوريوس علوم حاسوب',
      salary: 13000,
      teamLead: false,
      projects: ['تحليل بيانات المبيعات', 'تطوير لوحة المعلومات التنفيذية']
    },
    {
      id: 7,
      name: 'خالد رمضان',
      email: 'khaled.ramadan@company.com',
      phone: '+20 106 789 0123',
      position: 'مطور تطبيقات موبايل',
      department: 'تقنية المعلومات',
      joinDate: '2023-01-10',
      status: 'نشط',
      location: 'القاهرة، مصر',
      avatar: null,
      skills: ['Flutter', 'React Native', 'Kotlin'],
      experience: '3 سنوات',
      education: 'بكالوريوس هندسة حاسوب',
      salary: 14000,
      teamLead: false,
      projects: ['تطبيق الشركة للأندرويد', 'تطبيق خدمة العملاء']
    },
    {
      id: 8,
      name: 'دينا صلاح',
      email: 'dina.salah@company.com',
      phone: '+20 107 890 1234',
      position: 'أخصائية تسويق رقمي',
      department: 'التسويق',
      joinDate: '2022-07-15',
      status: 'نشط',
      location: 'الجيزة، مصر',
      avatar: null,
      skills: ['SEO', 'Google Ads', 'Social Media'],
      experience: '4 سنوات',
      education: 'بكالوريوس إعلام',
      salary: 10000,
      teamLead: true,
      projects: ['حملة التسويق الرقمي', 'تحسين محركات البحث للموقع']
    },
    {
      id: 9,
      name: 'أمير حسني',
      email: 'amir.hosni@company.com',
      phone: '+20 108 901 2345',
      position: 'مهندس شبكات',
      department: 'تقنية المعلومات',
      joinDate: '2021-04-20',
      status: 'نشط',
      location: 'الإسكندرية، مصر',
      avatar: null,
      skills: ['Cisco', 'Windows Server', 'Linux'],
      experience: '7 سنوات',
      education: 'بكالوريوس هندسة اتصالات',
      salary: 16000,
      teamLead: false,
      projects: ['ترقية شبكة الشركة', 'تأمين البنية التحتية']
    },
    {
      id: 10,
      name: 'منى عبد الرحمن',
      email: 'mona.abdelrahman@company.com',
      phone: '+20 109 012 3456',
      position: 'منسقة خدمة عملاء',
      department: 'خدمة العملاء',
      joinDate: '2023-03-01',
      status: 'نشط',
      location: 'القاهرة، مصر',
      avatar: null,
      skills: ['خدمة العملاء', 'CRM', 'التواصل'],
      experience: '2 سنة',
      education: 'بكالوريوس آداب إنجليزي',
      salary: 8000,
      teamLead: false,
      projects: ['تطوير خدمة العملاء', 'برنامج ولاء العملاء']
    },
    {
      id: 11,
      name: 'يوسف محمود',
      email: 'yousef.mahmoud@company.com',
      phone: '+20 110 123 4567',
      position: 'مهندس برمجيات',
      department: 'تقنية المعلومات',
      joinDate: '2022-11-01',
      status: 'نشط',
      location: 'القاهرة، مصر',
      avatar: null,
      skills: ['Java', 'Spring Boot', 'MySQL'],
      experience: '4 سنوات',
      education: 'بكالوريوس هندسة حاسوب',
      salary: 13500,
      teamLead: false,
      projects: ['تطوير نظام إدارة المخزون', 'API للتطبيقات']
    },
    {
      id: 12,
      name: 'هالة عبد العزيز',
      email: 'hala.abdelaziz@company.com',
      phone: '+20 111 234 5678',
      position: 'مديرة علاقات عامة',
      department: 'التسويق',
      joinDate: '2021-08-15',
      status: 'نشط',
      location: 'الجيزة، مصر',
      avatar: null,
      skills: ['العلاقات العامة', 'الإعلام', 'التواصل'],
      experience: '6 سنوات',
      education: 'بكالوريوس إعلام',
      salary: 14500,
      teamLead: true,
      projects: ['حملة العلاقات العامة', 'إدارة الأزمات الإعلامية']
    },
    {
      id: 13,
      name: 'عمرو طارق',
      email: 'amr.tarek@company.com',
      phone: '+20 112 345 6789',
      position: 'محلل أمن سيبراني',
      department: 'تقنية المعلومات',
      joinDate: '2023-04-01',
      status: 'نشط',
      location: 'الإسكندرية، مصر',
      avatar: null,
      skills: ['الأمن السيبراني', 'Penetration Testing', 'Ethical Hacking'],
      experience: '3 سنوات',
      education: 'بكالوريوس أمن المعلومات',
      salary: 16500,
      teamLead: false,
      projects: ['تدقيق الأمان', 'تطوير سياسات الأمن السيبراني']
    },
    {
      id: 14,
      name: 'ريم حسام',
      email: 'reem.hossam@company.com',
      phone: '+20 113 456 7890',
      position: 'مسؤولة المبيعات',
      department: 'المبيعات',
      joinDate: '2022-05-10',
      status: 'نشط',
      location: 'القاهرة، مصر',
      avatar: null,
      skills: ['المبيعات', 'CRM', 'التفاوض'],
      experience: '5 سنوات',
      education: 'بكالوريوس إدارة أعمال',
      salary: 11500,
      teamLead: false,
      projects: ['زيادة المبيعات بنسبة 25%', 'تطوير قاعدة العملاء']
    },
    {
      id: 15,
      name: 'كريم فاروق',
      email: 'kareem.farouk@company.com',
      phone: '+20 114 567 8901',
      position: 'مصمم واجهات المستخدم',
      department: 'تقنية المعلومات',
      joinDate: '2023-06-01',
      status: 'تحت التدريب',
      location: 'الجيزة، مصر',
      avatar: null,
      skills: ['UI/UX Design', 'Figma', 'Adobe XD'],
      experience: '2 سنة',
      education: 'بكالوريوس فنون تطبيقية',
      salary: 7500,
      teamLead: false,
      projects: ['تصميم واجهة التطبيق الجديد', 'تحسين تجربة المستخدم']
    },
    {
      id: 16,
      name: 'كريم البحراوي',
      email: 'kareem.bahrawi@company.com',
      phone: '+20 101 677 2118',
      position: 'مصمم جرافيك',
      department: 'التسويق',
      joinDate: '2023-09-15',
      status: 'نشط',
      location: 'الإسكندرية، مصر',
      avatar: null,
      skills: ['Photoshop', 'Illustrator', 'Branding', 'Typography'],
      experience: '3 سنوات',
      education: 'بكالوريوس فنون جميلة',
      salary: 6500,
      teamLead: false,
      projects: ['تصميم هوية العلامة التجارية', 'حملة إعلانية للمنتج الجديد']
    },
    {
      id: 17,
      name: 'ماجد',
      email: 'majed@company.com',
      phone: '+20 108 060 6086',
      position: 'محاسب',
      department: 'الحسابات',
      joinDate: '2024-01-10',
      status: 'نشط',
      location: 'القاهرة، مصر',
      avatar: null,
      skills: ['Excel', 'محاسبة', 'تحليل مالي', 'ERP'],
      experience: '4 سنوات',
      education: 'بكالوريوس تجارة',
      salary: 7000,
      teamLead: false,
      projects: ['إعداد التقارير المالية', 'مراجعة الحسابات الشهرية']
    }
  ];

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  // الحصول على قائمة الأقسام
  const departments = [...new Set(employees.map(emp => emp.department))];

  // إحصائيات سريعة
  const stats = {
    totalEmployees: employees.length,
    activeEmployees: employees.filter(emp => emp.status === 'نشط').length,
    onLeaveEmployees: employees.filter(emp => emp.status === 'إجازة').length,
    departments: departments.length,
    teamLeaders: employees.filter(emp => emp.teamLead).length,
    averageSalary: employees.reduce((sum, emp) => sum + (emp.salary || 0), 0) / employees.length
  };

  // فلترة وترتيب الموظفين
  const filteredAndSortedEmployees = employees
    .filter(employee => {
      const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
      const matchesStatus = selectedStatus === 'all' || employee.status === selectedStatus;
      return matchesSearch && matchesDepartment && matchesStatus;
    })
    .sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'joinDate':
          aValue = new Date(a.joinDate);
          bValue = new Date(b.joinDate);
          break;
        case 'department':
          aValue = a.department;
          bValue = b.department;
          break;
        case 'salary':
          aValue = a.salary || 0;
          bValue = b.salary || 0;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // الحصول على أول حرف من الاسم للأفاتار
  const getInitials = (name) => {
    return name.split(' ')[0].charAt(0)
  }

  // ألوان عشوائية للأفاتار
  const avatarColors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 
    'bg-indigo-500', 'bg-yellow-500', 'bg-red-500', 'bg-teal-500'
  ]

  const getAvatarColor = (id) => {
    return avatarColors[id % avatarColors.length]
  }

  return (
    <div className="space-y-6">
      {/* رأس الصفحة */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">دليل الموظفين</h1>
        <p className="text-gray-600 dark:text-gray-300">تصفح معلومات الاتصال بزملائك في العمل وبياناتهم المهنية</p>
      </div>

      {/* الإحصائيات السريعة */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground dark:text-gray-400">إجمالي الموظفين</p>
                <p className="text-2xl font-bold dark:text-white">{stats.totalEmployees}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground dark:text-gray-400">الموظفون النشطون</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {stats.activeEmployees}
                </p>
              </div>
              <Award className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground dark:text-gray-400">قادة الفرق</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.teamLeaders}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground dark:text-gray-400">عدد الأقسام</p>
                <p className="text-2xl font-bold dark:text-white">{stats.departments}</p>
              </div>
              <Building className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground dark:text-gray-400">النتائج المعروضة</p>
                <p className="text-2xl font-bold dark:text-white">{filteredAndSortedEmployees.length}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  من {stats.totalEmployees} موظف
                </p>
              </div>
              <Search className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* أدوات البحث والفلترة */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* البحث */}
            <div className="relative lg:col-span-2">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="البحث بالاسم، القسم، المهارات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            
            {/* فلتر القسم */}
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="all">جميع الأقسام</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            {/* فلتر الحالة */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="all">جميع الحالات</option>
              <option value="نشط">نشط</option>
              <option value="إجازة">في إجازة</option>
              <option value="تحت التدريب">تحت التدريب</option>
            </select>

            {/* الترتيب */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              >
                <option value="name">الاسم</option>
                <option value="joinDate">تاريخ التوظيف</option>
                <option value="department">القسم</option>
                <option value="salary">الراتب</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
                title={sortOrder === 'asc' ? 'ترتيب تصاعدي' : 'ترتيب تنازلي'}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* قائمة الموظفين */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAndSortedEmployees.map((employee) => (
          <Card 
            key={employee.id} 
            className="hover:shadow-lg transition-all cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:scale-105"
            onClick={() => navigate(`/employee/${employee.id}`)}
          >
            <CardHeader>
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className={`rounded-full h-16 w-16 flex items-center justify-center text-white text-xl font-bold ${getAvatarColor(employee.id)}`}>
                  {getInitials(employee.name)}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {employee.name}
                  </CardTitle>
                  <CardDescription className="text-sm dark:text-gray-300">
                    {employee.position}
                  </CardDescription>
                  <div className="flex items-center mt-1">
                    <span className="text-xs bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-400 px-2 py-1 rounded">
                      EMP-{employee.id.toString().padStart(3, '0')}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Building className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <span className="text-sm font-medium dark:text-gray-300">القسم:</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{employee.department}</span>
                  {employee.teamLead && (
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full">قائد فريق</span>
                  )}
                </div>
                
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium">البريد:</span>
                  <a 
                    href={`mailto:${employee.email}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {employee.email}
                  </a>
                </div>
                
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium">الهاتف:</span>
                  <a 
                    href={`tel:${employee.phone}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {employee.phone}
                  </a>
                </div>
                
                <div className="flex items-center space-x-3 space-x-reverse">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium">الموقع:</span>
                  <span className="text-sm text-gray-600">{employee.location}</span>
                </div>
                
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium">تاريخ التوظيف:</span>
                  <span className="text-sm text-gray-600">{formatDate(employee.joinDate)}</span>
                </div>
                
                <div className="flex items-center space-x-3 space-x-reverse">
                  <GraduationCap className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium">التعليم:</span>
                  <span className="text-sm text-gray-600">{employee.education}</span>
                </div>

                {/* المهارات */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">المهارات:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {employee.skills.slice(0, 3).map((skill, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                    {employee.skills.length > 3 && (
                      <span className="text-xs text-gray-500">+{employee.skills.length - 3} أخرى</span>
                    )}
                  </div>
                </div>

                {/* المشاريع الحالية */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Target className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">المشاريع:</span>
                  </div>
                  <div className="space-y-1">
                    {employee.projects.slice(0, 2).map((project, index) => (
                      <div key={index} className="text-xs text-gray-600 dark:text-gray-400">
                        • {project}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="pt-3 border-t dark:border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {Math.floor((new Date() - new Date(employee.joinDate)) / (365.25 * 24 * 60 * 60 * 1000))} سنوات خبرة
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    employee.status === 'نشط' 
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                      : employee.status === 'إجازة'
                      ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                      : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                  }`}>
                    {employee.status}
                  </span>
                </div>
                
                {/* معلومات إضافية */}
                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <TrendingUp className="h-3 w-3" />
                    <span>{employee.salary ? `${employee.salary.toLocaleString()} ج.م` : 'غير محدد'}</span>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Briefcase className="h-3 w-3" />
                    <span>{employee.experience}</span>
                  </div>
                </div>
                
                {/* إشارة للنقر */}
                <div className="flex justify-center pt-2">
                  <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center">
                    انقر لعرض التفاصيل
                    <span className="mr-1">←</span>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* رسالة عدم وجود نتائج */}
      {filteredAndSortedEmployees.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">لا توجد نتائج</h3>
            <p className="text-gray-600">
              لم يتم العثور على موظفين يطابقون البحث الحالي. جرب تغيير مصطلح البحث أو الفلتر.
            </p>
          </CardContent>
        </Card>
      )}

      {/* معلومة عن الصفحة */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3 space-x-reverse">
            <div className="bg-blue-100 dark:bg-blue-800 rounded-full p-2">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">ملاحظة حول الخصوصية</h3>
              <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
                يعرض دليل الموظفين معلومات الاتصال والبيانات المهنية الأساسية. المعلومات المالية الحساسة محمية وفقاً لسياسات الخصوصية.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default EmployeesListPage 