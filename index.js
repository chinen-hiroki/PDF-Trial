var fs = require('fs')
var Pdf = require('html-pdf')
var html = fs.readFileSync('./test/index.html', 'utf8');
var options = { format: 'Letter' };

Pdf.create(html, options).toFile('./index.pdf', function(err, res) {
  if (err) return console.log(err);
  console.log(res); // { filename: '/app/businesscard.pdf' }
});
