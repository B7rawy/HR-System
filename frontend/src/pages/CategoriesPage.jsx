import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Badge } from '../components/ui/badge'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Folder, 
  DollarSign, 
  TrendingUp,
  Target,
  Activity,
  Search,
  Save,
  X
} from 'lucide-react'
import { formatCurrency } from '../utils/formatters'

const CategoriesPage = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all') // all, income, expense

  // بيانات مؤقتة للتصنيفات
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'رواتب',
      type: 'expense',
      description: 'رواتب وأجور الموظفين',
      color: '#3b82f6',
      icon: '👥',
      budget: 50000,
      spent: 45000,
      transactionCount: 25,
      isActive: true,
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'عمولات',
      type: 'income',
      description: 'عمولات المبيعات والمشاريع',
      color: '#10b981',
      icon: '💰',
      budget: 20000,
      spent: 18500,
      transactionCount: 12,
      isActive: true,
      createdAt: '2024-01-20'
    },
    {
      id: 3,
      name: 'إيجار',
      type: 'expense',
      description: 'إيجار المكاتب والمرافق',
      color: '#f59e0b',
      icon: '🏢',
      budget: 15000,
      spent: 15000,
      transactionCount: 3,
      isActive: true,
      createdAt: '2024-02-01'
    },
    {
      id: 4,
      name: 'مرافق',
      type: 'expense',
      description: 'كهرباء ومياه وإنترنت',
      color: '#ef4444',
      icon: '⚡',
      budget: 5000,
      spent: 4200,
      transactionCount: 8,
      isActive: true,
      createdAt: '2024-02-05'
    },
    {
      id: 5,
      name: 'معدات',
      type: 'expense',
      description: 'أجهزة ومعدات مكتبية',
      color: '#8b5cf6',
      icon: '💻',
      budget: 25000,
      spent: 12000,
      transactionCount: 5,
      isActive: true,
      createdAt: '2024-02-10'
    },
    {
      id: 6,
      name: 'خدمات',
      type: 'income',
      description: 'إيرادات الخدمات الاستشارية',
      color: '#06b6d4',
      icon: '🛠️',
      budget: 30000,
      spent: 22000,
      transactionCount: 15,
      isActive: true,
      createdAt: '2024-02-15'
    },
    {
      id: 7,
      name: 'تدريب',
      type: 'expense',
      description: 'دورات وبرامج تدريبية',
      color: '#f97316',
      icon: '📚',
      budget: 8000,
      spent: 3000,
      transactionCount: 3,
      isActive: true,
      createdAt: '2024-03-01'
    },
    {
      id: 8,
      name: 'تسويق',
      type: 'expense',
      description: 'حملات إعلانية وترويجية',
      color: '#ec4899',
      icon: '📢',
      budget: 12000,
      spent: 8500,
      transactionCount: 10,
      isActive: false,
      createdAt: '2024-03-05'
    }
  ])

  const [formData, setFormData] = useState({
    name: '',
    type: 'expense',
    description: '',
    color: '#3b82f6',
    icon: '📁',
    budget: '',
    isActive: true
  })

  // فلترة التصنيفات
  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || category.type === selectedType
    return matchesSearch && matchesType
  })

  // إحصائيات التصنيفات
  const categoryStats = {
    totalCategories: categories.length,
    activeCategories: categories.filter(cat => cat.isActive).length,
    incomeCategories: categories.filter(cat => cat.type === 'income').length,
    expenseCategories: categories.filter(cat => cat.type === 'expense').length,
    totalBudget: categories.reduce((sum, cat) => sum + (cat.budget || 0), 0),
    totalSpent: categories.reduce((sum, cat) => sum + (cat.spent || 0), 0),
    totalTransactions: categories.reduce((sum, cat) => sum + (cat.transactionCount || 0), 0)
  }

  // إضافة تصنيف جديد
  const handleAddCategory = (e) => {
    e.preventDefault()
    const newCategory = {
      id: Math.max(...categories.map(c => c.id)) + 1,
      ...formData,
      budget: parseFloat(formData.budget) || 0,
      spent: 0,
      transactionCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    }
    setCategories([...categories, newCategory])
    resetForm()
  }

  // تعديل تصنيف
  const handleEditCategory = (e) => {
    e.preventDefault()
    setCategories(categories.map(cat => 
      cat.id === editingCategory.id 
        ? { 
            ...cat, 
            ...formData,
            budget: parseFloat(formData.budget) || 0
          }
        : cat
    ))
    resetForm()
  }

  // حذف تصنيف
  const handleDeleteCategory = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا التصنيف؟')) {
      setCategories(categories.filter(cat => cat.id !== id))
    }
  }

  // تفعيل/إلغاء تفعيل تصنيف
  const toggleCategoryStatus = (id) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, isActive: !cat.isActive } : cat
    ))
  }

  // بدء التعديل
  const startEdit = (category) => {
    setFormData({
      name: category.name,
      type: category.type,
      description: category.description,
      color: category.color,
      icon: category.icon,
      budget: category.budget.toString(),
      isActive: category.isActive
    })
    setEditingCategory(category)
    setShowAddModal(true)
  }

  // إعادة تعيين النموذج
  const resetForm = () => {
    setFormData({
      name: '',
      type: 'expense',
      description: '',
      color: '#3b82f6',
      icon: '📁',
      budget: '',
      isActive: true
    })
    setEditingCategory(null)
    setShowAddModal(false)
  }

  // مودال إضافة/تعديل التصنيف
  const CategoryModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              {editingCategory ? 'تعديل التصنيف' : 'إضافة تصنيف جديد'}
            </h3>
            <Button variant="ghost" onClick={resetForm}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <form onSubmit={editingCategory ? handleEditCategory : handleAddCategory} className="space-y-4">
            <div>
              <Label htmlFor="name">اسم التصنيف</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                placeholder="مثال: رواتب، إيجار، عمولات"
              />
            </div>

            <div>
              <Label htmlFor="type">نوع التصنيف</Label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full px-3 py-2 border border-input rounded-md"
              >
                <option value="expense">مصروف</option>
                <option value="income">إيراد</option>
              </select>
            </div>

            <div>
              <Label htmlFor="description">الوصف</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="وصف مختصر للتصنيف"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="color">اللون</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="color"
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                    className="w-16 h-10"
                  />
                  <span className="text-sm text-gray-500">{formData.color}</span>
                </div>
              </div>

              <div>
                <Label htmlFor="icon">الأيقونة</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  placeholder="📁"
                  className="text-center"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="budget">الميزانية المخططة</Label>
              <Input
                id="budget"
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
                placeholder="0"
              />
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                className="rounded"
              />
              <Label htmlFor="isActive">تصنيف نشط</Label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                <Save className="w-4 h-4 ml-2" />
                {editingCategory ? 'حفظ التغييرات' : 'إضافة التصنيف'}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                إلغاء
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6 page-enter">
      {/* العنوان والأدوات */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white gradient-text">إدارة التصنيفات</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            تنظيم وإدارة تصنيفات المعاملات المالية
          </p>
        </div>
        
        <Button onClick={() => setShowAddModal(true)} className="gap-2 btn-primary">
          <Plus className="w-4 h-4" />
          إضافة تصنيف جديد
        </Button>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي التصنيفات</CardTitle>
            <Folder className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {categoryStats.totalCategories}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {categoryStats.activeCategories} نشط
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الميزانية الإجمالية</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(categoryStats.totalBudget)}
            </div>
            <p className="text-xs text-gray-500 mt-1">مخطط للعام</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المستخدم</CardTitle>
            <Target className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(categoryStats.totalSpent)}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {((categoryStats.totalSpent / categoryStats.totalBudget) * 100).toFixed(1)}% من الميزانية
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المعاملات</CardTitle>
            <Activity className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {categoryStats.totalTransactions}
            </div>
            <p className="text-xs text-gray-500 mt-1">معاملة مالية</p>
          </CardContent>
        </Card>
      </div>

      {/* أدوات البحث والفلترة */}
      <Card className="card-hover">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث في التصنيفات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-input rounded-md"
              >
                <option value="all">جميع الأنواع</option>
                <option value="income">الإيرادات</option>
                <option value="expense">المصروفات</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* قائمة التصنيفات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => {
          const budgetPercentage = category.budget > 0 ? (category.spent / category.budget) * 100 : 0
          
          return (
            <Card key={category.id} className={`card-hover transition-all duration-300 ${
              !category.isActive ? 'opacity-60' : ''
            }`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-xl"
                      style={{ backgroundColor: `${category.color}20`, color: category.color }}
                    >
                      {category.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {category.description}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => startEdit(category)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    category.type === 'income' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {category.type === 'income' ? 'إيراد' : 'مصروف'}
                  </span>
                  
                  <button
                    onClick={() => toggleCategoryStatus(category.id)}
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      category.isActive 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {category.isActive ? 'نشط' : 'غير نشط'}
                  </button>
                </div>

                {category.budget > 0 && (
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>الميزانية المستخدمة</span>
                      <span>{budgetPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${Math.min(budgetPercentage, 100)}%`,
                          backgroundColor: budgetPercentage > 90 ? '#ef4444' : 
                                         budgetPercentage > 70 ? '#f59e0b' : '#10b981'
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>{formatCurrency(category.spent)}</span>
                      <span>{formatCurrency(category.budget)}</span>
                    </div>
                  </div>
                )}

                <div className="flex justify-between text-sm text-gray-600">
                  <span>عدد المعاملات:</span>
                  <span className="font-medium">{category.transactionCount}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* المودال */}
      {showAddModal && <CategoryModal />}
    </div>
  )
}

export default CategoriesPage 