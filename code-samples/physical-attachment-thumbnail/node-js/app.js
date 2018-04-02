var express = require('express');
var app = express();
var jimp = require('jimp');
var http = require('http');

jimp.read('https://github.com/recurser/exif-orientation-examples/blob/master/Landscape_2.jpg?raw=true')
    .then(function (image) {
        // resize and crop image to 100px by 100px keeping the image centered
        image.cover(100, 100)
            // apply any exif orientation transforms
            .exifRotate() 
            .getBuffer(jimp.AUTO, function(err, buffer) {
                // upload image to third party storage
                var options = {
                    hostname: "qaflashdev.blob.core.windows.net",
                    path: "/blackbauddocumentsvc/tenants/ef7ae0eb-af4b-41db-b9b2-47086cbecaba/documents/eebd1e44-970b-4831-acbb-7733801a5c74/Landscape_2.jpg?sv=2015-12-11&sr=b&sig=X4tUy3MBkJNn0Ld3smV6nn2JKY%2FTK0JtZkGyizthDkA%3D&se=2018-04-02T19:11:59Z&sp=rw",
                    method: "PUT",
                    headers: {
                        "x-ms-blob-type": "BlockBlob",
                        "x-ms-version": "2015-12-11",
                        "Content-Type": "image/jpeg"
                    },
                    body: buffer,
                    encoding: null
                }
                console.log('test');
                http.request(options, function (error, response) {
                    console.log('hi');
                    if (error) {
                        console.log('Error sending message: ', error);
                    } else {
                        console.log('Response: ', response.body);
                    }
                });
            })
}).catch(function (err) {
    console.error(err);
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});