const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 5001;

// Import routes
const whatsappRoutes = require('./routes/whatsapp');
const logsRoutes = require('./routes/logs');
const transactionsRoutes = require('./routes/transactions');

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3001', 'http://127.0.0.1:3001'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ 
    message: 'HR System Server is running!',
    status: 'active',
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/whatsapp', whatsappRoutes);
app.use('/api/logs', logsRoutes);
app.use('/api/transactions', transactionsRoutes);

// API Routes placeholder
app.get('/api/employees', (req, res) => {
  res.json({ message: 'Employees API endpoint' });
});

app.get('/api/payroll', (req, res) => {
  res.json({ message: 'Payroll API endpoint' });
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 HR System Server Started');
  console.log(`🌐 Server running on port ${PORT}`);
  console.log(`🔗 Test URL: http://localhost:${PORT}/test`);
  console.log(`💚 Health URL: http://localhost:${PORT}/health`);
  console.log('✅ Server is ready!');
}); 