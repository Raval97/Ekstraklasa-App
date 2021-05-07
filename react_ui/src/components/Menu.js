import React, {Component} from "react";
import {Redirect} from 'react-router'
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'

class Menu extends Component {
    constructor() {
        super();
        this.state = {
            loginPage: false,
            registerPage: false,
            adminMatchesPage: false,
            adminUsersPage: false,
            ekstraklasaPage: false
        };
        this.onChangeLoginPage = this.onChangeLoginPage.bind(this);
        this.onChangeRegisterPage = this.onChangeRegisterPage.bind(this);
        this.onChangeAdminMatchesPage = this.onChangeAdminMatchesPage.bind(this);
        this.onChangeAdminUsersPage = this.onChangeAdminUsersPage.bind(this);
        this.onChangeEkstraklasaPage = this.onChangeEkstraklasaPage.bind(this);
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
            this.onChangeLoginPage()
            return <Redirect to='/ekstraklasa'/>
        }

        let logoutButton = (
            <div>
                <div className="form-group row">
                    <div className="pl-3">
                        <button type="submit" className="btn btn-primary"
                                onClick={() => this.props.authorizationFunctions.logOut()}>Log Out
                        </button>
                    </div>
                </div>
            </div>
        )
        let topMenu
        if (this.props.user === null) {
            topMenu = (
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <div className="xdd">
                        <Button onClick={this.onChangeLoginPage}>Sign In</Button>{' '}
                        <Button onClick={this.onChangeRegisterPage}>Sign Up</Button>{' '}
                    </div>
                </Navbar>
            )
        } else if (this.props.user.role === "ROLE_USER") {
            topMenu = (
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    {logoutButton}
                </Navbar>
            )
        } else {
            topMenu = (
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <div className="xdd">
                        {logoutButton}
                        <Button onClick={this.onChangeEkstraklasaPage}>Ekstraklasa</Button>{' '}
                        <Button onClick={this.onChangeAdminMatchesPage}>Administration Matches</Button>{' '}
                        <Button onClick={this.onChangeAdminUsersPage}>Administration Users</Button>{' '}
                    </div>
                </Navbar>
            )
        }

        return (
            <div>
                {topMenu}
            </div>
        )
    }

}

export default Menu;
