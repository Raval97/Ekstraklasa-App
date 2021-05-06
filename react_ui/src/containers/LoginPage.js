import React, {Component} from "react";
import {Redirect} from 'react-router'
import PropTypes from "prop-types";

class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onChangeName(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        if (this.props.user !== null)
            return <Redirect to='/ekstraklasa/home'/>;
        let failedAuthorized
        if (this.props.failedAuthorization)
            failedAuthorized = (
                <div id="wrongPass" className="p-1 mb-3 text-center"
                     style={{backgroundColor: "#a1072c", color: "#fff"}}>
                    Invalid username or password.
                </div>
            )
        let successLogOut
        if (this.props.successLogout)
            successLogOut = (
                <div id="logOut_info" className="p-1 mb-3 text-center"
                     style={{backgroundColor: "#9db8cb", color: "#fff"}}>
                    You have been logged out.
                </div>
            )
        return (
            <div className="mx-auto w-75 mt-3 p-3" style={{backgroundColor: "#49a1d5"}}>
                <div className="mx-auto w-50 p-3 mb-10" style={{backgroundColor: "#33aaff"}}>
                    {failedAuthorized}
                    {successLogOut}
                    <h2 className="form-signin-heading text-center">Please sign in</h2>
                    <div className="form-group">
                        <label htmlFor="username" className="sr-only">Username</label>
                        <input type="text" className="form-control" id="username" name="username"
                               required="required" placeholder="Username" onChange={this.onChangeName}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input type="password" className="form-control" id="password" name="password"
                               required="required" placeholder="Password" onChange={this.onChangePassword}/>
                    </div>
                    <button id="signIn" className="btn btn-lg btn-primary btn-block" type="submit"
                            onClick={() => this.props.authorizationFunctions.logIn(this.state.username, this.state.password)}
                    >Sign in
                    </button>
                </div>
            </div>
        )
    }
}

LoginPage.propTypes = {
    user: PropTypes.object,
    failedAuthorization: PropTypes.bool,
    successLogout: PropTypes.bool,
    authorizationFunctions: PropTypes.object
};

export default LoginPage;
