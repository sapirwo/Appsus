const { NavLink, withRouter } = ReactRouterDOM

function _NavBar() {
    return (
        <nav className="main-nav flex align-center space-between">
                <NavLink exact className='appsus-logo' activeClassName='active-nav' to="/">Appsus</NavLink>
            <div className="nav-links">
                <NavLink  to="/email/inbox">Email</NavLink>
                <NavLink to="/keep">Keep</NavLink>
            </div>
        </nav>
    )
}
export const NavBar = withRouter(_NavBar)
