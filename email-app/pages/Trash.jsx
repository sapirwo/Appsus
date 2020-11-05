import { EmailList } from '../email-cmps/EmailList.jsx'

export function Trash({ removedEmails, currPage }) {
    return (
        <section>
            <EmailList emails={removedEmails} currPage={currPage} />
        </section>
    )
}
