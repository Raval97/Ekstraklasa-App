import React, {Component} from "react";
import {Redirect} from "react-router";
import Button from 'react-bootstrap/Button';

class SignUpPage extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            favouriteTeams: [],
            ekstraklasaPage: false
        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEkstraklasaPage = this.onChangeEkstraklasaPage.bind(this);
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

    onChangeEkstraklasaPage() {
        this.setState({
            ekstraklasaPage: !this.state.ekstraklasaPage
        })
    }

    selectTeam(id) {
        let newState = this.state.favouriteTeams
        let index = newState.findIndex((value) => value === id)
        if (index !== -1) {
            newState.splice(index, 1)
            this.setState({
                favouriteTeams: newState
            })
        } else {
            newState.push(id)
            this.setState({
                favouriteTeams: newState
            })
        }
    }

    render() {
        console.log(this.props)
        if (this.state.ekstraklasaPage) {
            this.onChangeEkstraklasaPage()
            return <Redirect to='/ekstraklasa/home'/>
        }
        if (this.props.successRegister === true) {
            return <Redirect to='/login'/>
        }

        let optionsTeams = (this.props.teams.map(team => {
            return (
                <tr key={team.id}
                    className={this.state.favouriteTeams.findIndex((value) => value === team.id) === -1 ?
                        "table-danger" : "table-warning"} >
                    <td  key={team.id} onClick={() => this.selectTeam(team.id)}>
                        {team.name}
                    </td>
                </tr>
            )
        }))
        let inputTeams = (
            <div className="input-container">
            <label></label>
            <div className="row justify-content-center">
                    <h3>Wybierz ulubione druzyny</h3>
            </div>
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th>username</th>
                </tr>
                </thead>
                <tbody>
                    {optionsTeams}
                </tbody>
            </table>
        </div>)

        return (
            <div className="container bg-secondary">
                <Button onClick={this.onChangeEkstraklasaPage}>EKSTRAKLASA</Button>
                <div className="registration">
                    <div className="row justify-content-center">
                            <h1>Registration</h1>
                    </div>
                    <div className="row justify-content-center mt-5">
                        <label className="col-6">Username</label>{" "}
                        <input type="text" onChange={this.onChangeName}/>
                    </div>

                    <div className="row justify-content-center mt-2">
                        <label className="col-6">Password</label>{" "}
                        <input type="password" onChange={this.onChangePassword}/>
                    </div>
                    <div className="row justify-content-center mt-5">
                    {inputTeams}
                    </div>
                    <div className="row justify-content-center">
                    {this.state.username.length > 3 && this.state.password.length > 3 ?
                        <Button className="btn btn-warning  mx-auto mt-5"
                                onClick={() => this.props.authorizationFunctions.addNewUser(this.state)}> Register </Button> :
                        <button className="btn btn-warning  mx-auto mt-5" disabled> Register </button>}
                    </div>
                </div>
            </div>
        )
    }

}

export default SignUpPage;
