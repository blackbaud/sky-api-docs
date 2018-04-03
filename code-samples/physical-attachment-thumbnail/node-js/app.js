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
                    path: "/blackbauddocumentsvc/tenants/946e0397-718a-437a-b7d7-f9b5b273def8/documents/6e3e7c9f-3030-458a-bfb3-f55936f47f0f/Letter1.docx?sv=2015-12-11&sr=b&sig=XO8nzVvuWPT65FT%2B2EquYAAbuEzh%2F%2BfvrreZC0DEN54%3D&se=2018-04-03T17%3A08%3A45Z&sp=rw",
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
                var req = http.request(options, function (response) {
                	if (response.statusCode < 200 || response.statusCode >= 300) {
                    	console.log('Bad response received: ', response.statusCode, response.statusMessage);
                	} else {
                    	console.log('Success! ', response.statusCode, response.statusMessage);
                	}
                });
                req.end();
            })
}).catch(function (err) {
    console.error(err);
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});