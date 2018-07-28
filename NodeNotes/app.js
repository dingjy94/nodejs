console.log('start');

const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');

let user = os.userInfo();

fs.appendFile('file.txt', `Hello ${user.username}, number is ${notes.addTwoNums(1, 2)}`, function (err) {
    if (err) {
        console.log('error');
    }
});