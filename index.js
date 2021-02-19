const express = require('express');
const app = express();
var request = require('request'),
  fs = require("fs");
const portForDev = 3000;

app.set('port', process.env.PORT || portForDev);
app.use(express.static('public'));

// Create PDF and upload it to AWS S3
request.post(
  'https://www.hypdf.com/htmltopdf',
  {
      json: {
          user: process.env.HYPDF_USER,
          password: process.env.HYPDF_PASSWORD,
          content: process.env.HTML_PASS,
          key: 'some_file_name.pdf',
          bucket: 'mybucketeer',
          callback: 'https://pdf-trial.herokuapp.com/',
          public: true,
          test: process.env.TEST_MODE,
          page_size: 'A4',
      }
  },
  function (error, response, body) {
      if (!error && response.statusCode == 200) {
          console.log('Public URL: ', body.url);
          console.log('Number of pages: ', response.headers['hypdf-pages']);
      }
  }
);

app.listen(app.get('port'));