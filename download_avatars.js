('use strict')

const request = require('request')
const fs = require('fs')

let searchURL = "curl -u micahwkb:7c689bbe3b1887fc058079596ec3f9a35b8b7e5d https://api.github.com/users/"

// can append searchURL as follows:
// searchURL += "testy"
// console.log(searchURL)

userInput = process.argv.slice(2)
console.log(userInput)

userInput.forEach(username, function() {

})