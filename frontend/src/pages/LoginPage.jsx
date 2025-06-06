import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Eye, EyeOff, User, Shield, Mail, Lock, Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { isDarkMode, toggleTheme } = useTheme()

  // بيانات المستخدمين المُعرفة مسبقاً
  const users = [
    {
      id: 1,
      email: 'admin@hr.com',
      password: 'admin123',
      username: 'مدير النظام',
      role: 'admin',
      name: 'أحمد محمد'
    },
    {
      id: 2,
      email: 'employee@hr.com',
      password: 'emp123',
      username: 'موظف النظام',
      role: 'employee',
      name: 'فاطمة أحمد'
    }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // محاكاة delay للتحميل
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const user = users.find(
        u => u.email === formData.email && u.password === formData.password
      )

      if (user) {
        // تخزين بيانات المستخدم في localStorage
        localStorage.setItem('user', JSON.stringify(user))
        onLogin(user)
      } else {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة')
      }
    } catch (error) {
      setError('حدث خطأ أثناء تسجيل الدخول')
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickLogin = async (userType) => {
    setIsLoading(true)
    try {
      const user = users.find(u => u.role === userType)
      // محاكاة delay للتحميل
      await new Promise(resolve => setTimeout(resolve, 500))
      
      if (user) {
        // تخزين بيانات المستخدم في localStorage
        localStorage.setItem('user', JSON.stringify(user))
        onLogin(user)
      }
    } catch (error) {
      setError('حدث خطأ أثناء تسجيل الدخول السريع')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
      {/* زر تبديل الثيم */}
      <div className="fixed top-4 left-4 rtl:right-4 rtl:left-auto z-50">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" />
          )}
        </Button>
      </div>

      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        
        {/* الجانب الأيسر - معلومات النظام */}
        <div className="hidden lg:block space-y-6">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
              <span className="text-white font-bold text-3xl">HR</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              نظام إدارة الموارد البشرية
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              منصة شاملة لإدارة الموظفين والرواتب والعمليات المالية
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">إدارة الموظفين</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">إضافة وتعديل بيانات الموظفين بسهولة</p>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">إدارة الرواتب</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">حساب ومتابعة الرواتب والبدلات</p>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">التقارير المالية</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">تقارير شاملة عن الوضع المالي</p>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">إدارة الحضور</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">متابعة حضور وغياب الموظفين</p>
            </div>
          </div>
        </div>

        {/* الجانب الأيمن - نموذج تسجيل الدخول */}
        <div className="w-full max-w-md mx-auto space-y-6">
          
          {/* بطاقة تسجيل الدخول الرئيسية */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">تسجيل الدخول</CardTitle>
              <CardDescription className="dark:text-gray-300">أدخل بياناتك للوصول إلى النظام</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-700 dark:text-red-400 text-sm">
                    {error}
                  </div>
                )}

                {/* البريد الإلكتروني */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">البريد الإلكتروني</label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="أدخل البريد الإلكتروني"
                      className="w-full pl-4 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 dark:bg-gray-700/90 dark:text-white"
                      required
                    />
                  </div>
                </div>

                {/* كلمة المرور */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">كلمة المرور</label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="أدخل كلمة المرور"
                      className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 dark:bg-gray-700/90 dark:text-white"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* زر تسجيل الدخول */}
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-3 text-lg font-medium"
                >
                  {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* خيارات الدخول السريع */}
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">أو</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* دخول كمدير */}
              <Button
                onClick={() => handleQuickLogin('admin')}
                disabled={isLoading}
                variant="outline"
                className="flex items-center space-x-2 rtl:space-x-reverse py-3 bg-white/60 dark:bg-gray-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/20 border-blue-200 dark:border-blue-700 hover:border-blue-300 dark:hover:border-blue-600"
              >
                <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="font-medium">دخول كمدير</span>
              </Button>

              {/* دخول كموظف */}
              <Button
                onClick={() => handleQuickLogin('employee')}
                disabled={isLoading}
                variant="outline"
                className="flex items-center space-x-2 rtl:space-x-reverse py-3 bg-white/60 dark:bg-gray-800/60 hover:bg-green-50 dark:hover:bg-green-900/20 border-green-200 dark:border-green-700 hover:border-green-300 dark:hover:border-green-600"
              >
                <User className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="font-medium">دخول كموظف</span>
              </Button>
            </div>
          </div>

          {/* بيانات الدخول التجريبية */}
          <Card className="bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">بيانات تجريبية:</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="font-medium text-blue-600 dark:text-blue-400">المدير:</span>
                <span className="text-gray-600 dark:text-gray-300">admin@hr.com / admin123</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-green-600 dark:text-green-400">الموظف:</span>
                <span className="text-gray-600 dark:text-gray-300">employee@hr.com / emp123</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default LoginPage 