('use strict')

const request = require('request')
const fs = require('fs')
const https = require('https')
const token = require('authData')

let searchData = {
 url: "https://api.github.com/users/"
 auth: {
  user: "micahwkb",
  pass:
 }
}

let userInput = process.argv.slice(2)


// can append searchData as follows:
// searchData += "testy"
// console.log(searchData)

console.log(userInput)

userInput.forEach(function(username) {
  let avatarURL
  searchData += username
  request.get(searchData, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body)
    } else {
      console.log(error)
    }
  })
         .on('response', function(response) {
          console.log('Response Status Code: ', response.statusCode);
          console.log('Response Message: ', response.statusMessage);
          console.log('Content Type: ',response.headers['content-type'], '\n');

         })
})

//variable for avatar.. data.avatar_url