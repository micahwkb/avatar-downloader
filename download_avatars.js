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

const userURL = {
 url: 'https://api.github.com/',
 auth: {
  user: authData.user,
  pass: authData.token
 },
 headers: {
  'User-Agent': 'Lighthouse Labs avatar exercise, via node.js'
 }
}


// if (owner == 'undefined' || repo == 'undefined') {
//   console.log("Please provide the repo owner and project, in the form `node download_avatars.js foo bar`")
// }

let contribPath = owner + "/" + repo + "/contributors"

function getRepoContributors(owner, repo, cb) {
  let contributorAvatarUrls = []
  repoUrl.url += contribPath
  // console.log(repoUrl.url)
  request.get(repoUrl, function(error, response, body) {
    let repoData = JSON.parse(body)
    repoData.forEach(function(user) {
      console.log("Retrieving avatar URl for " + user.login)
      contributorAvatarUrls.push(user.avatar_url)
    })
    contributorAvatarUrls.forEach(function(url) {
      cb(url)
    })
  })
}

getRepoContributors(owner, repo)

const urlArray = []

// function getAvatarUrl (uname) {
//   userURL.url += "users/" + uname
//   request.get(userURL, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       let avatarUrl = JSON.parse(body).avatar_url
//       console.log("Getting avatar from:", avatarUrl)
//       urlArray.push(avatarUrl)
//       console.log(urlArray)
//     } else {
//       console.log(error)
//     }
//   })
//          .on('response', function(response) {
//             if(response.statusCode == 200) {
//             }
//          })
// }

// getAvatarUrl("telitos");
//
// userInput.forEach(function(username) {
// })


// works - outputs to stdout a given user's avatar_url

// userInput.forEach(function(username) {
//   searchData.url = searchData.url + username
//   request.get(searchData, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       avatarUrl = JSON.parse(body).avatar_url
//       console.log(avatarUrl)
//     } else {
//       console.log(error)
//     }
//   })
//          .on('response', function(response) {
//             if(response.statusCode == 200) console.log('working...')

//          })
// })

//variable for avatar.. data.avatar_url