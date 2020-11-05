import keepService from '../services/keep-service.js'
import { AddNote } from '../keep-cmps/addNote.jsx'
import { NotesList } from '../keep-cmps/NotesList.jsx'
import { EditModal } from '../keep-cmps/EditModal.jsx'
export class KeepApp extends React.Component {

    state = {
        notes: [],
        isEditModalShown: false,
        noteToEdit: null,
    }

    componentDidMount() {
        this.loadNotes()
    }
    loadNotes = () => {
        keepService.query()
            .then(notes => {
                this.setState({ notes })
            })
            .catch(err => console.log(err));
    }
    // ===========================EDIT NOTE TEXT MODAL ======================//
    openEditModal = (noteId) => {
        const noteToEdit = this.state.notes.find(note => note.id === noteId)
        if (noteToEdit.type !== 'NoteText') return ''
        this.setState({
            isEditModalShown: true,
            noteToEdit: noteToEdit
        })
    }
    closeEditModal = (updatedNote) => {
        if (!updatedNote.id || updatedNote.id.length === 0) {
            this.setState({ isEditModalShown: false })
            return ''
        }
        const noteIdx = this.state.notes.findIndex(note => note.id === updatedNote.id)
        this.state.notes.splice(noteIdx, 1)
        this.setState({
            isEditModalShown: false,
            noteToEdit: null
        })
        keepService.update(updatedNote)
        this.loadNotes()
        swal('Note Updated!')

    }

    // ============================NOTES EDITING ===============================//

    removeNote = (noteId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this note!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    keepService.remove(noteId)
                    this.loadNotes();
                } else {
                    swal("Your note is safe!");
                }
            });
    }
    updateUrl = (noteId, newUrl) => {
        if (!newUrl || newUrl.length === 0) return
        else {
            keepService.updateUrl(noteId, newUrl)
        }
        this.loadNotes();
    }
    updateBgc = (noteId, color) => {
        keepService.updateBgc(noteId, color)
        this.loadNotes();
    }

    pinNote = (noteId) => {
        keepService.pinNote(noteId)
        this.loadNotes();
    }
    updateTitle = (noteId, newTitle, noteType) => {
        if (!newTitle || newTitle.length === 0) return
        else {
            keepService.updateTitle(noteId, newTitle, noteType)
        }
        this.loadNotes();
    }

    // ======================NOTE TODO EDITING ============================//

    removeTodo = (noteId, todoId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this todo!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    keepService.removeTodo(noteId, todoId)
                    this.loadNotes()
                }
            });
    }
    isTodoDoneToggle = (noteId, todoId) => {
        keepService.isTodoDoneToggle(noteId, todoId)
        this.loadNotes()
    }
    addTodo = (noteId) => {
        keepService.addTodo(noteId)
        this.loadNotes()
    }
    editTodoTxt = (noteId, todoId, value) => {
        if (!value || value.length === 0) return
        keepService.editTodoTxt(noteId, todoId, value)
        this.loadNotes()
    }

    render() {
        return (
            <main className="keepApp-container">

                <section className="keepApp-add-note">
                    <AddNote loadNotes={this.loadNotes} />
                </section>

                <section className="keepApp-notes-section">
                    <NotesList notes={this.state.notes}
                        removeNote={this.removeNote}
                        openEditModal={this.openEditModal}
                        pinNote={this.pinNote}
                        updateBgc={this.updateBgc}
                        updateUrl={this.updateUrl}
                        updateTitle={this.updateTitle}
                        removeTodo={this.removeTodo}
                        isTodoDoneToggle={this.isTodoDoneToggle}
                        addTodo={this.addTodo}
                        editTodoTxt={this.editTodoTxt}
                    />
                </section>

                <EditModal
                    isShown={this.state.isEditModalShown}
                    noteToEdit={this.state.noteToEdit}
                    closeModal={() => this.closeEditModal}
                />
            </main>
        )
    }
}

