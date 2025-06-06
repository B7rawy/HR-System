const puppeteer = require('puppeteer');

async function testChrome() {
    console.log('🔍 Testing Chrome configurations...');
    
    const configs = [
        {
            name: 'System Chrome (macOS)',
            options: {
                headless: true,
                executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            }
        },
        {
            name: 'Bundled Chromium',
            options: {
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            }
        }
    ];
    
    for (const config of configs) {
        try {
            console.log(`\n🔄 Testing ${config.name}...`);
            const browser = await puppeteer.launch(config.options);
            const page = await browser.newPage();
            await page.goto('https://example.com');
            const title = await page.title();
            console.log(`✅ ${config.name} works! Page title: ${title}`);
            await browser.close();
            return config;
        } catch (error) {
            console.log(`❌ ${config.name} failed: ${error.message}`);
        }
    }
    
    throw new Error('No working Chrome configuration found');
}

testChrome()
    .then(workingConfig => {
        console.log('\n🎉 Working configuration found:', workingConfig.name);
        process.exit(0);
    })
    .catch(error => {
        console.error('\n💥 All configurations failed:', error.message);
        process.exit(1);
    }); 