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
          user: '8248aa12-61f1-4a05-9887-e70c7053f710',
          password: 'RGDrn2AOdW9',
          content: 'https://bucketeer-c8a7d0b9-76c0-4feb-9eed-a0cca5e04681.s3.amazonaws.com/public/backup/api/v1/banner/key_gaika_otameshiGaika02_w',
          margin_left: '0.5in',
          key: 'some_file_name.pdf',
          bucket: 'mybucketeer',
          callback: 'https://pdf-trial.herokuapp.com/',
          public: true,
          test: true,
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