import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Signup.css';
import {registerUser} from '../db/db_methods';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            register_username: '',
            register_email: '',
            register_password: '',
            confirm_password: '',
            serverResults: '',
            redirect: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }
    handleChange(event) {
        this.setState({ 
            [event.target.name]: event.target.value 
        });
    }

    handleRegister(event) {
        if(this.state.register_password === this.state.confirm_password) {
            const registerUserResult = registerUser(this.state.register_username, this.state.register_email, this.state.confirm_password, 'USER');
            registerUserResult.then((result) => {     
                if (result.data !== "") {                   
                    this.setState({
                        redirect: true
                    })
                    
                } else {
                    this.setState({
                        register_username: "Usermail or mail already exist",
                        register_email: '',
                        register_password: '',
                        confirm_password: '',
                        serverResults: ''
                    })
                }
                
            })
        } else {
            this.setState({
                register_username: 'Passwords didnt match',
                register_email: '',
                register_password: '',
                confirm_password: '',
                serverResults: ''
            })
        }

        event.preventDefault();
    }
    render() {
        if(this.state.redirect) {
            return <Redirect to="/" />
        }
        return (
            <div id="signup">
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
                                        <b>Register account</b>
                                        <br />
                                        <br />
                                        <form onSubmit={this.handleRegister}>
                                        <div className="row_login">
                                                <div className="col col__left label">
                                                    Username
                                                </div>
                                                <div className="col col__center">
                                                    <input type="text" id="register_username" name="register_username" required="required" maxLength="32" value={this.state.register_username} autoFocus={true} onChange={this.handleChange} />
                                                </div>
                                            </div>
                                            <div className="row_login">
                                                <div className="col col__left label">
                                                    Email
                                                </div>
                                                <div className="col col__center">
                                                    <input type="text" id="register_email" name="register_email" required="required" maxLength="32" value={this.state.register_email} onChange={this.handleChange} />
                                                </div>
                                            </div>
                                            <div className="row_login">
                                                <div className="col col__left label">
                                                    Password
                                                </div>
                                                <div className="col col__center">
                                                    <input type="password" id="register_password" name="register_password" required="required" placeholder="" value={this.state.register_password} data-error="" maxLength="32" autoComplete="new-password" onChange={this.handleChange} />
                                                </div>
                                            </div>
                                            <div className="row_login">
                                                <div className="col col__left label">
                                                    Confirm Password
                                                </div>
                                                <div className="col col__center">
                                                    <input type="password" id="confirm_password" name="confirm_password" required="required" placeholder="" value={this.state.confirm_password} data-error="" maxLength="32" autoComplete="new-password" onChange={this.handleChange} />
                                                </div>
                                            </div>
                                            <div className="row_login">
                                                <button type="submit" className="login_button" id="register_acc" name="register_acc">[register account]</button>
                                                <Link className="login_button" id="cancel" to="/">[cancel]</Link>
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
        );
    }
}

export default Signup;
