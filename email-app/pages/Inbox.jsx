import { EmailList } from '../email-cmps/EmailList.jsx'

export function Inbox({ emails, currPage }) {
    return (
        <section>
            <EmailList emails={emails} currPage={currPage} />
        </section>
    )
}
