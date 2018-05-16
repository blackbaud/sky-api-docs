var express = require('express');
var app = express();
var jimp = require('jimp');

jimp.read('https://github.com/recurser/exif-orientation-examples/blob/master/Landscape_2.jpg?raw=true')
    .then(function (image) {
        // resize and crop image to 100px by 100px keeping the image centered
        image.cover(100, 100)
            // apply any exif orientation transforms
            .exifRotate() 
            .getBuffer(jimp.MIME_JPEG, function(err, buffer) {
                // make request using info from thumbnail_upload_request with buffer
            })
}).catch(function (err) {
    console.error(err);
});

app.get('/', function (req, res) {
                  res.send(buffer);
                });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});