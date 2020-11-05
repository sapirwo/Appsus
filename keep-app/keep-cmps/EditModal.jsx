import { EditPreview } from './EditPreview.jsx'
export class EditModal extends React.Component {


    // ================MODAL FOR EDITING NOTE TEXT===============//

    render() {
        const isShown = this.props.isShown
        if (!isShown) return ''
        const noteToEdit = this.props.noteToEdit
        let noteBgc;
        isShown ?
            noteBgc = noteToEdit.style.backgroundColor :
            noteBgc = ''

        return (
            <div className={`keepApp-modal-wrapper ${isShown ? '' :
                'keepApp-modal-hide'}`}
                onClick={this.props.closeModal()}>
                <div className="modal-content"
                    onClick={this.props.closeModal()}>

                    {/* ================RENDER MODAL PREV========== */}

                    <div className="keepApp-modal-content">
                        < EditPreview note={noteToEdit} closeModal={this.props.closeModal()} />
                    </div>

                </div>
            </div >
        )
    }
}
