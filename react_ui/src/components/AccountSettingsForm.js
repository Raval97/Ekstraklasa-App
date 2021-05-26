import React, {Component} from "react";

class AccountSettingsForm extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onChangeName(e) {
        this.setState({
            username: e.target.value
        })
        this.props.callbackFunctions.changeUsername(e.target.value)
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
        this.props.callbackFunctions.changePassword(e.target.value)
    }

    componentDidMount() {
        if(this.props.user !== undefined){
            this.setState({
                username: this.props.user.username
            })
            this.setState({
                password: this.props.user.password
            })
        }
    }


    render() {
        return (
            <div>
                <h4 className="text-center" style={{fontSize: "2vw"}}>Account Settings</h4>
                <div className="row p-3 mt-1 justify-content-lg-left">
                    <label className="col-3" style={{fontSize: "1.5vw"}}>Username</label>{" "}
                    <label className="col-2"> </label>
                    <input className="col-6" style={{fontSize: "1.5vw"}} type="text" onChange={this.onChangeName}  value={this.state.username}/>
                </div>
                <div className="row p-3 justify-content-lg-left">
                    <label className="col-3" style={{fontSize: "1.5vw"}}>Password</label>{" "}
                    <label className="col-2"> </label>
                    <input className="col-6" style={{fontSize: "1.5vw"}} type="password" onChange={this.onChangePassword} value={this.state.password}/>
                </div>
            </div>
        )
    }

}

export default AccountSettingsForm;
