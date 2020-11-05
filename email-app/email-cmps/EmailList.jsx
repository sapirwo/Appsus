import { EmailPreview } from '../email-cmps/EmailPreview.jsx'

export function EmailList({ emails, currPage }) {
    return <section>
        <ul className="email-list clean-list">
        {emails.length > 0 && emails.map(email => 
                <li className="email-item pointer" key={email.id}>
                   <EmailPreview email={email} currPage={currPage}/>
                </li>
            )}
        {emails.length === 0 && 
            <p>The list is empty</p>
        }
        </ul>

    </section>
}