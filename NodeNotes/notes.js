const addNote = (title, body) => {
    console.log('Adding note', title, body);
};

const getAll = () => {
    console.log('Get all');
};

const removeNote = (title) => {
    console.log('Remove', title);
};

const readNote = (title) => {
    console.log('Read', title);
};

module.exports = {
    addNote,
    getAll,
    removeNote,
    readNote
} 