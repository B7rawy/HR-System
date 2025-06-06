import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// تنسيق الأرقام بالعربية
export function formatNumber(number) {
  return new Intl.NumberFormat('ar-EG').format(number)
}

// تنسيق العملة
export function formatCurrency(amount, currency = 'EGP') {
  return new Intl.NumberFormat('ar-EG', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0
  }).format(amount)
}

// تنسيق التاريخ بالعربية
export function formatDate(date) {
  return new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
}

// تنسيق التاريخ المختصر
export function formatShortDate(date) {
  return new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date(date))
}

// تحويل النص لأرقام إنجليزية
export function toEnglishDigits(str) {
  const arabicDigits = '٠١٢٣٤٥٦٧٨٩'
  const englishDigits = '0123456789'
  
  return str.replace(/[٠-٩]/g, (match) => {
    return englishDigits[arabicDigits.indexOf(match)]
  })
}

// تحويل النص لأرقام عربية
export function toArabicDigits(str) {
  const arabicDigits = '٠١٢٣٤٥٦٧٨٩'
  const englishDigits = '0123456789'
  
  return str.replace(/[0-9]/g, (match) => {
    return arabicDigits[englishDigits.indexOf(match)]
  })
}

// دالة لحساب الإجمالي
export function calculateTotal(items, field) {
  return items.reduce((total, item) => total + (Number(item[field]) || 0), 0)
}

// دالة للبحث في النصوص العربية
export function searchArabicText(text, searchTerm) {
  if (!text || !searchTerm) return false
  
  const normalizedText = text.toLowerCase().trim()
  const normalizedSearch = searchTerm.toLowerCase().trim()
  
  return normalizedText.includes(normalizedSearch)
} 