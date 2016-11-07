('use strict')

const request = require('request')
const fs = require('fs')
const https = require('https')
const authData = require('./authData')

const userInput = process.argv.slice(2)
const owner = userInput[0]
const repo = userInput[1]

let urlInfo = {
 url: 'https://api.github.com/',
 auth: {
  user: authData.user,
  pass: authData.token
 },
 headers: {
  'User-Agent': 'Lighthouse Labs avatar exercise, via node.js'
 }
}

let contribPath = "repos/" + owner + "/" + repo + "/contributors"


function getContributors(owner, repo) {
  let contributors = []
  urlInfo.url += contribPath
  request.get(urlInfo, function(error, response, body) {
    let data = JSON.parse(body)
    data.forEach(function(user) {
    contributors.push(user.login)

    })
    console.log(contributors)

  })
}

getContributors(owner, repo);


/*
function getUserAvatar (urlInfo, uname) {
  let userPath = "users/" + uname + "/"
  urlInfo.url += userPath
  console.log(urlInfo.url)
  request.get(urlInfo, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let avatarUrl = JSON.parse(body).avatar_url
      console.log("Getting avatar from:", avatarUrl)
    } else {
      console.log(error)
    }
  })
         .on('response', function(response) {
            if(response.statusCode == 200) console.log('working...')
         })
}

getUserAvatar(owner);*/
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