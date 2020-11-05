import eventBusService from '../../services/event-bus-service.js'

export class SendEmailModal extends React.Component {
    state = {
        isShown: false,
        message: {
            recipients: '',
            subject: '',
            body: ''
        }
    }

    componentDidMount() {
        this.sendEmail = eventBusService.on('sendEmailModal', () => {
            this.setState({ isShown: true })
        })
    }
    componentWillUnmount() {
        this.sendEmail()
    }
    onSetInput = (evName, evValue) => {
        this.setState(
            {
                message: { ...this.state.message, [evName]: evValue }
            }
        )
    }

    onSubmitForm = (ev) => {
        // console.log('ev', ev);
        ev.preventDefault();
        const { recipients, subject, body } = this.state.message
        this.onSendEmail(recipients, subject, body)
        this.setState({ isShown: false })
    }

    onSendEmail = (recipients, subject, body) => {
        // EmailApp.sentEmail(recipients, subject, body)
        // console.log('recipients:', recipients, 'subject:', subject, 'body:', body);
        eventBusService.emit('sentEmail', { recipients, subject, body });
    }

    render() {
        const { isShown } = this.state
        return (
            <div>
                {isShown &&
                    <div className={`send-email-box flex flex-column`}>
                        <div className="send-modal-header flex align-center justify-center grey-bgc">
                            <div>
                                <h3>New Message</h3>
                            </div>
                            <div>
                                <span onClick={() => this.setState({ isShown: false })}>X</span>
                            </div>
                        </div>
                        <form className="email-form" onSubmit={(ev) => this.onSubmitForm(ev)}>
                            <div className="send-email-form flex flex-column">
                                <div className="send-modal-subheader">
                                    <div><input name="recipients" type="text" placeholder="Recipients"
                                        onChange={(ev) => this.onSetInput(ev.target.name, ev.target.value)}
                                    /></div>
                                    <div><input name="subject" type="text" placeholder="Subject"
                                        onChange={(ev) => this.onSetInput(ev.target.name, ev.target.value)}
                                    /></div>
                                </div>
                                <div className="send-modal-body">
                                    <textarea name="body"
                                        onChange={(ev) => this.onSetInput(ev.target.name, ev.target.value)}
                                    ></textarea>
                                </div>
                                <div className="send-modal-buttom-btns flex align-center justify-center">
                                    <button>Send</button>
                                </div>
                            </div>
                        </form>
                    </div>
                }
            </div>
        )
    }
}
