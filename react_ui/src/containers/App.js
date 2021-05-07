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
            failedOperation: false,
            successRegister: false,
            teams: [],
            matches: [],
        };
    }

    componentDidMount() {
        this.readTeams()
        this.readMatches()
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

    logIn(login, password) {
        let targetUrl = 'http://localhost:8080/Ekstraklasa/login'
        let body = "username="+login+"&password="+password
        let headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        axios.post(targetUrl, body, {
            headers: headers
        }).then((response) => {
            let loggedUser ={
                username: login,
                password: password,
                role: response.data.role_user
            }
            this.setState({user: loggedUser})
            this.setState({failedOperation: false})
            this.setState({successLogout: false})
            this.setState({successRegister: false})
            this.readFavouriteTeams()
        }, (error) => {
            this.setState({failedOperation: true})
            this.setState({successLogout: false})
            this.setState({successRegister: false})
        })
    }

    addNewUser(object) {
        console.log(object)
        let targetUrl = 'http://localhost:8080/Ekstraklasa/signup'
        axios.post(targetUrl, {
            username: object.username,
            password: object.password,
            favouriteTeams: object.favouriteTeams
        }).then((response) => {
            this.setState({successRegister: true})
            this.setState({failedOperation: false})
            this.setState({successLogout: false})
        }, (error) => {
            this.setState({failedOperation: true})
            this.setState({successLogout: false})
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
                failedOperation={this.state.failedOperation}
                successRegister={this.state.successRegister}
                successLogout={this.state.successLogout}
                teams={this.state.teams}
                matches={this.state.matches}
                favouriteTeams={this.state.favouriteTeams}
                authorizationFunctions={{
                    logIn: this.logIn.bind(this),
                    logOut: this.logOut.bind(this),
                    addNewUser: this.addNewUser.bind(this)
                }}
                callbackFunctions={{
                    readTeams: this.readTeams.bind(this),
                    readMatches: this.readMatches.bind(this),
                    // readFavouriteTeams: this.readFavouriteTeams().bind(this)
                }}
            />
        );
    }
}

export default App;
