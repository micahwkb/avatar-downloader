'use strict'

require('dotenv').config()

const request = require('request')
const mkdirp = require('mkdirp')
const fs = require('fs')
const https = require('https')
const userInput = process.argv.slice(2)
const owner = userInput[0]
const repo = userInput[1]
const repoUrl = {
 url: 'https://api.github.com/repos/',
 auth: {
  user: process.env._USER,
  pass: process.env._TOKEN
 },
 headers: {
  'User-Agent': 'Lighthouse Labs avatar exercise, via node.js'
 }
}

// download a given image path into /avatars directory
function downloadImageByURL(url, filePath) {
  request.get(url, function(err, response, data) {
    if(err){
      throw err
    }
  })
         .pipe(fs.createWriteStream(`./avatars/${filePath}`))
        console.log(`Saved ${filePath} to ./avatars`)
}

// .env file issue messages
function missingEnv() {
  console.log("\nTOKEN=\(your github token\)")
  console.log("USER=\(your git username\)\n")
  console.log("see https://github.com/bkeepers/dotenv\n")
}


// for a given repo, gather each contributor's avatar URL
function getRepoContributors(owner, repo, cb) {
  console.log("\nFetching contributor metadata...")
  repoUrl.url += `${owner}/${repo}/contributors`
  request.get(repoUrl, function(error, response, body) {
    if(error){
           throw error
         }
    let repoData = JSON.parse(body)
    repoData.forEach(function(user) {
      let login = user.login
      console.log(`\nRetrieving avatar for ${login}`)
      let filePath = login + '.jpg'
      // send to callback
      cb(user.avatar_url, filePath)
    })
  })
         // handles bad .env credentials
         .on('response', function(response) {
           if(response.statusCode === 401) {
             console.log("\n\nIs your github token correct? Please check .env file:")
             missingEnv()
           }
         })
}

// test for missing .env file
try {
  fs.statSync(".env")
}
catch (e) {
  fs.writeFile(".env")
  console.log("\n=== dotenv not configured! ===")
  console.log("Created .env, please add lines:")
  missingEnv()
}

// test for missing avatars folder
try {
  fs.statSync("./avatars")
}
catch (e) {
  console.log("\nCreated 'avatars' directory")
  mkdirp('./avatars')
}


// check for complete input at command-line
function runConditionsMet(owner, repo, input, url, callback) {
  const urlPass = url.auth.pass
  const exampleMessage = "example: `node download_avatars.js nodejs node`"
  if (!owner || !repo) {
    console.log("\nUsage: input a repository owner and project, in the form:")
    console.log(exampleMessage)
  } else if (urlPass === undefined) {
    console.log("It looks like your .env file is missing data, please check:")
    missingEnv()
  } else if (input.length > 2) {
    console.log("Too many arguments given!")
    console.log(exampleMessage)
  } else {
    getRepoContributors(owner, repo, callback)
  }
}

// call test function immediately
runConditionsMet(owner, repo, userInput, repoUrl, downloadImageByURL)