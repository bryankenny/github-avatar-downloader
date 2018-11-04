const request = require('request');
const token = require('./secrets.js');
const fs = require('fs');


const owner = process.argv[2];  //argv 2/3 because 0 and 1 are arguments to the shell itself. further elements are arguments to the command line
const repo = process.argv[3];


function getRepoContributors(repoOwner, repoName, cb) {
  if (!owner || !repo) {
    console.log("Invalid request. Please submit the username of the Github owner first, and the name of the repo second")
  }
  else {
    var options = {
      url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
      headers: {
        'User-Agent': 'request',
        'Authorization': token                    //cb = callback function to work with results of JSON parse
      }
    };

    request(options, function(err, res, body) {
      var jsonObject = JSON.parse(body);
      cb(err, jsonObject);
    });
  }
}



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


getRepoContributors(owner, repo, function(err, result) {
  for (var i = 0; i < result.length; i++) {
    var downloadPath = './avatars/' + result[i].login + '.jpg';  //loop through results and index the avatar_url and login data
    var avatarURL = result[i].avatar_url
    downloadImageByURL(avatarURL, downloadPath);  // call the image download function and url and download path as arguments
  }
});




