import React, {Component} from "react";
import {Redirect} from "react-router";
import Button from 'react-bootstrap/Button';
import FavouriteTeamsForm from "../components/FavouriteTeamsForm";
import AccountSettingsForm from "../components/AccountSettingsForm";
import MenuSignInAndSignUp from "../components/MenuSignInAndSignUp";

class SignUpPage extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            favouriteTeams: [],
            validInputData: false,
            response: {}
        };
       this.onChangeValidInputData = this.onChangeValidInputData.bind(this);
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

    async register(){
        this.setState({validInputData: false})
        if(this.state.username.length > 3 && this.state.password.length > 3){
            let resp = await this.props.authorizationFunctions.addNewUser(this.state)
            this.setState({response: resp})
        }
        else
            this.onChangeValidInputData()
    }

    render() {
        if (this.state.response.success !== undefined && this.state.response.success === true) {
            return <Redirect to='/login'/>
        }
        let errorBody = (this.state.validInputData ? "to short username or password" : this.state.response.message)
        let error
        if ((this.state.response.success !== undefined && this.state.response.success === false) || this.state.validInputData) {
            error = (
                <div className="mx-auto p-1 mb-3 text-center"
                     style={{backgroundColor: "#a1072c", color: "#fff", fontSize: "1.5vw", width: "35%"}}>
                    {errorBody}
                </div>
            )
        }

        return (
            <div className="mx-auto w-75 mt-3 p-3" style={{backgroundColor: "#49a1d5"}}>
                <div className="mx-auto " style={{width: "90%"}}>
                    <MenuSignInAndSignUp actualSite={"Sign_Up"}
                                         callbackFunctions={this.props.authorizationFunctions}/>
                </div>
                <div className="mx-auto" style={{width: "90%"}}>
                    <h1 className="text-center" style={{fontSize: "3vw", color: "azure"}}>Registration</h1>
                    {error}
                </div>
                <div className="mx-auto" style={{backgroundColor: "#a5d2ea", width: "90%"}}>
                    <div className="d-flex justify-content-lg-center py-3">
                        <div className="w-50 px-3">
                            <AccountSettingsForm callbackFunctions={{
                                changeUsername: this.changeUsername.bind(this),
                                changePassword: this.changePassword.bind(this),
                            }}/>
                        </div>
                        <div className="w-75">
                            <FavouriteTeamsForm teams={this.props.teams}
                                                callbackFunctions={{updateFavouriteTeams: this.updateFavouriteTeams.bind(this)}}

                            />
                        </div>
                    </div>
                    <div className="row justify-content-center pb-2">
                        <Button className="btn btn-warning  mx-auto mt-1" style={{fontSize: "1.5vw"}}
                                onClick={() => this.register()}> Register </Button>
                    </div>
                </div>

            </div>
        )
    }

}

export default SignUpPage;
