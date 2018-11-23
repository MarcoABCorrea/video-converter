# Video Convert Project

This project allows to updload a video to Amazon server and convert it using zencoder.

## Stack & Components

This project is using, among other technologies:

React, Node, Zencoder, Amazon S3.

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

In order to run it locally, you'll need to create a `.env` file on project root with Amazon S3 and Zencoder credentials, like the following:

```
accessKeyId=XXXX
secretAccessKey=XXXX
zencoderApiKey=XXXX
```
