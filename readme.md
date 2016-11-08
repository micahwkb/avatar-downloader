# GitHub Avatar Downloader

## Problem Statement

Given a GitHub repository name and owner:
1. Fetch URLs for all the contributors' profile avatars
2. Save the images to a subdirectory, `/avatars`.

## Expected Usage

This program should be executed from the command line, in the following manner:

`node download_avatars.js jquery jquery`</br>
--or--</br>
`node download_avatars.js nodejs node`


## givens
- should be run from macOS or Linux terminal
- working directory must contain an `avatars` folder
- uses [dotenv](https://github.com/bkeepers/dotenv) to obscure the github user API
