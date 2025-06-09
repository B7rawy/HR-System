import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin, 
  Building, 
  Hash, 
  CreditCard, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar, 
  Filter, 
  Search, 
  Edit3,
  FileText,
  Download,
  Plus,
  MessageSquare,
  Send,
  Paperclip,
  Upload,
  File,
  Image,
  X,
  Eye,
  User,
  Clock
} from 'lucide-react'
import { formatCurrency, formatDate } from '../utils/formatters'

const ClientDetailsPage = () => {
  const { clientId } = useParams()
  const navigate = useNavigate()
  
  // حالات الصفحة
  const [activeTab, setActiveTab] = useState('overview') // overview, transactions, chat, files
  const [client, setClient] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [chatMessages, setChatMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [clientFiles, setClientFiles] = useState([])
  const [uploadingFile, setUploadingFile] = useState(false)

  // بيانات تجريبية للعميل
  useEffect(() => {
    // محاكاة تحميل بيانات العميل
    const mockClient = {
      id: clientId,
      name: 'شركة الأهرام للتجارة',
      email: 'info@ahram-trade.com',
      phone: '+201234567890',
      address: 'شارع النيل، القاهرة، مصر',
      type: 'شركة',
      status: 'نشط',
      taxNumber: 'TAX-123456789',
      creditLimit: 100000,
      currentBalance: 15750,
      paymentTerms: '30 يوم',
      category: 'عميل ذهبي',
      contactPerson: 'أحمد محمد',
      joinDate: '2024-01-15',
      lastActivity: '2024-06-08',
      notes: 'عميل مميز، دفع منتظم'
    }

    // بيانات تجريبية للمعاملات
    const mockTransactions = [
      {
        id: 1,
        type: 'إيراد',
        amount: 5000,
        description: 'عمولة خدمات شهر يونيو',
        date: '2024-06-08',
        status: 'مكتمل',
        reference: 'REF-001'
      },
      {
        id: 2,
        type: 'مصروف',
        amount: -2500,
        description: 'استرداد مبلغ',
        date: '2024-06-05',
        status: 'مكتمل',
        reference: 'REF-002'
      },
      {
        id: 3,
        type: 'إيراد',
        amount: 8000,
        description: 'دفعة مقدمة على الطلب الجديد',
        date: '2024-06-01',
        status: 'مكتمل',
        reference: 'REF-003'
      }
    ]

    // بيانات تجريبية للمحادثات
    const mockChatMessages = [
      {
        id: 1,
        sender: 'admin',
        message: 'مرحباً، كيف يمكنني مساعدتك؟',
        timestamp: '2024-06-08 14:30',
        type: 'text'
      },
      {
        id: 2,
        sender: 'client',
        message: 'أريد الاستفسار عن حالة الطلب الأخير',
        timestamp: '2024-06-08 14:35',
        type: 'text'
      },
      {
        id: 3,
        sender: 'admin',
        message: 'سأتحقق من حالة الطلب وأرد عليك قريباً',
        timestamp: '2024-06-08 14:38',
        type: 'text'
      }
    ]

    // بيانات تجريبية للملفات
    const mockFiles = [
      {
        id: 1,
        name: 'عقد الشراكة.pdf',
        type: 'pdf',
        size: '2.5 MB',
        uploadDate: '2024-06-01',
        category: 'عقود'
      },
      {
        id: 2,
        name: 'البطاقة الضريبية.jpg',
        type: 'image',
        size: '1.2 MB',
        uploadDate: '2024-05-15',
        category: 'مستندات رسمية'
      },
      {
        id: 3,
        name: 'كشف حساب.xlsx',
        type: 'excel',
        size: '800 KB',
        uploadDate: '2024-06-05',
        category: 'مالية'
      }
    ]

    setClient(mockClient)
    setTransactions(mockTransactions)
    setChatMessages(mockChatMessages)
    setClientFiles(mockFiles)
  }, [clientId])

  // دالة إرسال رسالة
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    const message = {
      id: chatMessages.length + 1,
      sender: 'admin',
      message: newMessage,
      timestamp: new Date().toLocaleString('ar-EG'),
      type: 'text'
    }

    setChatMessages([...chatMessages, message])
    setNewMessage('')

    // هنا سيتم تكامل WhatsApp API
    console.log('إرسال رسالة WhatsApp:', newMessage)
  }

  // دالة رفع الملفات
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    setUploadingFile(true)

    files.forEach(file => {
      const newFile = {
        id: clientFiles.length + Math.random(),
        name: file.name,
        type: file.type.includes('image') ? 'image' : file.type.includes('pdf') ? 'pdf' : 'file',
        size: (file.size / 1024 / 1024).toFixed(1) + ' MB',
        uploadDate: new Date().toLocaleDateString('ar-EG'),
        category: 'عام'
      }

      setClientFiles(prev => [...prev, newFile])
    })

    setTimeout(() => setUploadingFile(false), 1000)
  }

  if (!client) {
    return <div className="flex justify-center items-center h-64">جاري التحميل...</div>
  }

  return (
    <div className="space-y-6">
      {/* العنوان والتنقل */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Button variant="outline" onClick={() => navigate('/clients')}>
            <ArrowLeft className="w-4 h-4 ml-2" />
            العودة للعملاء
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{client.name}</h1>
            <p className="text-gray-600 dark:text-gray-300">تفاصيل العميل والحساب</p>
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Edit3 className="w-4 h-4 ml-2" />
          تعديل البيانات
        </Button>
      </div>

      {/* التبويبات */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8 rtl:space-x-reverse">
          {[
            { id: 'overview', name: 'نظرة عامة', icon: User },
            { id: 'transactions', name: 'المعاملات', icon: DollarSign },
            { id: 'chat', name: 'المحادثات', icon: MessageSquare },
            { id: 'files', name: 'الملفات', icon: FileText }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 rtl:space-x-reverse ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* محتوى التبويبات */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* معلومات العميل */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>بيانات العميل</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                    <p className="font-medium">{client.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">الهاتف</p>
                    <p className="font-medium">{client.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Building className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">النوع</p>
                    <p className="font-medium">{client.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Hash className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">الرقم الضريبي</p>
                    <p className="font-medium">{client.taxNumber}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">العنوان</p>
                  <p className="font-medium">{client.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* الرصيد الحالي */}
          <Card>
            <CardHeader>
              <CardTitle>الرصيد الحالي</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className={`text-3xl font-bold ${client.currentBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(Math.abs(client.currentBalance))}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {client.currentBalance >= 0 ? 'له علينا' : 'عليه لنا'}
                </p>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>حد الائتمان:</span>
                    <span className="font-medium">{formatCurrency(client.creditLimit)}</span>
                  </div>
                  <div className="mt-2">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{width: `${(Math.abs(client.currentBalance) / client.creditLimit) * 100}%`}}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {((Math.abs(client.currentBalance) / client.creditLimit) * 100).toFixed(1)}% مستخدم
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'transactions' && (
        <Card>
          <CardHeader>
            <CardTitle>سجل المعاملات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map(transaction => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'إيراد' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {transaction.type === 'إيراد' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{formatDate(transaction.date)} • {transaction.reference}</p>
                    </div>
                  </div>
                  <div className={`text-lg font-semibold ${
                    transaction.type === 'إيراد' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'إيراد' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>محادثة WhatsApp</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 border rounded-lg flex flex-col">
                {/* منطقة الرسائل */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {chatMessages.map(message => (
                    <div key={message.id} className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs px-4 py-2 rounded-lg ${
                        message.sender === 'admin' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-200 text-gray-900'
                      }`}>
                        <p>{message.message}</p>
                        <p className={`text-xs mt-1 ${message.sender === 'admin' ? 'text-blue-100' : 'text-gray-500'}`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* منطقة كتابة الرسالة */}
                <div className="border-t p-4">
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="اكتب رسالتك..."
                      className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* معلومات الاتصال */}
          <Card>
            <CardHeader>
              <CardTitle>معلومات الاتصال</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">WhatsApp متصل</p>
                    <p className="text-sm text-gray-500">آخر ظهور: منذ 5 دقائق</p>
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Phone className="w-4 h-4 ml-2" />
                  اتصال مباشر
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'files' && (
        <div className="space-y-6">
          {/* رفع الملفات */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                ملفات العميل
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button 
                    onClick={() => document.getElementById('file-upload').click()}
                    disabled={uploadingFile}
                  >
                    <Upload className="w-4 h-4 ml-2" />
                    {uploadingFile ? 'جاري الرفع...' : 'رفع ملف'}
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {clientFiles.map(file => (
                  <div key={file.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        file.type === 'image' ? 'bg-purple-100 text-purple-600' :
                        file.type === 'pdf' ? 'bg-red-100 text-red-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {file.type === 'image' ? <Image className="w-5 h-5" /> :
                         file.type === 'pdf' ? <FileText className="w-5 h-5" /> :
                         <File className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{file.name}</p>
                        <p className="text-sm text-gray-500">{file.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>{file.uploadDate}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">{file.category}</span>
                    </div>
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 ml-1" />
                        عرض
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="w-4 h-4 ml-1" />
                        تحميل
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {clientFiles.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>لا توجد ملفات مرفوعة</p>
                  <p className="text-sm">ابدأ برفع الملفات والمستندات الخاصة بالعميل</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default ClientDetailsPage 