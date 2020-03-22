import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './index.css';

import Header from './Header/Header';
import About from './Body/About';
import App from './Body/App';
import Admin from './Body/Admin';
import Login from './Body/Login';
import Signup from './Body/Signup';
import * as serviceWorker from './serviceWorker';
import UserProvider from './Context/UserProvider';
import UserContext from './Context/UserContext';

/*Portal - Transport data quick instead of going through the hierarchy
https://levelup.gitconnected.com/react-portals-what-are-they-and-why-should-we-use-them-7c082a62e8fa
Create portal and transport data quick between the hierarchy - https://reactjs.org/docs/portals.html
------------------------------------------
Fragment - Widget page.
Mix of many tiny fragments in a window.
https://reactjs.org/docs/fragments.html
------------------------------------------
Error / Suspense loading - If you need to load or display an error message if nothing happens.
https://reactjs.org/docs/code-splitting.html
https://reactjs.org/docs/error-boundaries.html
------------------------------------------
*/

ReactDOM.render(
        <UserProvider>
        <UserContext.Consumer>{ context => (
        <Router>
        {context.isLoggedOn ?
        <Switch>
        <Route path="/admin">
            <Header  />
            <Admin context={context} />
        </Route>
        <Route path="/login">
            <Login context={context} />
        </Route>
        <Route path="/about">
            <Header />
            <About />    
        </Route>
        <Route path="/">
            <Header />
            <App context={context} />
        </Route>
        </Switch> :
        <Switch>
        <Route path="/signup">
            <Signup context={context} />
        </Route>
        <Route path="/">
            <Login context={context} />
        </Route>
        </Switch>}
        </Router>
        )}</UserContext.Consumer>
        </UserProvider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
