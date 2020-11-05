import eventBusService from '../../services/event-bus-service.js'

export function EmailDetailsBtns() {

    function onReplyEmail() {
        eventBusService.emit('sendEmailModal');
    }

    return <section>
        <div className="email-details-btns">
            <button onClick={() => onReplyEmail()}> <i className="reply-icon fas fa-reply"></i>Reply</button>
            <button><i className="fas fa-long-arrow-alt-right"></i>Forward</button>
        </div>

    </section>
}