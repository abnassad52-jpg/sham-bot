const express = require('express');
const app = express();
app.use(express.json());

let operations = [];

// البوت رح يستقبل العملية بهاد الشكل
// مثال: { name: "احمد", opNumber: "#1234567890", amount: "+5000" }

app.post('/sham', (req, res) => {
  let text = req.body.text || "";

  // بيدور على رقم العملية 10 ارقام
  let opMatch = text.match(/#\d{10}/);
  let amountMatch = text.match(/\+\s?(\d+)/);
  let nameMatch = text.split('\n')[0];

  if(opMatch){
    let data = {
      sender: nameMatch,
      operation: opMatch[0],
      amount: amountMatch? amountMatch[0] : "مبلغ جديد",
      date: new Date().toLocaleString('ar-SY')
    };
    operations.push(data);
    console.log("عملية جديدة مسكت:", data);

    // هون رح نضيف ارسال واتساب بعدين
  }
  res.json({ok: true, found:!!opMatch});
});

app.get('/', (req, res) => {
  res.send(`
  <h2>بوت شام كاش شغال ✅</h2>
  <p>آخر العمليات: ${operations.length}</p>
  <pre>${JSON.stringify(operations.slice(-10), null, 2)}</pre>
  <p>رقم العملية المطلوب: # + 10 أرقام</p>
  `);
});

app.listen(10000, () => console.log('Bot Live'));
