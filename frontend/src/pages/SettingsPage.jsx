import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useNotifications } from '../components/NotificationSystem'
import { Label } from '../components/ui/label'
import { 
  Settings, 
  Bell, 
  Database,
  Download,
  Upload,
  Save,
  RefreshCw
} from 'lucide-react'

const SettingsPage = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotifications()
  const [settings, setSettings] = useState({
    companyName: 'شركة التطوير المتقدم',
    companyEmail: 'info@company.com',
    currency: 'EGP',
    language: 'ar',
    theme: 'light',
    notifications: {
      email: true,
      payroll: true,
      budget: true,
      reports: false
    }
  })

  const [paymentMethods, setPaymentMethods] = useState([
    'كاش',
    'تحويل بنكي',
    'شيك',
    'بطاقة ائتمان',
    'بطاقة خصم'
  ])

  const [newPaymentMethod, setNewPaymentMethod] = useState('')

  const [changePassword, setChangePassword] = useState(false)
  const [showPassword] = useState(false)
  const [isDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'أحمد محمد علي',
    email: 'ahmed@company.com',
    phone: '+966501234567',
    department: 'التطوير',
    position: 'مطور برمجيات رئيسي',
    location: 'الرياض'
  })
  
  const [securitySettings, setSecuritySettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    systemAlerts: true,
    autoLogout: 30
  })

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleNotificationChange = (key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }))
  }

  const addPaymentMethod = () => {
    if (newPaymentMethod.trim() && !paymentMethods.includes(newPaymentMethod.trim())) {
      setPaymentMethods([...paymentMethods, newPaymentMethod.trim()])
      setNewPaymentMethod('')
    }
  }

  const removePaymentMethod = (method) => {
    setPaymentMethods(paymentMethods.filter(m => m !== method))
  }

  const handleSave = () => {
    // حفظ الإعدادات
    showSuccess('تم حفظ الإعدادات بنجاح!', {
      title: 'حفظ الإعدادات ⚙️'
    })
  }

  const toggleNotification = () => {}

  return (
    <div className="space-y-6">
      {/* العنوان الرئيسي */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">الإعدادات</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            إدارة تفضيلاتك وإعدادات النظام
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            إعادة تعيين
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="w-4 h-4" />
            حفظ التغييرات
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* الإعدادات العامة */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="ml-2 h-5 w-5" />
              الإعدادات العامة
            </CardTitle>
            <CardDescription>إعدادات الشركة الأساسية</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="companyName">اسم الشركة</Label>
              <Input
                id="companyName"
                value={settings.companyName}
                onChange={(e) => handleSettingChange('companyName', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="companyEmail">البريد الإلكتروني للشركة</Label>
              <Input
                id="companyEmail"
                type="email"
                value={settings.companyEmail}
                onChange={(e) => handleSettingChange('companyEmail', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="currency">العملة الافتراضية</Label>
              <select
                id="currency"
                value={settings.currency}
                onChange={(e) => handleSettingChange('currency', e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md"
              >
                <option value="EGP">جنيه مصري (EGP)</option>
                <option value="USD">دولار أمريكي (USD)</option>
                <option value="EUR">يورو (EUR)</option>
                <option value="SAR">ريال سعودي (SAR)</option>
              </select>
            </div>

            <div>
              <Label htmlFor="language">اللغة</Label>
              <select
                id="language"
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md"
              >
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* إعدادات الإشعارات */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="ml-2 h-5 w-5" />
              الإشعارات
            </CardTitle>
            <CardDescription>تخصيص إشعارات النظام</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>إشعارات البريد الإلكتروني</Label>
                <p className="text-sm text-gray-500">تلقي إشعارات عبر البريد</p>
              </div>
              <button
                onClick={() => handleNotificationChange('email')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications.email ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications.email ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>تنبيهات الرواتب</Label>
                <p className="text-sm text-gray-500">إشعار عند موعد دفع الرواتب</p>
              </div>
              <button
                onClick={() => handleNotificationChange('payroll')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications.payroll ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications.payroll ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>تجاوز الميزانية</Label>
                <p className="text-sm text-gray-500">تنبيه عند تجاوز حدود الميزانية</p>
              </div>
              <button
                onClick={() => handleNotificationChange('budget')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications.budget ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications.budget ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>التقارير الشهرية</Label>
                <p className="text-sm text-gray-500">إرسال تقارير شهرية تلقائياً</p>
              </div>
              <button
                onClick={() => handleNotificationChange('reports')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications.reports ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications.reports ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* وسائل الدفع */}
        <Card>
          <CardHeader>
            <CardTitle>وسائل الدفع</CardTitle>
            <CardDescription>إدارة طرق الدفع المتاحة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {paymentMethods.map((method, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <span>{method}</span>
                  {paymentMethods.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePaymentMethod(method)}
                      className="text-red-600 hover:text-red-700"
                    >
                      حذف
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="وسيلة دفع جديدة"
                value={newPaymentMethod}
                onChange={(e) => setNewPaymentMethod(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addPaymentMethod()}
              />
              <Button onClick={addPaymentMethod}>إضافة</Button>
            </div>
          </CardContent>
        </Card>

        {/* النسخ الاحتياطي والاستيراد */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="ml-2 h-5 w-5" />
              البيانات والنسخ الاحتياطي
            </CardTitle>
            <CardDescription>إدارة بيانات النظام</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Download className="ml-2 h-4 w-4" />
                تصدير البيانات
              </Button>

              <Button variant="outline" className="w-full justify-start">
                <Upload className="ml-2 h-4 w-4" />
                استيراد البيانات
              </Button>

              <Button variant="outline" className="w-full justify-start">
                <Database className="ml-2 h-4 w-4" />
                إنشاء نسخة احتياطية
              </Button>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 mb-2">آخر نسخة احتياطية:</p>
              <p className="text-sm font-mono">2024-06-15 14:30:00</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* معلومات النظام */}
      <Card>
        <CardHeader>
          <CardTitle>معلومات النظام</CardTitle>
          <CardDescription>تفاصيل حول النظام والإصدار</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label>إصدار النظام</Label>
              <p className="text-sm text-gray-600">v1.0.0</p>
            </div>
            <div>
              <Label>آخر تحديث</Label>
              <p className="text-sm text-gray-600">2024-06-15</p>
            </div>
            <div>
              <Label>المطور</Label>
              <p className="text-sm text-gray-600">فريق التطوير</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* حفظ الإعدادات */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          حفظ جميع الإعدادات
        </Button>
      </div>
    </div>
  )
}

export default SettingsPage 