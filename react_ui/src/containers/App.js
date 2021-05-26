import React, {Component} from "react";
import AppNavigation from "../routers/AppNavigation";
import * as axios from "axios";
import {encode as base64_encode} from "base-64";

class App extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
            successLogout: false,
            successRegister: false,
            teams: [],
            matches: [],
            favouriteTeams: []
        };
    }

    componentDidMount() {
        this.readTeams()
        this.readMatches()
    }

    resetInformation(){
        this.setState({successRegister: false});
        this.setState({successLogout: false});
    }

    readTeams() {
        fetch("http://localhost:8080/Ekstraklasa/dashboard/teams", {method: 'GET'})
            .then(res => res.json())
            .then((result) => {
                    this.setState({
                        teams: result.teams
                    });
                },
                (error) => {
                    console.error(error)
                }
            )
        return 0
    }

    readMatches() {
        fetch("http://localhost:8080/Ekstraklasa/dashboard/matches", {method: 'GET'})
            .then(res => res.json())
            .then((result) => {
                    this.setState({
                        matches: result.matches
                    });
                },
                (error) => {
                    console.error(error)
                }
            )
    }

    readFavouriteTeams() {
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + base64_encode(this.state.user.username + ":" + this.state.user.password));
        fetch("http://localhost:8080/Ekstraklasa/favourite_teams", {method: 'GET', headers: headers,})
            .then(res => res.json())
            .then((result) => {
                    this.setState({
                        favouriteTeams: result.teams
                    });
                },
                (error) => {
                    console.error(error)
                }
            )
    }

    async logIn(login, password) {
        let resp;
        let targetUrl = 'http://localhost:8080/Ekstraklasa/login'
        let body = "username="+login+"&password="+password
        let headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        await axios.post(targetUrl, body, {
            headers: headers
        }).then((response) => {
            let loggedUser ={
                username: login,
                password: password,
                role: response.data.role_user
            }
            this.setState({user: loggedUser})
            this.setState({successLogout: false})
            this.setState({successRegister: false})
            this.readFavouriteTeams()
            resp = {
                success: true,
                message: "Successful log in"
            }
        }, (error) => {
            this.setState({successLogout: false})
            this.setState({successRegister: false})
            resp = {
                success: false,
                message: "Invalid username or password"
            }
        })
        return resp
    }

    async addNewUser(object) {
        let resp
        let targetUrl = 'http://localhost:8080/Ekstraklasa/signup'
        await axios.post(targetUrl, {
            username: object.username,
            password: object.password,
            favouriteTeams: object.favouriteTeams
        }).then((response) => {
            this.setState({successRegister: true})
            this.setState({successLogout: false})
            resp = {
                success: true,
                message: "Successful create user"
            }

        }, (error) => {
            this.setState({successLogout: false})
            resp = {
                success: false,
                message: "Username is not unique"
            }
        })
        return resp
    }

    async updateUser(username, password){
        let temp = this.state.user
        temp.username = username
        temp.password = password
        await this.setState({
            user: temp
        })
    }

    logOut() {
        this.setState({user: null})
        this.setState({successLogout: true})
    }

    render() {
        return (
            <AppNavigation
                user={this.state.user}
                successRegister={this.state.successRegister}
                successLogout={this.state.successLogout}
                teams={this.state.teams}
                matches={this.state.matches}
                favouriteTeams={this.state.favouriteTeams}
                authorizationFunctions={{
                    logIn: this.logIn.bind(this),
                    logOut: this.logOut.bind(this),
                    addNewUser: this.addNewUser.bind(this),
                    resetInformation: this.resetInformation.bind(this)
                }}
                callbackFunctions={{
                    readTeams: this.readTeams.bind(this),
                    readMatches: this.readMatches.bind(this),
                    readFavouriteTeams: this.readFavouriteTeams.bind(this),
                    updateUser: this.updateUser.bind(this)
                }}
            />
        );
    }
}

export default App;
