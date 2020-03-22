import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import UserContext from '../Context/UserContext';
import "../config";

class Login extends React.Component {
    constructor(props) {
        super(props);
        var username;
        if(this.props.username != null) {
            username = this.props.username;
        } else {
            username = this.props.context.username;
        }
        this.state = {
                login: username,
                password: '',
                serverResults: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
    }
    render() {
        return (
            <UserContext.Consumer>
            {context => (
            <div id="login">
            <div className="container on">
                <div className="screen">
                    <h3 className="title">
                        CONNECTION ESTABLISHED
                    </h3>
                    <div className="box--outer">
                        <div className="box">
                            <div className="box--inner">
                                <div className="content">
                                    <div className="holder">
                                        <b>Welcome to GAIA-DND</b> — the high-performance automotive solutions with&nbsp;a&nbsp;soul. Please enter your
                                        DND VIP user credentials.
                                        <br />
                                        <br />
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="row_login">
                                                <div className="col col__left label">
                                                    Login
                                                </div>
                                                <div className="col col__center">
                                                    <input type="text" id="login_username" name="login" required="required" maxLength="32" autoFocus={true} defaultValue={this.state.login}onChange={this.handleChange} />
                                                </div>
                                            </div>
                                            <div className="row_login">
                                                <div className="col col__left label">
                                                    Password
                                                </div>
                                                <div className="col col__center">
                                                    <input type="password" id="login_password" name="password" required="required" placeholder="" data-error="" maxLength="32" autoComplete="new-password" onChange={this.handleChange} />
                                                </div>
                                            </div>
                                            <div className="row_login">
                                                <button onClick={() => context.handleLogOnUser(this.state.login, this.state.password)} type="submit" className="login_button" id="login_submit" name="submit">[login]</button>
                                                <Link to="/signup"><button className="login_button" id="login_signup" name="signup">[signup]</button></Link>
                                            </div>
                                        </form>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            )}
            </UserContext.Consumer>
        );
    }

}

export default Login;
