('use strict')

require('dotenv').config()

const request = require('request')
const fs = require('fs')
const https = require('https')
const userInput = process.argv.slice(2)
const owner = userInput[0]
const repo = userInput[1]
const repoUrl = {
 url: 'https://api.github.com/repos/',
 auth: {
  user: process.env.USER,
  pass: process.env.TOKEN
 },
 headers: {
  'User-Agent': 'Lighthouse Labs avatar exercise, via node.js'
 }
}

// download a given image path into /avatars directory
function downloadImageByURL(url, filePath) {
  let dotty = "."
  request.get(url, function(err, response, data){
         if(err){
           throw err
         }
       })
         .pipe(fs.createWriteStream('./avatars/' + filePath))
        console.log('Saved ' + filePath + ' to ./avatars')
      }


// for a given repo, gather each contributor's avatar URL
function getRepoContributors(owner, repo, cb) {
  console.log("\nFetching contributor metadata...")
  repoUrl.url += owner + "/" + repo + "/contributors"
  request.get(repoUrl, function(error, response, body) {
    let repoData = JSON.parse(body)
    repoData.forEach(function(user) {
      let login = user.login
      console.log("\nRetrieving avatar for " + login)
      let filePath = login + '.jpg'
      // send to callback
      cb(user.avatar_url, filePath)
    })
  })
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