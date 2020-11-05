const { withRouter } = ReactRouterDOM
function _Footer() {
    return (
        <nav className="main-nav flex align-center flex-column main-footer">
            <div className="appsus-logo">Appsus</div>
            <small>© 2020 Appsus. All rights reserved.</small>
        </nav>
    )
}
export const Footer = withRouter(_Footer)

