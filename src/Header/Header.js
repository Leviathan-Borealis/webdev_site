import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import UserContext from '../Context/UserContext';

class Header extends React.Component {
  render() {
    return (
      <UserContext.Consumer>
        { context => (
      <header className="transparent_border">
      <Link to="/" id="headerTitle"><img src="https://i.ya-webdesign.com/images/side-drawing-dragon-3.png" alt="Logo"></img>  
        <h1>DND atmosphere</h1>
      </Link>
        <nav>
          <ul>
            {context.rights === "ADM" ? <Link to="/admin">Admin</Link> : null}
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/" onClick={context.handleLogOutUser}>Logout</Link> 
          </ul>
        </nav>
    </header>
        )}
    </UserContext.Consumer>
  )};
}

export default Header;
