const { Link } = ReactRouterDOM
import { emailService } from '../services/email-service.js'
import { EmailDetailsHeader } from '../email-cmps/EmailDetailsHeader.jsx'
import { EmailDetailsBody } from '../email-cmps/EmailDetailsBody.jsx'
import { EmailDetailsBtns } from '../email-cmps/EmailDetailsBtns.jsx'

export class EmailDetails extends React.Component {
    state = {
        email: null
    }

    componentDidMount() {
        this.loadEmail()
    }

    loadEmail() {
        const emailId = this.props.match.params.emailId
        emailService.getById(emailId)
            .then(email => this.setState({ email }))
    }

    render() {
        const { email } = this.state
        return (
            <div>
                {email &&
                    <div className="email-details">
                        <h2 className="font-normal black-border-bottom">{email.subject}</h2>
                        <EmailDetailsHeader email={email} />
                        <EmailDetailsBody email={email} />
                        <EmailDetailsBtns email={email} />
                    </div>
                }
            </div>
        )
    }
}
