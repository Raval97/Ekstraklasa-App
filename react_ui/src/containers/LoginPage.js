import React, {Component} from "react";
import {Redirect} from 'react-router'
import PropTypes from "prop-types";
import MenuSignInAndSignUp from "../components/MenuSignInAndSignUp";

class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            response: {}
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

    async logIn() {
        let resp = await this.props.authorizationFunctions.logIn(this.state.username, this.state.password)
        this.setState({response: resp})
    }

    render() {
        let info
        if (this.state.response.success !== undefined) {
            if (this.state.response.success === true)
                return <Redirect to='/ekstraklasa/home'/>;
            else {
                info = (
                    <div id="wrongPass" className="p-1 mb-3 text-center"
                         style={{backgroundColor: "#a1072c", color: "#fff", fontSize: "1.5vw"}}>
                        {this.state.response.message}
                    </div>
                )
            }
        }
        if (this.props.successLogout)
            info = (
                <div id="logOut_info" className="p-1 mb-3 text-center"
                     style={{backgroundColor: "#9db8cb", color: "#fff", fontSize: "1.5vw"}}>
                    You have been logged out.
                </div>
            )
        if (this.props.successRegister)
            info = (
                <div id="logOut_info" className="p-1 mb-3 text-center"
                     style={{backgroundColor: "#5ea331", color: "#fff", fontSize: "1.5vw"}}>
                    New Account is successful created, now you can log in.
                </div>
            )

        return (
            <div className="mx-auto w-75 mt-3 p-3" style={{backgroundColor: "#49a1d5"}}>
                <div className="mx-auto w-50 p-3 mb-10" style={{backgroundColor: "#33aaff"}}>
                    {info}
                    <h2 className="form-signin-heading text-center" style={{fontSize: "3.5vw", color: "#fff"}}>Please
                        sign in</h2>
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
                            style={{fontSize: "2vw"}}
                            onClick={() => this.logIn()}>Sign in
                    </button>
                </div>
                <div className="row mx-auto w-50 mb-10 justify-content-lg-center">
                    <MenuSignInAndSignUp actualSite={"Sign_In"}
                                         callbackFunctions={this.props.authorizationFunctions}/>
                </div>
            </div>
        )
    }
}

LoginPage.propTypes = {
    successRegister: PropTypes.bool,
    successLogout: PropTypes.bool,
    authorizationFunctions: PropTypes.object
};

export default LoginPage;
