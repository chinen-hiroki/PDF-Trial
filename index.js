const express = require('express');
const app = express();
const fs = require('fs');
var request = require('request');
const Pdf = require('html-pdf');
const html = fs.readFileSync('./public/index.html', 'utf8');
const options = { format: 'Letter' };
const portForDev = 3000;

app.set('port', process.env.PORT || portForDev);

Pdf.create(html, options).toFile('./public/index.pdf', function(err, res) {
  if (err) return console.log(err);
  console.log(res);
});

app.use(express.static('public'));

// Create PDF and upload it to AWS S3
var options2 = {
  url: 'https://www.hypdf.com/htmltopdf',
  headers: {
    "content-type": "application/json",
  },
  json: {
    user: 'HYPDF_USER',
    password: 'HYPDF_PASSWORD',
    content: '<html><body><h1>Title</h1></body></html>',
    margin_left: '0.5in',
    grayscale: true,
    bucket: 'YOUR_BUCKET_NAME',
    key: 'some_file_name.pdf',
    public: true
  }
};
request(options2,
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            console.log('Public URL: ', body.url);
            console.log('Number of pages: ', response.headers['hypdf-pages']);
        }
    }
);

app.listen(app.get('port'));