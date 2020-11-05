const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { Home } from './home.jsx'
import { NavBar } from './main-cmps/NavBar.jsx'
import { Footer } from './main-cmps/Footer.jsx'
import { EmailApp } from './email-app/pages/EmailApp.jsx'
import { KeepApp } from './keep-app/pages/KeepApp.jsx'
import { Notification } from './main-cmps/Notification.jsx'


export class App extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <header>
                        <NavBar />
                    </header>
                    <main className = "main-container">
                        <Switch>
                            <Route component={EmailApp} path="/email" />
                            <Route component={KeepApp} path="/keep" />
                            <Route component={Home} path="/" />
                        </Switch>
                    </main>
                    <Footer />
                    <Notification />
                </div>
            </Router>
        )
    }
}

