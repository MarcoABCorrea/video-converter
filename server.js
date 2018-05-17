const path = require('path');
const express = require('express');
const app = express();
const multer = require('multer');
const PORT = process.env.PORT || 8080;
const client = require('zencoder')('8c230c19ec4535f22cc187e232cdb70e');

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/dist/index.html');
});

app.listen(PORT, error => (
  error
    ? console.error(error)
    : console.info(`Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`)
));


// File Upload
const fs = require('fs'),
  S3FS = require('s3fs'),
  s3fsImpl = new S3FS('marcoabc-video-converter/videos/', {
    accessKeyId: 'AKIAJICSJTQEP5W2UZZA',
    secretAccessKey: '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'
  });




const uploadFile = function (req, res) {
  const file = req.file;
  const stream = fs.createReadStream(file.path);
  return s3fsImpl.writeFile(file.originalname, stream).then(function () {
    fs.unlink(file.path, function (err) {
      if (err) {
        console.error(err);
      }
    });
    // res.status(200).end();
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
    }, function(err, data) {
      if (err) { console.log(err); return; }
    
      console.log(data);

      res.status(200).end();
    });
  });
};


const upload = multer({ dest: 'upload/' });
const type = upload.single('file');

app.post('/fileUpload', type, uploadFile);