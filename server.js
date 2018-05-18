require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const multer = require('multer');
const upload = multer({ dest: 'upload/' });
const type = upload.single('file');
const zencoder = require('zencoder')(process.env.zencoderApiKey);
const bucketName = 'marcoabc-video-converter';
const AWS = require('aws-sdk');
AWS.config.update({
  region: 'sa-east-1',
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey
});
const s3 = new AWS.S3();
const fs = require('fs'),
S3FS = require('s3fs'),
s3fsImpl = new S3FS('marcoabc-video-converter/videos/', {
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey
});


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

// Creates a Job in which converts the file into 'videos' folder on S3 to '.mp4' format
// and stores it on 'conversions' folder
const createZencoderJob = function (originalFileName, newFileName) {
  return zencoder.Job.create({
    "input": "s3://marcoabc-video-converter/videos/" + originalFileName,
    "outputs": [
      {
        "url": "https://s3-sa-east-1.amazonaws.com/marcoabc-video-converter/conversions/" + newFileName,
        "label": "conversion",
        "format": "mp4"
      }
    ]
  });
}

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
    const newFileName = file.originalname.split(".")[0] + ".mp4";
    createZencoderJob(file.originalname, newFileName).then((err, data) => {
      res.status(200).end();
    })
  });
};

// Post call for upload file
app.post('/fileUpload', type, uploadFile);

// Lists all videos into 'conversions' folder on S3
app.get('/videosList', (req, res) => {
  const params = { Bucket: bucketName, Prefix: 'conversions/' };
  s3.listObjectsV2(params, (err, data) => {
    data.Contents.shift(); // Remove the folder from the response
    data.Contents.map((video) => {
      video.title = video.Key.replace('conversions/', '');
      video.ETag = video.ETag.replace(/['"]+/g, '');
    });
    res.send(data.Contents);
  });
});

// List video based on it's ETag
app.get('/getVideo', (req, res) => {
  const etag = '"' + req.query.etag + '"';

  s3.listObjectsV2({ Bucket: bucketName, Prefix: 'conversions/' }, (err, data) => {
    const video = data.Contents.filter(vid => vid.ETag === etag)[0];
    const params = { Bucket: bucketName, Key: video.Key };

    s3.getSignedUrl('getObject', params, function (error, url) {
      const title = video.Key.replace('conversions/', '');
      res.send({ url, title });
    });
  });
});