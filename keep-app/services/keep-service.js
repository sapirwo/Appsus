import Utils from '../../services/utils-service.js'

export default {
    query,
    getById,
    getEmpty,
    save,
    update,
    remove,
    updateBgc,
    pinNote,
    updateUrl,
    updateTitle,
    removeTodo,
    isTodoDoneToggle,
    addTodo,
    editTodoTxt
};

var notes = [
    { id: 'n101', type: 'NoteText', isPinned: true, info: { txt: 'Fullstack Me Baby!', doneAt: 187111112 }, style: { backgroundColor: 'rgb(233, 233, 140)' } },
    { id: 'n102', type: 'NoteImg', isPinned: false, info: { url: 'https://www.freshpaint.co.il/sites/default/files/styles/large_gallery/public/artists/glryh_myqh_4.jpg?itok=eslqEupI', title: 'Who\'s the artist?!' }, style: { backgroundColor: 'rgb(250,240,253)' } },
    { id: 'n103', type: 'NoteVideo', isPinned: false, info: { url: 'https://www.youtube.com/embed/yb9DM9Tf5fo', title: 'The best composer ❤️' }, style: { backgroundColor: 'lightpink' } },
    { id: 'n105', type: 'NoteAudio', isPinned: false, info: { url: 'https://open.spotify.com/embed/artist/3YcBF2ttyueytpXtEzn1Za', title: 'Listen for good mood' }, style: { backgroundColor: 'rgb(220,204,255)' } },
    { id: 'n106', type: 'NoteImg', isPinned: false, info: { url: 'https://cdn.cnn.com/cnnnext/dam/assets/190508160346-most-beautiful-places-in-austria---hallstatt.jpg', title: 'I wanna be there now!!' }, style: { backgroundColor: 'rgb(237,227,227)' } },
    { id: 'n104', type: 'NoteText', isPinned: true, info: { txt: 'DO MORE SPORT!', doneAt: 187111112 }, style: { backgroundColor: 'rgb(233, 233, 140)' } },
    { id: 'n107', type: 'NoteTodos', isPinned: false, info: { label: 'Todos', todos: [{ txt: 'Play piano', doneAt: null, id: 't100', isDone: false }, { txt: 'Learn React', doneAt: 187111111, id: 't101', isDone: false }] }, style: { backgroundColor: 'lightskyblue' } },
    { id: 'n108', type: 'NoteVideo', isPinned: false, info: { url: 'https://www.youtube.com/embed/c_dG_HxHMVI', title: 'Music for friday afternoon' }, style: { backgroundColor: 'white' } },
    { id: 'n109', type: 'NoteAudio', isPinned: false, info: { url: 'https://open.spotify.com/embed/playlist/37i9dQZEVXbfQ1cuNDKcHS', title: 'My favorite playlist' }, style: { backgroundColor: 'rgb(238,89,89)' } },
    { id: 'n110', type: 'NoteAudio', isPinned: false, info: { url: 'https://open.spotify.com/embed/playlist/37i9dQZF1E38QmSnKdU0eW', title: 'I Like that one!' }, style: { backgroundColor: 'rgb(220,204,255)' } },
    { id: 'n111', type: 'NoteTodos', isPinned: false, info: { label: 'Must be done', todos: [{ txt: 'Final Delivery', doneAt: null, id: 't100', isDone: false }, { txt: 'Final Final Delivery', doneAt: 187111111, id: 't101', isDone: false }] }, style: { backgroundColor: 'rgb(249,231,164)' } }
];

window.theNotes = notes;

function query() {
    return Promise.resolve(notes);
};


function getEmpty(noteType) {
    var emptyNote;
    switch (noteType) {
        case 'NoteText':
            emptyNote = getEmptyNoteTxt()
            break;
        case 'NoteImg':
            emptyNote = getEmptyNoteImg()
            break;
        case 'NoteTodos':
            emptyNote = getEmptyNoteTodos()
            break;
        case 'NoteVideo':
            emptyNote = getEmptyNoteVideo()
            break;
        case 'NoteAudio':
            emptyNote = getEmptyNoteAudio()
            break;
    }
    return emptyNote;
}

