module.exports = {
  apps: [
    {
      name: 'hr-system-backend',
      script: './backend/server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 5001
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5001
      },
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z'
    }
  ]
}; 