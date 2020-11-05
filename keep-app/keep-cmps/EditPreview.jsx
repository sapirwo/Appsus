export class EditPreview extends React.Component {

    // ==========RENDER NOTE ON MODAL AND SUPPORT LIVE TYPING=========//
    state = {
        txtTyped: true
    }

    selectedNote = null

    setNewTxt = (ev) => {
        this.selectedNote.info.txt = ev.target.value
        this.setState({ txtTyped: true })
    }

    makeTextNote(note) {
        if (!this.selectedNote) this.selectedNote = note
        const noteBgc = note.style.backgroundColor
        return (
            <div className="keepApp-note-modal"
                style={{ backgroundColor: noteBgc }}
                onClick={(ev) => ev.stopPropagation()}>
                <form action=""
                    onSubmit={() => this.props.closeModal(this.selectedNote)}>
                    <pre><textarea type="text"
                        value={this.selectedNote.info.txt}
                        onChange={this.setNewTxt} />
                    </pre>
                </form>
            </div>
        )
    }

    getNotesForDisplay = () => {
        const note = this.props.note
        if (!note) return ''
        else return this.makeTextNote(note)
    }
    render() {
        return (
            this.getNotesForDisplay(() => { })
        )
    }

}

