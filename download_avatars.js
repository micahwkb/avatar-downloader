('use strict')

const request = require('request')
const fs = require('fs')
const https = require('https')
const authData = require('./authData')

const userInput = process.argv.slice(2)
const owner = userInput[0]
const repo = userInput[1]

const urlInfo = {
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

let contribPath = "repos/" + owner + "/" + repo + "/contributors"

function getContributors(owner, repo) {
  let contributors = []
  urlInfo.url += contribPath
console.log(urlInfo.url)
  request.get(urlInfo, function(error, response, body) {
    let data = JSON.parse(body)
    data.forEach(function(user) {
    contributors.push(user.login)
    })
    // console.log("Here are the contributors to the " + repo + " repo")
    contributors.forEach(function(login) {
      let url = getAvatarUrl(login)
      console.log(url)
    })
  })
}

getContributors(owner, repo);


function getAvatarUrl (uname) {
  urlInfo.url += "users/" + uname
  console.log(urlInfo.url)
  request.get(urlInfo, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let avatarUrl = JSON.parse(body).avatar_url
      // console.log("Getting avatar from:", avatarUrl)
      return avatarUrl
    } else {
      console.log(error)
    }
  })
         .on('response', function(response) {
            if(response.statusCode == 200) {
              console.log('working...')
            }
         })
}

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