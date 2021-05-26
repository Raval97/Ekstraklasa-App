import React, {Component} from "react";
import {Redirect} from "react-router";
import Button from 'react-bootstrap/Button';
import FavouriteTeamsForm from "../components/FavouriteTeamsForm";
import AccountSettingsForm from "../components/AccountSettingsForm";
import * as axios from "axios";
import {encode as base64_encode} from "base-64";

class UserAccount extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            favouriteTeams: [],
            info: {
                show: false,
                text: "",
                success: false
            }
        };
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

    componentDidMount() {
        let temp = Object.assign([], this.props.favouriteTeams)
        this.setState({
            favouriteTeams: temp
        })
        this.setState({
            username: this.props.user.username
        })
        this.setState({
            password: this.props.user.password
        })
    }

    async updateFavouriteTeamsRequest(array) {
        let targetUrl = 'http://localhost:8080/Ekstraklasa/favourite_teams'
        await axios.put(targetUrl, {
            favouriteTeams: array
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64_encode(this.props.user.username + ":" + this.props.user.password)
            }
        }).then((response) => {
            this.setState({
                info: {show: true, text: "Successful update favourite teams", success: true}
            })
            this.props.callbackFunctions.readFavouriteTeams()
        }, (error) => {
            this.setState({
                info: {show: true, text: "Failure update favourite teams", success: false}
            })
        })
    }

    async updateUserCredentialsRequest() {
        let targetUrl = 'http://localhost:8080/Ekstraklasa/update_account'
        await axios.put(targetUrl, {
            username: this.state.username,
            password: this.state.password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64_encode(this.props.user.username + ":" + this.props.user.password)
            }
        }).then((response) => {
            this.setState({
                info: {show: true, text: "Successful update user credentials", success: true}
            })
            this.props.callbackFunctions.updateUser(this.state.username, this.state.password)
        }, (error) => {
            this.setState({
                info: {show: true, text: error.response.data.error, success: false}
            })
        })
    }

    async register() {
        let isChanged = false
        if (this.state.favouriteTeams.length !== this.props.favouriteTeams.length ||
            !this.state.favouriteTeams.every(x => this.props.favouriteTeams.includes(x))) {
            await this.updateFavouriteTeamsRequest(this.state.favouriteTeams)
            isChanged = true
        }
        if (this.state.password !== this.props.user.password || this.state.username !== this.props.user.username) {
            this.setState({validInputData: false})
            if (this.state.username.length > 3 && this.state.password.length > 3) {
                await this.updateUserCredentialsRequest()
                if(isChanged && this.state.info.success){
                    this.setState({
                        info: {show: true, text: "Successful update credentials and Favourite teams", success: true}
                    })
                }
            } else {
                this.setState({
                    info: {show: true, text: "to short username or password", success: false}
                })
            }
            isChanged = true
        }
        if (!isChanged) {
            this.setState({
                info: {show: true, text: "nothing changed", success: false}
            })
        }
    }

    render() {
        let info
        if (this.props.user === null)
            return <Redirect to='/login'/>;
        if (this.state.info.show) {
            let bgColor = this.state.info.success === true ? "#639925" : "#a1072c"
            info = (
                <div className="mx-auto p-1 mb-3 text-center w-50" style={{backgroundColor: bgColor, color: "#fff", fontSize: "1.5vw"}}>
                    {this.state.info.text}
                </div>
            )
        }

        return (
            <div className="mx-auto mt-3 p-3" style={{backgroundColor: "#114666", width: "100%"}}>
                <div className="mx-auto" style={{width: "90%"}}>
                    <h1 className="text-center" style={{fontSize: "3vw", color: "azure"}}>User Account Settings</h1>
                    {info}
                </div>
                <div className="mx-auto" style={{backgroundColor: "#a5d2ea", width: "90%"}}>
                    <div className="d-flex justify-content-lg-center py-3">
                        <div className="w-50 px-3">
                            <AccountSettingsForm user={this.props.user}
                                                 callbackFunctions={{
                                                     changeUsername: this.changeUsername.bind(this),
                                                     changePassword: this.changePassword.bind(this),
                                                 }}
                            />
                            <div className="mx-auto mt-3  w-50">
                                <Button className="btn btn-warning px-5" style={{fontSize: "1.5vw"}}
                                        onClick={() => this.register()}> Update </Button>
                            </div>
                        </div>
                        <div className="w-75">
                            <FavouriteTeamsForm teams={this.props.teams} favouriteTeams={this.props.favouriteTeams}
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
