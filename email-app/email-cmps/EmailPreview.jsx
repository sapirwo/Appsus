const { Link, withRouter } = ReactRouterDOM
import eventBusService from '../../services/event-bus-service.js'


function _EmailPreview({ email, location, currPage }) {


    function getDate(timeStamp) {

        const date = new Date(timeStamp);
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate()
        return month + ' ' + day;
    }
    function onRemoveEmail(id) {
        eventBusService.emit('removeEmail', { id: id, email })
    }
    function onStarredEmail(email, id) {
        eventBusService.emit('starredEmail', { id: id, email: email });
    }
    function onCheckedEmail(id) {
        eventBusService.emit('checkedEmail', { id: id });
    }
    function onSelectEmail(id, isReadToggle = false) {
        eventBusService.emit('selectedEmail', { id: id, currPage: currPage, isReadToggle });
    }
    function getUrlLocationPath() {
        return location.pathname
    }

    return (

        <section className={` ${email.isRead ? 'read-bgc' : 'unread-bgc'} email-preview flex space-between align-center`}>
            <div className="first-functional-icons flex space-around align-center">
                <i className={email.isChecked ? 'select-icon fas fa-check-square' : 'select-icon far fa-square'} onClick={() => onCheckedEmail(email.id)}>
                    <span className="select-span icon-on-hover">Select</span>
                </i>
                <i className={email.isStarred ? ' star-icon fas fa-star icon-yellow' : ' star-icon fas fa-star'} onClick={() => onStarredEmail(email, email.id)}>
                    <span className="star-span icon-on-hover">Starred</span>
                </i>
            </div>
            <Link onClick={() => onSelectEmail(email.id)} to={getUrlLocationPath() + '/' + email.id}>
                <span className={email.isRead ? '' : 'email-unreaded'} >{email.from}</span>
                <span className={email.isRead ? '' : 'email-unreaded'} >{email.subject}</span>
                <span className={email.isRead ? '' : 'email-unreaded'} >{getDate(email.sentAt)}</span>
            </Link>
            <div className="second-functional-icons flex space-around align-center">
                <i onClick={() => onSelectEmail(email.id, true)}
                    className={email.isRead ? "read-icon fas fa-envelope-open" : " read-icon fas fa-envelope"}>
                    <span className="read-span icon-on-hover">{email.isRead ? 'Unread' : 'Read'}</span>
                </i>

                <i className="trash-icon fas fa-trash" onClick={() => onRemoveEmail(email.id)}>
                    <span className="trash-span icon-on-hover">Delete</span>
                </i>
            </div>
        </section>)

}


export const EmailPreview = withRouter(_EmailPreview)