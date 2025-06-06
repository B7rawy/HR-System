# 🏢 نظام إدارة الموارد البشرية

نظام شامل لإدارة الموارد البشرية والشؤون المالية مع تكامل WhatsApp

## ✨ المميزات

### 📊 الإدارة المالية
- إدارة المعاملات المالية (إيرادات ومصروفات)
- نظام الموافقات المالية
- تقارير مالية تفصيلية
- تصنيف المعاملات

### 👥 إدارة الموظفين
- قاعدة بيانات شاملة للموظفين
- إدارة الأقسام والمناصب
- نظام الرواتب والبدلات

### 📱 تكامل WhatsApp
- إرسال التنبيهات عبر WhatsApp
- تنبيهات المعاملات المالية
- رسائل آلية للموظفين

### 📋 سجلات النظام
- تتبع جميع العمليات
- سجلات تفصيلية للمعاملات
- إحصائيات شاملة

## 🚀 التقنيات المستخدمة

### Backend
- **Node.js** - بيئة التشغيل
- **Express.js** - إطار العمل
- **JSON** - قاعدة البيانات
- **WhatsApp Web.js** - تكامل WhatsApp

### Frontend  
- **React.js** - مكتبة واجهة المستخدم
- **Tailwind CSS** - تصميم واجهة المستخدم
- **Lucide React** - الأيقونات

## 📦 التثبيت

### متطلبات النظام
- Node.js (الإصدار 18 أو أحدث)
- npm أو yarn
- Google Chrome (لـ WhatsApp)

### خطوات التثبيت

1. **استنساخ المشروع**
   ```bash
   git clone <repository-url>
   cd HR-System
   ```

2. **تثبيت تبعيات Backend**
   ```bash
   cd backend
   npm install
   ```

3. **تثبيت تبعيات Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **إنشاء ملف Environment**
   ```bash
   # في مجلد backend
   cp .env.example .env
   ```

5. **تشغيل النظام**
   ```bash
   # Backend (البورت 5001)
   cd backend
   npm start
   
   # Frontend (البورت 3000)
   cd frontend  
   npm start
   ```

## 🔧 الإعداد

### إعداد WhatsApp
1. تشغيل Backend
2. الذهاب إلى `/whatsapp-dashboard`
3. مسح QR Code بـ WhatsApp
4. تأكيد الاتصال

### إعداد قاعدة البيانات
يستخدم النظام ملفات JSON لتخزين البيانات:
- `backend/data/logs/logs.json` - سجلات النظام
- `backend/data/transactions.json` - المعاملات المالية
- `backend/data/employees.json` - بيانات الموظفين

## 🌐 النشر على الإنتاج

### إعداد VPS
```bash
# تحديث النظام
sudo apt update && sudo apt upgrade -y

# تثبيت Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# تثبيت PM2
sudo npm install -g pm2

# تثبيت Nginx
sudo apt install nginx -y
```

### نشر التطبيق
```bash
# استنساخ المشروع
git clone <repository-url>
cd HR-System

# تثبيت التبعيات
cd backend && npm install --production
cd ../frontend && npm install && npm run build

# تشغيل Backend مع PM2
cd ../backend
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 📚 الاستخدام

### الواجهات الرئيسية
- **لوحة التحكم**: `/dashboard`
- **المعاملات المالية**: `/transactions`
- **الموظفين**: `/employees`
- **الرواتب**: `/payroll`
- **WhatsApp**: `/whatsapp-dashboard`
- **سجلات النظام**: `/system-logs`

### API Endpoints
- `GET /api/transactions` - جلب المعاملات
- `POST /api/transactions` - إضافة معاملة
- `GET /api/logs` - جلب السجلات
- `GET /api/logs/stats` - إحصائيات السجلات

## 🔒 الأمان

- تشفير جلسات WhatsApp
- حماية API endpoints
- تسجيل جميع العمليات
- نسخ احتياطية تلقائية

## 🐛 استكشاف الأخطاء

### مشاكل شائعة
1. **خطأ البورت مستخدم**
   ```bash
   sudo lsof -i :5001
   sudo kill -9 <PID>
   ```

2. **مشاكل WhatsApp**
   ```bash
   # حذف جلسة WhatsApp
   rm -rf backend/data/whatsapp/session
   ```

3. **مشاكل قاعدة البيانات**
   ```bash
   # إعادة تعيين السجلات
   echo '[]' > backend/data/logs/logs.json
   ```

## 📞 الدعم

للحصول على الدعم أو الإبلاغ عن مشاكل، يرجى التواصل معنا.

## 📄 الترخيص

هذا المشروع محمي بحقوق الطبع والنشر.

---

**تم التطوير بواسطة**: فريق تطوير أنظمة الموارد البشرية  
**التاريخ**: 2024  
**الإصدار**: 1.0.0 