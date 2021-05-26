import React, {Component} from "react";
import {Redirect} from 'react-router'
import Button from 'react-bootstrap/Button';

class Menu extends Component {
    constructor() {
        super();
        this.state = {
            loginPage: false,
            registerPage: false,
            adminMatchesPage: false,
            adminUsersPage: false,
            ekstraklasaPage: false,
            userAccountPage: false
        };
        this.onChangeLoginPage = this.onChangeLoginPage.bind(this);
        this.onChangeRegisterPage = this.onChangeRegisterPage.bind(this);
        this.onChangeAdminMatchesPage = this.onChangeAdminMatchesPage.bind(this);
        this.onChangeAdminUsersPage = this.onChangeAdminUsersPage.bind(this);
        this.onChangeEkstraklasaPage = this.onChangeEkstraklasaPage.bind(this);
        this.onChangeUserAccountPage = this.onChangeUserAccountPage.bind(this);
    }

    onChangeLoginPage() {
        this.setState({
            loginPage: !this.state.loginPage
        })
    }

    onChangeRegisterPage() {
        this.setState({
            registerPage: !this.state.registerPage
        })
    }

    onChangeAdminMatchesPage() {
        this.setState({
            adminMatchesPage: !this.state.adminMatchesPage
        })
    }

    onChangeAdminUsersPage() {
        this.setState({
            adminUsersPage: !this.state.adminUsersPage
        })
    }

    onChangeEkstraklasaPage() {
        this.setState({
            ekstraklasaPage: !this.state.ekstraklasaPage
        })
    }

    onChangeUserAccountPage() {
        this.setState({
            userAccountPage: !this.state.userAccountPage
        })
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
        if (this.state.adminMatchesPage) {
            this.onChangeAdminMatchesPage()
            return <Redirect to='/ekstraklasa/adminMatches'/>
        }
        if (this.state.adminUsersPage) {
            this.onChangeAdminUsersPage()
            return <Redirect to='/ekstraklasa/adminUsers'/>
        }
        if (this.state.ekstraklasaPage) {
            this.onChangeEkstraklasaPage()
            return <Redirect to='/ekstraklasa/home'/>
        }
        if (this.state.userAccountPage) {
            this.onChangeUserAccountPage()
            return <Redirect to='/ekstraklasa/userAccount'/>
        }

        let logoutButton = (
            <div>
                <div className="form-group row">
                    <div className="pl-3">
                        <Button type="submit" className="myButton"
                                onClick={() => this.props.authorizationFunctions.logOut()}>Log Out
                        </Button>
                    </div>
                </div>
            </div>
        )
        let topMenu
        if (this.props.user === null) {
            topMenu = (
                <div>
                    <Button className="myButton" onClick={this.onChangeLoginPage}>Sign In</Button>{' '}
                    <Button className="myButton" onClick={this.onChangeRegisterPage}>Sign Up</Button>{' '}
                </div>

            )
        } else if (this.props.user.role === "ROLE_USER") {
            topMenu = (
                <div>
                    {logoutButton}
                    <Button className="myButton" onClick={this.onChangeEkstraklasaPage}>Ekstraklasa</Button>{' '}
                    <Button className="myButton" onClick={this.onChangeUserAccountPage}>User Account</Button>{' '}
                </div>
            )
        } else {
            topMenu = (
                <div>
                    {logoutButton}
                    <Button className="myButton" onClick={this.onChangeEkstraklasaPage}>Ekstraklasa</Button>{' '}
                    <Button className="myButton" onClick={this.onChangeUserAccountPage}>User Account</Button>{' '}
                    <Button className="myButton" onClick={this.onChangeAdminMatchesPage}>Administration
                        Matches</Button>{' '}
                    <Button className="myButton" onClick={this.onChangeAdminUsersPage}>Administration
                        Users</Button>{' '}
                </div>
            )
        }

        return (
            <div className="mt-3 d-flex justify-content-around w-100">
                <div className="w-75">
                    {topMenu}
                </div>
                <div className="w-25">
                    <img className="pl-5 float-right" src={process.env.PUBLIC_URL + '/logo.png'}
                         alt="Ekstraklasa" width="400" height="100"/>
                </div>
            </div>
        )
    }

}

export default Menu;
