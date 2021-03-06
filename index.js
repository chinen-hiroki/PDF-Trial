const express = require('express');
const app = express();
const portForDev = 4000;
const fs = require('fs');
const Pdf = require('html-pdf');
const html = fs.readFileSync('./public/index.html', 'utf8');
const options = { format:'A4'};

app.set('port', process.env.PORT || portForDev);
app.use(express.static('public'));

Pdf.create(html, options).toFile('./public/index.pdf', function(err, res) {
  if (err) return console.log(err);
  console.log(res); // { filename: '/app/businesscard.pdf' }
});

app.use((req, res, next) => {
  res.send('<h1>Completed</h1><p><a href="./public/index.pdf" download="sample.pdf">PDF</a></p>');
});

app.listen(app.get('port')); 