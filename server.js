require('dotenv').config()
const path = require('path');
const express = require('express');
const app = express();
const multer = require('multer');
const PORT = process.env.PORT || 8080;
const client = require('zencoder')('8c230c19ec4535f22cc187e232cdb70e');


app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/dist/index.html');
});

app.listen(PORT, error => (
  error
    ? console.error(error)
    : console.info(`Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`)
));

const fs = require('fs'),
  S3FS = require('s3fs'),
  s3fsImpl = new S3FS('marcoabc-video-converter/videos/', {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
  });

// Sends the original file to S3 and triggers the Zencoder Job
const uploadFile = function (req, res) {
  const file = req.file;
  const stream = fs.createReadStream(file.path);
  return s3fsImpl.writeFile(file.originalname, stream).then(function () {
    fs.unlink(file.path, function (err) {
      if (err) {
        console.error(err);
      }
    });
    const fileNameExt = file.originalname.split(".")[0] + ".mp4";
    client.Job.create({
      "input": "s3://marcoabc-video-converter/videos/" + file.originalname,
      "outputs": [
        {
          "url": "https://s3-sa-east-1.amazonaws.com/marcoabc-video-converter/conversions/" + fileNameExt,
          "label": "conversion",
          "format": "mp4"
        }
      ]
    }, function (err, data) {
      if (err) { console.log(err); return; }
      res.status(200).end();
    });
  });
};

/** Upload */
const upload = multer({ dest: 'upload/' });
const type = upload.single('file');
app.post('/fileUpload', type, uploadFile);




var AWS = require('aws-sdk');
AWS.config.update({
  region: 'sa-east-1',
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey
});
var s3 = new AWS.S3();

// Lists all videos into 'conversions' folder on S3
app.get('/videosList', (req, res) => {
  s3.listObjectsV2({ Bucket: 'marcoabc-video-converter', Prefix: 'conversions/'}, (err, data) => {
    data.Contents.shift(); // Remove the folder from the response
    data.Contents.map((video) => {
      video.title = video.Key.replace("conversions/", "");
      video.ETag = video.ETag.replace(/['"]+/g, '');
    });
    res.send(data.Contents);
  });
});

// Lists video
app.get('/getVideo', (req, res) => {
  let key = 'conversions/1504106168.mp4';
  s3.getObject({ Bucket: 'marcoabc-video-converter', Prefix: 'conversions/', key: key}, (err, data) => {
    res.send(data.Contents);
  });
});