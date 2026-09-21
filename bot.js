const express = require('express');
const https = require('https');
const app = express();
app.use(express.json());

let ops = [];

const MY_PHONE = "18783224473";
const API_KEY = "9540693";

app.post('/sham', (req, res) => {
  const text = req.body.text || "";
  const opNum = text.match(/#\d{10}/);
  if(!opNum) return res.json({ok:false, reason:"no 10 digit op"});

  const amount = text.match(/\+\s?[\d,]+/)?.[0] || "مبلغ";
  const name = text.split('\n')[0] || "زبون";

  const msg = `💰 عملية شام كاش\n👤 ${name}\n🔢 ${opNum[0]}\n💵 ${amount}`;

  ops.push(msg);
  console.log(msg);

  // يبعتلك واتساب
  const url = `https://api.callmebot.com/whatsapp.php?phone=${MY_PHONE}&text=${encodeURIComponent(msg)}&apikey=${API_KEY}`;
  https.get(url, (r)=> console.log("WhatsApp sent:", r.statusCode));

  res.json({ok:true});
});

app.get('/', (req,res)=> res.send(`<h2>✅ البوت شغال</h2><p>آخر ${ops.length} عمليات</p><pre>${ops.slice(-10).join('\n\n')}</pre>`));

app.listen(10000, () => console.log('Live'));
