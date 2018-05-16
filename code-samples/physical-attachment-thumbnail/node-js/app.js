var express = require('express');
var app = express();
var jimp = require('jimp');
var request = require('request');

// this is the authorization token and subscription key to use for the request. This normally wouldn't be hard coded but
// is in this case for brevity.
var jwt = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1laWQiOiJTS1kiLCJ0ZW5hbnRpZCI6IkFQSSIsImFwcGxpY2F0aW9uaWQiOiJJUyIsImVudmlyb25tZW50aWQiOiJUSEUiLCJlbnZpcm9ubWVudG5hbWUiOiJCRVNUIiwibGVnYWxlbnRpdHlpZCI6Ik5PIiwibGVnYWxlbnRpdHluYW1lIjoiU0VDUkVUUyIsIlBvZElkIjoiRk9SIiwiaXNzIjoiWU9VIiwiYXVkIjoiISIsImV4cCI6MTUyNjQ5NzExOCwibmJmIjoxNTI2NDkyMzI4LCJqdGkiOiI4YWJiYmQ0MS1jN2Q1LTQ5YWQtYjliMS1jZjgzZmRkMDE0NWMiLCJpYXQiOjE1MjY0OTM1MTh9.tXIgdFN5tPLK7z29OO1OM5rzW0B8K42yrALjdpKCNK4";
var subscriptionKey = "secret_key";
var createDocumentResponse;

var options = {
    uri: "https://api.sky.blackbaud.com/constituent/v1/documents",
    method: "POST",
    headers: {
        "Authorization": jwt,
        "bb-api-subscription-key": subscriptionKey,
    },
    body: {
        "file_name": "businesscard.jpg",
        "upload_thumbnail": true
    },
    json: true
}

request(options, function(err, res, body) {
    if (err) {
        console.log(err);
    } else {
        createDocumentResponse = res;
    }
});

jimp.read('https://github.com/recurser/exif-orientation-examples/blob/master/Landscape_2.jpg?raw=true')
    .then(function (image) {
        // resize and crop image to 100px by 100px keeping the image centered
        image.cover(100, 100)
            // apply any exif orientation transforms
            .exifRotate() 
            .getBuffer(jimp.MIME_JPEG, function(err, buffer) {
                // make request using info from thumbnail_upload_request with buffer

                if (createDocumentResponse || createDocumentResponse.body || createDocumentResponse.body.thumbnail_upload_request) {
                    var thumbnailReqInfo = createDocumentResponse.body.thumbnail_upload_request;

                    // build headers
                    var headers = {};
                    for (var header of thumbnailReqInfo.headers) {
                        headers[header['name']] = header["value"]
                    }

                    var options = {
                        uri: thumbnailReqInfo.url,
                        headers: headers,
                        method: thumbnailReqInfo.method,
                        body: buffer                    
                    }
                    request(options, function(err, res, body) {
                        if (err) {
                            console.log(err);
                        } else {
                            // request is successful and the thumbnail has been uploaded
                            console.log(JSON.stringify(res, null, 2));  
                        }
                    });
                }
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