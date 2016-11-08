('use strict')

const request = require('request')
const fs = require('fs')
const https = require('https')
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

let contribPath = owner + "/" + repo + "/contributors"

function ifVariablesPassed() {
  if (!owner || !repo) {
    console.log("Please input a repository owner and project, in the form:")
    console.log("example: `node download_avatars.js nodejs node`")
  } else {
    getRepoContributors(owner, repo, downloadImageByURL)
  }
}

ifVariablesPassed()

function getRepoContributors(owner, repo, cb) {
  // let contributorAvatarUrls = []
  repoUrl.url += contribPath
  // console.log(repoUrl.url)
  request.get(repoUrl, function(error, response, body) {
    let repoData = JSON.parse(body)
    repoData.forEach(function(user) {
      let login = user.login
      console.log("Retrieving avatar URl for " + login)
      // contributorAvatarUrls.push(user.avatar_url)
      let filePath = user.login + '.jpg'
      cb(user.avatar_url, filePath)
    })
  })
}


function downloadImageByURL(url, filePath) {
  let dotty = "."
  request.get(url, function(err, response, data){
         if(err){
           throw err
         } else if(response.statusCode === 200) {
              console.log('\nDownloaded ' + filePath)
         }
       })
        .on('response', function(response) {
          if (response.statusCode === 200) {
            response.on('data', function(data) {
            })
          }
        })
        .pipe(fs.createWriteStream('./avatars/' + filePath))
        console.log('test')
}
