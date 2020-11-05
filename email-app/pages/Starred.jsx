import { EmailList } from '../email-cmps/EmailList.jsx'

export function Starred({ starredEmails, currPage }) {
    return (
        <section>
            <EmailList emails={starredEmails} currPage={currPage} />
        </section>
    )
}
