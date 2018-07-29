const fs = require('fs');

const originalNote = {
    title: 'hello world',
    body: 'hello hello'
};

const originalNoteString = JSON.stringify(originalNote);

fs.writeFileSync('note.json', originalNoteString);

const noteString = fs.readFileSync('note.json');

const note = JSON.parse(noteString);

console.log(typeof note);
console.log(note.body);