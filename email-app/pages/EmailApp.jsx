
import { emailService } from '../services/email-service.js'
import { Inbox } from '../pages/Inbox.jsx'
import { Starred } from '../pages/Starred.jsx'
import { Sent } from '../pages/Sent.jsx'
import { Trash } from '../pages/Trash.jsx'
import { EmailDetails } from '../email-cmps/EmailDetails.jsx'
import { SendEmailModal } from '../email-cmps/SendEmailModal.jsx'
import eventBusService from '../../services/event-bus-service.js'

const Router = ReactRouterDOM.HashRouter
const { NavLink, Route, Switch } = ReactRouterDOM
export class EmailApp extends React.Component {
    state = {
        emails: [],
        removedEmails: [],
        starredEmails: [],
        sentEmails: [],
        unreadMsgs: null
    }

    removeMails;
    starredEmail;
    selectedEmail;
    sentEmail;
    checkedEmail;

    componentDidMount() {
        this.loadEmails();
        this.removeMails = eventBusService.on('removeEmail', (data) => {
            this.onDeleteEmail(data.id, data.email)
        })
        this.starredEmail = eventBusService.on('starredEmail', (data) => {
            this.onStarredEmail(data.id, data.email.isStarred)
        })
        this.checkedEmail = eventBusService.on('checkedEmail', (data) => {
            this.onCheckedEmail(data.id)
        })
        this.starredEmail = eventBusService.on('selectedEmail', (data) => {
            this.onSelectEmail(data.id, data.currPage, data.isReadToggle)
        })
        this.sentEmail = eventBusService.on('sentEmail', (data) => {
            this.onSentEmail(data.recipients, data.subject, data.body)
        })
    }


    componentWillUnmount() {
        this.removeMails()
        this.starredEmail()
        this.sentEmail()
        this.checkedEmail()
    }
    loadEmails() {
        emailService.query()
            .then(emails => {
                this.setState({ emails })
            })
            .then(this.setUnreadMsgs)
    }

    setUnreadMsgs = () => {
        const unreadMsgs = this.state.emails.filter(email => !email.isRead)
        this.setState({ unreadMsgs: unreadMsgs.length })
    }

    onSentEmail = (recipients, subject, body) => {
        const newSentMail = emailService.getSentEmail(recipients, subject, body);
        let sentEmails = this.state.sentEmails
        sentEmails.push(newSentMail)
        this.setState({ sentEmails })
        if (newSentMail.recipient === 'Admin') this.OnAddEmail(newSentMail)

    }

    OnAddEmail = (email) => {
        let emails = this.state.emails;
        emails.unshift(email);
        this.setState({ emails });
    }

    onDeleteEmail = (emailId, email) => {
        const removedEmails = this.state.removedEmails
        removedEmails.push(email)
        this.setState({ removedEmails })

        emailService.remove(emailId, email)
        this.loadEmails()
    }

    onStarredEmail = (emailId) => {
        const email = this.state.emails.find(email => email.id === emailId);
        let starredEmailss = this.state.starredEmails
        email.isStarred = !email.isStarred
        if (email.isStarred) {
            starredEmailss.push(email)
            this.setState({ starredEmails: starredEmailss })
        } else {
            const emailIdx = this.state.starredEmails.findIndex(email => email.id === emailId);
            starredEmailss.splice(emailIdx, 1)
            this.setState({ starredEmails: starredEmailss })
        }
    }

    onCheckedEmail = (emailId) => {
        const email = this.state.emails.find(email => email.id === emailId);
        email.isChecked = !email.isChecked
        this.setState({ ...this.state.emails, email })
    }

    onSelectEmail = (emailId, currPage, isReadToggle) => {
        const email = this.state.emails.find(email => email.id === emailId);
        if (isReadToggle) email.isRead = !email.isRead
        else email.isRead = true
        this.setState({ ...this.state.emails, email }, this.setUnreadMsgs())
    }

    onComposeEmail = () => {
        eventBusService.emit('sendEmailModal');

    }

    render() {
        const { emails, removedEmails, starredEmails, sentEmails, unreadMsgs } = this.state
        return (
            <Router>
                <section className="email-app-container">
                    <div className="email-container flex">
                        {/* <SearchBar /> */}
                        <div className="email-sidebar">
                            <button className="compose-btn" onClick={this.onComposeEmail}>Compose</button>
                            <div className="email-sidebar-links">
                                <div><NavLink activeClassName='active-nav' to="/email/inbox"> <i className="fas fa-inbox"></i>Inbox {unreadMsgs > 0 && <span className="unread-count">{unreadMsgs}</span>} </NavLink></div>
                                <div><NavLink activeClassName='active-nav' to="/email/starred"><i className="fas fa-star"></i>Starred</NavLink></div>
                                <div><NavLink activeClassName='active-nav' to="/email/sent"><i className="fas fa-paper-plane"></i>Sent</NavLink></div>
                                <div><NavLink activeClassName='active-nav' to="/email/trash"><i className="fas fa-trash"></i>Trash</NavLink></div>
                            </div>

                        </div>
                        <div className="email-main">
                            <Switch>
                                <Route component={EmailDetails} path="/email/inbox/:emailId" />
                                <Route component={EmailDetails} path="/email/starred/:emailId" />
                                <Route component={EmailDetails} path="/email/sent/:emailId" />
                                <Route component={EmailDetails} path="/email/trash/:emailId" />
                                <Route
                                    path="/email/inbox"
                                    render={(props) => (
                                        <Inbox {...props} emails={emails} currPage="emails" />
                                    )}
                                />
                                <Route path="/email/starred"
                                    render={(props) => (
                                        <Starred {...props} starredEmails={starredEmails} currPage="emails" />
                                    )}
                                />
                                <Route path="/email/sent"
                                    render={(props) => (
                                        <Sent {...props} sentEmails={sentEmails} currPage="sentEmails" />
                                    )}
                                />
                                <Route
                                    path="/email/trash"
                                    render={(props) => (
                                        <Trash {...props} removedEmails={removedEmails} currPage="removedEmails" />
                                    )}
                                />

                            </Switch>
                            <SendEmailModal />
                        </div>

                    </div>

                </section>
            </Router>
        )
    }
}