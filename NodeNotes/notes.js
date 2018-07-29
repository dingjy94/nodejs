const fs = require('fs');

const fetchNote = () => {
    try {
        const noteString = fs.readFileSync('note-data.json');
        return JSON.parse(noteString);
    } catch (error) {
        return [];
    }
};

const writeNote = (notes) => {
    fs.writeFileSync('note-data.json', JSON.stringify(notes));
};

const addNote = (title, body) => {
    let notes = fetchNote();
    const note = {
        title,
        body
    };

    const duplicate = notes.filter((note) => note.title === title);

    if (duplicate.length === 0) {
        notes.push(note);
        writeNote(notes);
        return note;
    }
};

const getAll = () => {
    return fetchNote();
};

const removeNote = (title) => {
    let notes = fetchNote();
    const removed = notes.filter((note) => note.title !== title);
    writeNote(removed);

    return notes.length !== removed.length;
};

const readNote = (title) => {
    let notes = fetchNote();
    const target = notes.filter((note) => note.title === title);
    return target[0];
};

const logNote = (note) => {
    //use nodemon to debug
    debugger;
    console.log('----');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

module.exports = {
    addNote,
    getAll,
    removeNote,
    readNote,
    logNote
} 