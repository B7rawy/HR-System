console.log('🚀 Server script starting...'); process.on('uncaughtException', (err) => { console.error('Uncaught Exception:', err); process.exit(1); });
 