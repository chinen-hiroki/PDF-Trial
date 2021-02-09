const express = require('express');
const app = express();
const fs = require('fs');
const Pdf = require('html-pdf')
const html = fs.readFileSync('./public/index.html', 'utf8');
const options = { format: 'Letter' };
const portForDev = 4000;

app.set('port', process.env.PORT || portForDev);

Pdf.create(html, options).toFile('./public/index.pdf', function(err, res) {
  if (err) return console.log(err);
  console.log(res); // { filename: '/app/businesscard.pdf' }
});

express.static('public');

app.use((req, res, next) => {
  res.send('<h1>Completed</h1><p><a href="./public/index.pdf" download="sample.pdf">PDF</a></p>');
});

app.listen(app.get('port'));