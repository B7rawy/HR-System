import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { NotificationProvider } from './components/NotificationSystem'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import TransactionsPage from './pages/TransactionsPage'
import ApprovalsPage from './pages/ApprovalsPage'
import EmployeesPage from './pages/EmployeesPage'
import PayrollPage from './pages/PayrollPage'
import CategoriesPage from './pages/CategoriesPage'
import MePage from './pages/MePage'
import EmployeesListPage from './pages/EmployeesListPage'
import EmployeeDetailsPage from './pages/EmployeeDetailsPage'
import WhatsAppDashboard from './pages/WhatsAppDashboard'
import WhatsAppConnectionPage from './pages/WhatsAppConnectionPage'
import SettingsPage from './pages/SettingsPage'
import SystemLogsPage from './pages/SystemLogsPage'
import './index.css'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  if (loading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">جاري التحميل...</p>
          </div>
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <NotificationProvider>
        <Router>
        <Routes>
          {/* صفحة تسجيل الدخول */}
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to={user.role === 'admin' ? '/' : '/me'} replace />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />

          {/* الصفحة الرئيسية */}
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : user.role === 'admin' ? (
                <Layout user={user} onLogout={handleLogout}>
                  <DashboardPage />
                </Layout>
              ) : (
                <Navigate to="/me" replace />
              )
            }
          />

          {/* المعاملات المالية */}
          <Route
            path="/transactions"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : user.role === 'admin' ? (
                <Layout user={user} onLogout={handleLogout}>
                  <TransactionsPage />
                </Layout>
              ) : (
                <Navigate to="/me" replace />
              )
            }
          />

          {/* موافقات المعاملات المالية */}
          <Route
            path="/approvals"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : user.role === 'admin' ? (
                <Layout user={user} onLogout={handleLogout}>
                  <ApprovalsPage />
                </Layout>
              ) : (
                <Navigate to="/me" replace />
              )
            }
          />

          {/* الموظفين */}
          <Route
            path="/employees"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : user.role === 'admin' ? (
                <Layout user={user} onLogout={handleLogout}>
                  <EmployeesPage />
                </Layout>
              ) : (
                <Navigate to="/me" replace />
              )
            }
          />

          {/* الرواتب */}
          <Route
            path="/payroll"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : user.role === 'admin' ? (
                <Layout user={user} onLogout={handleLogout}>
                  <PayrollPage />
                </Layout>
              ) : (
                <Navigate to="/me" replace />
              )
            }
          />

          {/* التصنيفات */}
          <Route
            path="/categories"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : user.role === 'admin' ? (
                <Layout user={user} onLogout={handleLogout}>
                  <CategoriesPage />
                </Layout>
              ) : (
                <Navigate to="/me" replace />
              )
            }
          />

          {/* لوحة تحكم الواتساب */}
          <Route
            path="/whatsapp"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : user.role === 'admin' ? (
                <Layout user={user} onLogout={handleLogout}>
                  <WhatsAppDashboard />
                </Layout>
              ) : (
                <Navigate to="/me" replace />
              )
            }
          />

          {/* صفحة ربط WhatsApp */}
          <Route
            path="/whatsapp/connect"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : user.role === 'admin' ? (
                <WhatsAppConnectionPage />
              ) : (
                <Navigate to="/me" replace />
              )
            }
          />

          {/* الإعدادات */}
          <Route
            path="/settings"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : user.role === 'admin' ? (
                <Layout user={user} onLogout={handleLogout}>
                  <SettingsPage />
                </Layout>
              ) : (
                <Navigate to="/me" replace />
              )
            }
          />

          {/* سجل النظام */}
          <Route
            path="/system-logs"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : user.role === 'admin' ? (
                <Layout user={user} onLogout={handleLogout}>
                  <SystemLogsPage />
                </Layout>
              ) : (
                <Navigate to="/me" replace />
              )
            }
          />



          {/* صفحة الموظف الشخصية */}
          <Route
            path="/me"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Layout user={user} onLogout={handleLogout}>
                  <MePage user={user} />
                </Layout>
              )
            }
          />

          {/* قائمة الموظفين */}
          <Route
            path="/employees-list"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Layout user={user} onLogout={handleLogout}>
                  <EmployeesListPage />
                </Layout>
              )
            }
          />
          
          <Route
            path="/employee/:id"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Layout user={user} onLogout={handleLogout}>
                  <EmployeeDetailsPage />
                </Layout>
              )
            }
          />

          {/* صفحة 404 */}
          <Route
            path="*"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Layout user={user} onLogout={handleLogout}>
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">404 - الصفحة غير موجودة</h2>
                    <p className="text-gray-600 dark:text-gray-300">عذراً، الصفحة التي تبحث عنها غير موجودة.</p>
                  </div>
                </Layout>
              )
            }
          />
        </Routes>
      </Router>
      </NotificationProvider>
    </ThemeProvider>
  )
}

export default App 