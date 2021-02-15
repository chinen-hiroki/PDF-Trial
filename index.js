const express = require('express');
const app = express();
const portForDev = 3000;

app.set('port', process.env.PORT || portForDev);

// Create PDF and upload it to AWS S3
var request = require('request'),
  fs = require("fs");
const { callbackify } = require('util');

// Create PDF and upload it to AWS S3
request.post(
  'https://www.hypdf.com/htmltopdf',
  {
      json: {
          user: '8248aa12-61f1-4a05-9887-e70c7053f710',
          password: 'RGDrn2AOdW9',
          content: '<html><body><h1>Title</h1></body></html>',
          margin_left: '0.5in',
          key: 'some_file_name.pdf',
          public: true,
          callback: "https://pdf-trial.herokuapp.com/"
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