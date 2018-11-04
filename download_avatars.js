var request = require('request');
var token = require('./secrets.js');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'request',
      'Authorization': token
    }
  };

    request(options, function(err, res, body) {
    var jsonObject = JSON.parse(body);
    cb(err, jsonObject);
  });
}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors: ", err);
  console.log("Result: ", result);
  for (var i = 0; i < result.length; i++) {
    console.log(result[i].avatar_url)
    console.log(result[i].login)
  }
});


function downloadImageByURL(url, filePath) {
  request.get(url)

         .on('error', function (err) {
           throw err;
           console.log("Error")
         })

         .on('response', function (response) {
         console.log('Response Status Code: ', response.statusCode);
         })

         .on('end', function () {
          console.log("Image Successfuly Downloaded")
         })

         .pipe(fs.createWriteStream("./" + "filePath"));

};



