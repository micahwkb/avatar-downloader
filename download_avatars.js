('use strict')

const request = require('request')
const fs = require('fs')
const https = require('https')
// similar to .env but laid out per Rafa's suggestion
const authData = require('./authData')
const userInput = process.argv.slice(2)
const owner = userInput[0]
const repo = userInput[1]
const repoUrl = {
 url: 'https://api.github.com/repos/',
 auth: {
  user: authData.user,
  pass: authData.token
 },
 headers: {
  'User-Agent': 'Lighthouse Labs avatar exercise, via node.js'
 }
}


// check for complete input at command-line
function ifVariablesPassed() {
  if (!owner || !repo) {
    console.log("Please input a repository owner and project, in the form:")
    console.log("example: `node download_avatars.js nodejs node`")
  } else {
    getRepoContributors(owner, repo, downloadImageByURL)
  }
}

// call conditional immediately
ifVariablesPassed()

// for a given repo, gather each contributor's avatar URL
function getRepoContributors(owner, repo, cb) {
  repoUrl.url += owner + "/" + repo + "/contributors"
  request.get(repoUrl, function(error, response, body) {
    let repoData = JSON.parse(body)
    repoData.forEach(function(user) {
      let login = user.login
      console.log("\nRetrieving avatar URl for " + login)
      let filePath = login + '.jpg'
      // send to callback
      cb(user.avatar_url, filePath)
    })
  })
}

// download a given image path into /avatars directory
function downloadImageByURL(url, filePath) {
  let dotty = "."
  request.get(url, function(err, response, data){
         if(err){
           throw err
         } else if(response.statusCode === 200) {

         }
       })
        .on('response', function(response) {
          if (response.statusCode === 200) {
            response.on('data', function(data) {
            })
          }
        })
        .pipe(fs.createWriteStream('./avatars/' + filePath))
        console.log('Saved ' + filePath + ' to "avatars" folder')
      }
