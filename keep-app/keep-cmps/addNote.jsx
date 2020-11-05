import keepService from '../services/keep-service.js'
export class AddNote extends React.Component {
    state = {
        inputVal: '',
        noteType: 'NoteText',
        placeholder: 'What\'s on your mind...'
    }

    elInput = React.createRef()

    componentDidMount() {
        this.elInput.current.focus()
    }

    onInputChange = (ev) => {
        this.setState({
            inputVal: ev.target.value
        })
    }

    onSetType = (ev) => {
        const type = ev.target.name
        this.setPlaceHolder(type)
        this.setState({
            noteType: type
        })
    }

    setPlaceHolder(type) {
        var placeHolder;
        switch (type) {
            case 'NoteText':
                placeHolder = `What's on your mind...`;
                break;
            case 'NoteTodos':
                placeHolder = `Enter Todo topic`;
                break;
            case 'NoteImg':
                placeHolder = `Enter photo URL`;
                break;
            case 'NoteVideo':
                placeHolder = `Enter Youtube URL`;
                break;
            case 'NoteAudio':
                placeHolder = `Enter Spotify URL`;
                break;
        }
        this.setState({
            placeholder: placeHolder
        })
    }

    addNote = (ev) => {
        ev.preventDefault()
        const curNoteType = this.state.noteType
        const curInput = this.state.inputVal
        keepService.save(curNoteType, curInput)
        this.props.loadNotes()
        this.setState({ inputVal: '' })
    }

    render() {
        return (
            <div className="keepApp-input-add-note-wrapper flex space-between">
                <form action=""
                    onSubmit={this.addNote}
                    className="keepApp-input-add-form">
                    <input type="text" className="keepApp-input-add-note"
                        placeholder={this.state.placeholder}
                        onChange={this.onInputChange}
                        value={this.state.inputVal}
                        ref={this.elInput} />
                </form>
                <button key="NoteText"
                    className="fas fa-font"
                    name='NoteText'
                    onClick={this.onSetType}></button>
                <button key="NoteTodos"
                    className="fas fa-list-ul"
                    name='NoteTodos'
                    onClick={this.onSetType}></button>
                <button key="NoteImg"
                    className="far fa-image"
                    name='NoteImg'
                    onClick={this.onSetType}></button>
                <button key="NoteVideo"
                    className="fab fa-youtube"
                    name='NoteVideo'
                    onClick={this.onSetType}></button>
                <button
                    key="NoteAudio"
                    className="fas fa-volume-up"
                    name='NoteAudio'
                    onClick={this.onSetType}></button>
            </div>
        )
    }
}

