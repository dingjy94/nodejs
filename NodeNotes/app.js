const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOption = {
  describe: 'title of note',
  demand: true,
  alias: 't'
};
const bodyOption = {
  describe: 'note body',
  demand: true,
  alias: 'b'
};
const argvs = yargs
  .command('add', 'Add a new note', {
    title: titleOption, 
    body: bodyOption
  })
  .command('list', 'List all notes')
  .command('remove', 'Remove specific note', {
    title: titleOption
  })
  .command('read', 'Read specific note', {
    title: titleOption
  })
  .help()
  .argv;
const command = argvs._[0];

if (command === 'add') {
    const note = notes.addNote(argvs.title, argvs.body);
    if (note) {
        console.log('Add note');
        notes.logNote(note);
    } else {
        console.log(argvs.title, 'exists');
    }
} else if (command === 'list') {
    const all = notes.getAll();
    all.map(note => notes.logNote(note));
} else if (command === 'remove') {
    const message = notes.removeNote(argvs.title) ? 'Removed' : 'Note not found';
    console.log(message);
} else if (command === 'read') {
    const note = notes.readNote(argvs.title);

    if (note) {
        console.log('Note found');
        notes.logNote(note);
    } else {
        console.log('Note not found');
    }
} else {
    console.log('Wrong command');
}