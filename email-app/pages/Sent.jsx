import { EmailList } from '../email-cmps/EmailList.jsx'

export function Sent({ sentEmails, currPage }) {
    return (
        <section>
            <EmailList emails={sentEmails} currPage={currPage} />
        </section>
    )
}
