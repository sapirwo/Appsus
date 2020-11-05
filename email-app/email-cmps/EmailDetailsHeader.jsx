import eventBusService from '../../services/event-bus-service.js'

export function EmailDetailsHeader({ email }) {

    function getDate(timeStamp) {

        const date = new Date(timeStamp);
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate()
        return month + ' ' + day;
    }

    function onStarredEmail(email, id) {
        eventBusService.emit('starredEmail', { id: id, email: email });
    }

    function onReplyEmail() {
        eventBusService.emit('sendEmailModal');
    }
    return <section>
        <div className="email-details-header flex  align-center space-between">

            <div className="email-details-first">
            <span>{email.from}</span> 
            <span>{email.fromEmail}</span> 
            </div>

            <div className="email-details-second">
            <span>{getDate(email.sentAt)}</span>
            <i className={email.isStarred ? 'star-icon fas fa-star icon-yellow pointer' : 'star-icon fas fa-star pointer'} onClick={() => onStarredEmail(email, email.id)}>
            <span className="star-span icon-on-hover ">Starred</span>
            </i>
            <i className="reply-icon fas fa-reply pointer" onClick={() => onReplyEmail()}>
            <span className="reply-span icon-on-hover">Reply</span>
            </i>
            </div>

        </div>

    </section>
}