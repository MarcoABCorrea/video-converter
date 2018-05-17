# Video Convert Project

This project is using, among other technologies:

React, Node, Zencoder, Amazon S3.

## Live version

https://marcoabc-video-converter.herokuapp.com/

## UP & RUNNING
Install dependencies:
```
$ npm install
```
run it locally
```
$ npm start
```

Once the server is running, you can visit `http://localhost:8080/`

## Observations

In order to run it locally, you'll need to create a `.env` file on project root with the Amazon S3 credentials, like the following:

```
accessKeyId=XXXX
secretAccessKey=XXXX
```