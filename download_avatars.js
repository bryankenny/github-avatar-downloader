var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

 function getRepoContributors(repoOwner, repoName, cb) {
   var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'a2bc378f06ff457da65f221ab57ee0068b041bac'
    }
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
}