// ===============GET EMPTY================//

function getEmptyNoteTxt() {
    return {
        id: '', type: "NoteText",
        isPinned: false,
        info: { txt: '', doneAt: 187111112 },
        style: { backgroundColor: "rgb(233, 233, 140)" }
    }
}

function getEmptyNoteImg() {
    return {
        id: 'n102', type: 'NoteImg',
        isPinned: false,
        info: {
            url: '',
            title: 'My Photo'
        }, style: { backgroundColor: 'rgb(233, 233, 140)' }
    }
}

function getEmptyNoteVideo() {
    return {
        id: 'n104', type: 'NoteVideo',
        isPinned: false,
        info: {
            url: '',
            title: 'My Video'
        },
        style: { backgroundColor: 'rgb(233, 233, 140)' }
    }
}

function getEmptyNoteAudio() {
    return {
        id: '',
        type: 'NoteAudio',
        isPinned: false,
        info: {
            url: '',
            title: 'My Musik'
        },
        style: { backgroundColor: 'rgb(220,204,255)' }
    }
}

function getEmptyNoteTodos() {
    return {
        id: 'n103', type: 'NoteTodos',
        isPinned: false,
        info: {
            label: 'Todo:',
            todos: [{ txt: 'Click to change me', doneAt: null }]
        }, style: { backgroundColor: 'rgb(233, 233, 140)' }
    }
}

function getEmptyTodo() {
    return { txt: 'Click to edit me', doneAt: Date.now(), id: Utils.makeId(), isDone: false }
}

// ===============SAVING================//

function save(noteType, noteContent) {
    var note = getEmpty(noteType)
    switch (noteType) {
        case 'NoteText':
            note.info.txt = noteContent
            break;
        case 'NoteImg':
            note.info.url = noteContent
            break;
        case 'NoteVideo':
            saveNoteVideo(note, noteContent)
            return
        case 'NoteAudio':
            saveNoteAudio(note, noteContent)
            return
        case 'NoteTodos':
            note.info.label = noteContent
            break;

    }
    const noteToAdd = {
        ...note,
        id: Utils.makeId()
    }
    notes.push(noteToAdd)
}


function saveNoteVideo(noteToAdd, newUrl) {
    if (newUrl.indexOf('youtube') === -1) swal('URL is not supported')
    else {
        let newNote = {
            ...noteToAdd,
            id: Utils.makeId()
        }
        const youtubeUrl = 'https://www.youtube.com/embed/' + formatYoutubeLink(newUrl)
        newNote.info.url = youtubeUrl
        notes.push(newNote)
    }
}

function saveNoteAudio(noteToAdd, newUrl) {
    const arrangedUrl = newUrl.split(':')
    if ((newUrl.indexOf('spotify') === -1)
        || (arrangedUrl.length !== 3)
        || (arrangedUrl[0] !== 'spotify')) {
        return swal('Sorry, Spotify Url is not correct. Spotify URL should looks like that: "spotify:album:songID". For more information: google "how to get sportify URL"')
    } else {
        const musicType = arrangedUrl[1]
        const musicId = arrangedUrl[2]
        let newNote = {
            ...noteToAdd,
            id: Utils.makeId()
        }
        const spotifyUr = `https://open.spotify.com/embed/${musicType}/${musicId}`
        newNote.info.url = spotifyUr
        notes.push(newNote)
    }
}

function addTodo(noteId) {
    const noteIdx = notes.findIndex((note) => note.id === noteId)
    const newTodo = getEmptyTodo()
    notes[noteIdx].info.todos.push(newTodo)
}

// ===============UPDATE AND EDITING================//

