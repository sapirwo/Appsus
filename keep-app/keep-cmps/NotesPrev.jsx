
export function NotesPreview({ note, updateTitle, removeTodo, isTodoDoneToggle, editTodoTxt }) {
    if (!note) return false
    var notePrev;
    switch (note.type) {
        case 'NoteText': notePrev = makeTextNote(note);
            break;
        case 'NoteImg': notePrev = makeImgNote(note)
            break;
        case 'NoteTodos': notePrev = makeTodosNote(note)
            break;
        case 'NoteVideo': notePrev = makeVideoNote(note)
            break;
        case 'NoteAudio': notePrev = makeNoteAudio(note)
            break;
    }

    // =============NOTES STR HTMLS ==============//

    function makeTextNote(note) {
        const noteBgc = note.style.backgroundColor
        return (
            <div className="keepApp-note note-text"
                style={{ backgroundColor: noteBgc }}>
                <pre>{note.info.txt}</pre>
            </div>
        )
    }

    function makeImgNote(note) {
        const noteBgc = note.style.backgroundColor
        return (
            <div className="keepApp-note note-img"
                style={{ backgroundColor: noteBgc }}>
                <h2 onClick={() => {
                    swal("Enter new title:", {
                        content: "input",
                    })
                        .then((value) => {
                            updateTitle(note.id, value, 'NoteImg')
                        });
                }}>
                    {note.info.title}
                </h2>
                <img src={note.info.url} alt="Image URL is not correct. Try again." />
            </div>
        )
    }

    function makeVideoNote(note) {
        const noteBgc = note.style.backgroundColor
        const url = note.info.url
        return (
            <div className="keepApp-note note-video"
                style={{ backgroundColor: noteBgc }}>
                <h2 onClick={() => {
                    swal("Enter new title:", {
                        content: "input",
                    })
                        .then((value) => {
                            updateTitle(note.id, value, 'NoteVideo')
                        });
                }}>
                    {note.info.title}
                </h2>
                <iframe src={url}
                    frameBorder="0" allow="accelerometer;
                    autoplay; encrypted-media; gyroscope;
                    picture-in-picture" allowFullScreen>
                </iframe>
            </div >
        )
    }

    function makeTodosNote(note) {
        const noteBgc = note.style.backgroundColor
        return (
            <div className="keepApp-note note-todo"
                style={{ backgroundColor: noteBgc }}>
                <h2 onClick={() => {
                    swal("Enter new title:", {
                        content: "input",
                    })
                        .then((value) => {
                            updateTitle(note.id, value, 'NoteTodos')
                        });
                }}>
                    {note.info.label}
                </h2>
                {getTodos(note)}
            </div>
        )
    }

    function makeNoteAudio(note) {
        const noteBgc = note.style.backgroundColor
        const url = note.info.url
        return (
            <div className="keepApp-note note-audio"
                style={{ backgroundColor: noteBgc }}>
                <h2 onClick={() => {
                    swal("Enter new title:", {
                        content: "input",
                    })
                        .then((value) => {
                            updateTitle(note.id, value, 'NoteAudio')
                        });
                }}>
                    {note.info.title}
                </h2>
                <iframe src={url}
                    frameBorder="0"
                    allowtransparency="true"
                    allow="encrypted-media">
                </iframe>
            </div >
        )
    }


    function getTodos(note) {
        const todos = note.info.todos
            .map((todo, idx) =>
                <div key={idx + 3} className="keepApp-todo">
                    <button
                        key={idx + 1}
                        className="fas fa-user-check"
                        onClick={() => isTodoDoneToggle(note.id, todo.id)}>
                    </button>
                    <button
                        key={idx + 2}
                        className="fas fa-trash-alt"
                        onClick={() => removeTodo(note.id, todo.id)}>
                    </button>
                    <p key={idx}
                        className={todo.isDone ? 'todo-done' : ''}
                        onClick={() => {
                            swal("Enter new title:", {
                                content: "input",
                            })
                                .then((value) => {
                                    editTodoTxt(note.id, todo.id, value)
                                });
                        }}>

                        {todo.txt}
                    </p>
                </div >
            )
        return todos
    }

    return notePrev
}


