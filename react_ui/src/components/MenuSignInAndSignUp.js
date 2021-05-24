import React, {Component} from "react";
import {Redirect} from 'react-router'
import Button from 'react-bootstrap/Button';

class MenuSignInAndSignUp extends Component {
    constructor() {
        super();
        this.state = {
            loginPage: false,
            registerPage: false,
            homePage: false,
        };
        this.onChangeLoginPage = this.onChangeLoginPage.bind(this);
        this.onChangeRegisterPage = this.onChangeRegisterPage.bind(this);
        this.onChangeHomePage = this.onChangeHomePage.bind(this);
    }

    onChangeLoginPage() {
        this.setState({
            loginPage: !this.state.loginPage
        })
        this.props.callbackFunctions.resetInformation()
    }

    onChangeRegisterPage() {
        this.setState({
            registerPage: !this.state.registerPage
        })
        this.props.callbackFunctions.resetInformation()
    }

    onChangeHomePage() {
        this.setState({
            homePage: !this.state.homePage
        })
        this.props.callbackFunctions.resetInformation()
    }

    render() {
        if (this.state.loginPage) {
            this.onChangeLoginPage()
            return <Redirect to='/login'/>
        }
        if (this.state.registerPage) {
            this.onChangeRegisterPage()
            return <Redirect to='/sign_up'/>
        }
        if (this.state.homePage) {
            this.onChangeHomePage()
            return <Redirect to='/ekstraklasa/home'/>
        }

        let secondOption
        if (this.props.actualSite === "Sign_In") {
            secondOption = (
                <Button className="m-1 myButton"
                        onClick={this.onChangeRegisterPage}>Sign Up</Button>
            )
        } else {
            secondOption = (
                <Button className="m-1 myButton"
                        onClick={this.onChangeLoginPage}>Sign In</Button>
            )
        }

        return (
            <div className="mb-10 d-flex justify-content-lg-left">
                <Button className="m-1 myButton"
                        onClick={this.onChangeHomePage}>Home Page</Button>
                {secondOption}
            </div>
        )
    }

}

export default MenuSignInAndSignUp;
