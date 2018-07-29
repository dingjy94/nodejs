console.log('start');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argvs = yargs.argv;
const command = argvs._[0];
console.log(argvs);

if (command === 'add') {
    notes.addNote(argvs.title, argvs.body);
} else if (command === 'list') {
    notes.getAll();
} else if (command === 'remove') {
    notes.removeNote(argvs.title);
} else if (command === 'read') {
    notes.readNote(argvs.title);
} else {
    console.log('Wrong command');
}