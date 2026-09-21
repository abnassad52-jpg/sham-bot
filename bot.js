const puppeteer = require('puppeteer');

console.log("Bot started - ShamCash Checker");

async function check() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  try {
    await page.goto('https://app.shamcash.com/login', {waitUntil: 'networkidle2'});
    console.log("Opened ShamCash login page");
    // رح نكمل الكود بعد ما تجيب سكرين للعمليات
  } catch(e){ console.log(e.message); }
  await browser.close();
}
check();
setInterval(check, 60000);