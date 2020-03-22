import React from 'react';
import UserContext from './UserContext';
import {logOnUser} from '../db/db_methods';
class UserProvider extends React.Component {
    state = {
        username: 'GAIA-DND-VIP-USER',
        userId: '',
        name: '',
        rights: 'USER',
        isLoggedOn: false
    };
    handleLogOnUser = (username, password) => {
        const logonUserResult = logOnUser(username, password)
        logonUserResult.then((result) => {
            const finalResult = result.data[0].result.db_result;
            if(finalResult.status) {
                this.setState({
                    username: finalResult.username,
                    userId: finalResult.id,
                    rights: finalResult.rights,
                    isLoggedOn: true
                })
            } else {
                var element = document.getElementById("login_username");
                element.value = finalResult.message;
                element.focus();
            }
        })
    }
    handleLogOutUser = () => {
        this.setState({
            username: 'GAIA-DND-VIP-USER',
            name: '',
            rights: '',
            isLoggedOn: false
        })
        
    }
    render() {
        return (
            <UserContext.Provider
                value={{
                    username: this.state.username,
                    userId: this.state.userId,
                    rights: this.state.rights,
                    isLoggedOn: this.state.isLoggedOn,
                    handleLogOnUser: this.handleLogOnUser,
                    handleLogOutUser: this.handleLogOutUser
                }}
            >
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export default UserProvider;