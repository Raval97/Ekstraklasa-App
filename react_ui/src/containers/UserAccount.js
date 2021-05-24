import React, {Component} from "react";
import {Redirect} from "react-router";
import Button from 'react-bootstrap/Button';
import FavouriteTeamsForm from "../components/FavouriteTeamsForm";
import AccountSettingsForm from "../components/AccountSettingsForm";

class UserAccount extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            favouriteTeams: [],
            homePage: false,
            registerPage: false,
            validInputData: false
        };
        this.onChangeHomePage = this.onChangeHomePage.bind(this);
        this.onChangeLoginPage = this.onChangeLoginPage.bind(this);
        this.onChangeValidInputData = this.onChangeValidInputData.bind(this);
    }

    onChangeHomePage() {
        this.setState({
            homePage: !this.state.homePage
        })
    }

    onChangeLoginPage() {
        this.setState({
            registerPage: !this.state.registerPage
        })
    }

    onChangeValidInputData() {
        this.setState({
            validInputData: !this.validInputData
        })
    }

    changeUsername(nick) {
        this.setState({
            username: nick
        })
    }

    changePassword(password) {
        this.setState({
            password: password
        })
    }

    updateFavouriteTeams(teams) {
        this.setState({
            favouriteTeams: teams
        })
    }

    register(){
        this.setState({validInputData: false})
        if(this.state.username.length > 3 && this.state.password.length > 3)
            this.props.authorizationFunctions.addNewUser(this.state)
        else
            this.onChangeValidInputData()
    }

    render() {
        if (this.props.successRegister === true) {
            return <Redirect to='/login'/>
        }

        let errorBody = (this.state.validInputData ? "to short username or password" : "Username is not unique")
        let error
        if (this.props.failedOperation || this.state.validInputData) {
            error = (
                <div className="mx-auto p-1 mb-3 text-center"
                     style={{backgroundColor: "#a1072c", color: "#fff", fontSize: "1.5vw", width: "35%"}}>
                    {errorBody}
                </div>
            )
        }

        return (
            <div className="mx-auto mt-3 p-3" style={{backgroundColor: "#114666", width: "100%"}}>
                <div className="mx-auto" style={{width: "90%"}}>
                    <h1 className="text-center" style={{fontSize: "3vw", color: "azure"}}>User Account Settings</h1>
                    {error}
                </div>
                <div className="mx-auto" style={{backgroundColor: "#a5d2ea", width: "90%"}}>
                    <div className="d-flex justify-content-lg-center py-3">
                        <div className="w-50 px-3">
                            <AccountSettingsForm callbackFunctions={{
                                changeUsername: this.changeUsername.bind(this),
                                changePassword: this.changePassword.bind(this),
                            }}/>
                            <div className="mx-auto mt-3  w-50">
                                <Button className="btn btn-warning px-5" style={{fontSize: "1.5vw"}}
                                        onClick={() => this.register()}> Update </Button>
                            </div>
                        </div>
                        <div className="w-75">
                            <FavouriteTeamsForm teams={this.props.teams}
                                                callbackFunctions={{updateFavouriteTeams: this.updateFavouriteTeams.bind(this)}}

                            />
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export default UserAccount;
