const { Link } = ReactRouterDOM
import { NotesPreview } from './NotesPrev.jsx'

var newUrl = null;

export function NotesList(
    { notes,
        removeNote,
        openEditModal,
        pinNote,
        updateBgc,
        updateUrl,
        updateTitle,
        removeTodo,
        isTodoDoneToggle,
        addTodo,
        editTodoTxt
    }) {
    return (
        <ul className="keepApp-notes-list">
            {
                notes.map(note =>
                    <li key={note.id} className="clean-list">

                        {/* ===============================RENDERING NOTES============================== */}
                        <div className="keepApp-note-wrapper" onClick={() => openEditModal(note.id)} >
                            < NotesPreview
                                note={note}
                                updateTitle={updateTitle}
                                removeTodo={removeTodo}
                                isTodoDoneToggle={isTodoDoneToggle}
                                editTodoTxt={editTodoTxt}
                            />
                        </div>

                        {/* ===============================NOTES EDITING BTNS============================== */}

                        {/* =======================PIN NOTE BTN======== */}
                        <div className="keepApp-edit-btns">
                            <button className={`${note.isPinned
                                ? 'keepApp-pinned-btn' :
                                ''} fas fa-thumbtack`}
                                onClick={() => pinNote(note.id)}>
                                {/* ==============UPDATE BGC BTN==== */}
                            </button>
                            <label className="fas fa-palette" >
                                <input id="keepApp-color-picker" type="color"
                                    style={{ display: 'none' }} onChange={() =>
                                        updateBgc(note.id, event.target.value)}
                                />
                            </label>
                            {/* ==================REMOVE NOTE BTN==== */}
                            <button className="fas fa-trash-alt"
                                onClick={() =>
                                    removeNote(note.id)}>
                            </button>

                            {/* ==============SET NEW URL INPUT AND BTN==== */}
                            {note.type === 'NoteVideo' ||
                                note.type === 'NoteImg' ||
                                note.type === 'NoteAudio' ?
                                <label className="fas fa-paperclip">
                                    <form action=""
                                        onChange={() => setNewUrl(event)}
                                        onSubmit={() => updateUrl(note.id, newUrl)} >
                                        <input className="keepApp-edit-link-input"
                                            type="link"
                                            placeholder="Enter new link"
                                        />
                                    </form>
                                </label> : ''}
                            {/* ==============ADD TODO BTN==== */}
                            {note.type === 'NoteTodos' ?
                                <button onClick={() => addTodo(note.id)}
                                    className="fas fa-plus"></button> : ''}
                        </div>
                    </li>)
            }
        </ul >
    )
}

function setNewUrl(ev) {
    newUrl = (ev.target.value)
}