function update(noteToUpdate) {
    notes = notes.map(note => note.id === noteToUpdate.id ?
        noteToUpdate : note)
    notes.push(noteToUpdate)
}

function updateBgc(noteId, color) {
    const noteIdx = notes.findIndex(note => note.id === noteId)
    notes[noteIdx].style.backgroundColor = color
}


function updateTitle(noteId, newTitle, noteType) {
    const noteIdx = notes.findIndex(note => note.id === noteId)
    switch (noteType) {
        case 'NoteImg':
            notes[noteIdx].info.title = newTitle
            break;
        case 'NoteTodos':
            notes[noteIdx].info.label = newTitle
            break;
        case 'NoteVideo':
            notes[noteIdx].info.title = newTitle
            break;
        case 'NoteAudio':
            notes[noteIdx].info.title = newTitle
            break;
    }
}

function updateUrl(noteId, newUrl) {
    const noteIdx = notes.findIndex(note => note.id === noteId)
    switch (notes[noteIdx].type) {
        case 'NoteVideo': updateVideoUrl(noteIdx, newUrl)
            break
        case 'NoteAudio': updateAudioUrl(noteIdx, newUrl)
            break
        case 'NoteImg':
            notes[noteIdx].info.url = newUrl
            swal('Image URL updated!')
            break
    }
}

function updateVideoUrl(noteIdx, newUrl) {
    if (newUrl.indexOf('youtube') === -1) swal('URL is not supported')
    else {
        const YoutubeUrl = 'https://www.youtube.com/embed/' + formatYoutubeLink(newUrl)
        notes[noteIdx].info.url = YoutubeUrl
        swal('Youtube URL updated!')
    }
}


function updateAudioUrl(noteIdx, newUrl) {
    const arrangedUrl = newUrl.split(':')
    if ((newUrl.indexOf('spotify') === -1)
        || (arrangedUrl.length !== 3)
        || (arrangedUrl[0] !== 'spotify')) {
        return swal('Sorry, Spotify Url is not correct. Spotify URL should looks like that: "spotify:album:songID". For more information: google "how to get sportify URL"')
    } else {
        const musicType = arrangedUrl[1]
        const musicId = arrangedUrl[2]
        const spotifyUr = `https://open.spotify.com/embed/${musicType}/${musicId}`
        notes[noteIdx].info.url = spotifyUr
        swal('Spotify URL updated!')
    }
}

function pinNote(noteId) {
    const noteIdx = notes.findIndex(note => note.id === noteId)
    let isPinned = notes[noteIdx].isPinned
    isPinned ? notes[noteIdx].isPinned = false : notes[noteIdx].isPinned = true
}

function editTodoTxt(noteId, todoId, value) {
    const noteIdx = notes.findIndex((note) => note.id === noteId)
    const todoIdx = notes[noteIdx].info.todos.findIndex((todo) => todo.id === todoId)
    notes[noteIdx].info.todos[todoIdx].txt = value
}

function isTodoDoneToggle(noteId, todoId) {
    const noteIdx = notes.findIndex((note) => note.id === noteId)
    const todoIdx = notes[noteIdx].info.todos.findIndex((todo) => todo.id === todoId)
    notes[noteIdx].info.todos[todoIdx].isDone ?
        notes[noteIdx].info.todos[todoIdx].isDone = false :
        notes[noteIdx].info.todos[todoIdx].isDone = true
}

// ===============REMOVE================//

function remove(noteId) {
    notes = notes.filter(note => note.id !== noteId)
}

function removeTodo(noteId, todoId) {
    const noteIdx = notes.findIndex((note) => note.id === noteId)
    const todoIdx = notes[noteIdx].info.todos.findIndex((todo) => todo.id === todoId)
    notes[noteIdx].info.todos.splice(todoIdx, 1)
}


// ===============UTILS================//

function getById(noteId) {
    const note = notes.find(note => note.id === noteId)
    return Promise.resolve(note)
}


function formatYoutubeLink(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
        ? match[2]
        : null;

}


