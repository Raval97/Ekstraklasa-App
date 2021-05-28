import React, {Component} from 'react';
import RowOfUser from "../components/RowOfUser";
import {encode as base64_encode} from "base-64";
import {Redirect} from "react-router";
import PropTypes from "prop-types";


class AdministrationUsers extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            info: {
                show: false,
                text: "",
                success: false
            }
        };
    }

    componentDidMount() {
        this.readUsers()
    }

    readUsers() {
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + base64_encode(this.props.user.username + ":" + this.props.user.password));
        fetch("http://localhost:8080/Ekstraklasa/users", {method: 'GET', headers: headers,})
            .then(res => res.json())
            .then((result) => {
                    this.setState({
                        users: result.users
                    });
                },
                (error) => {
                    console.error(error)
                }
            )
    }

    editPermission(id) {
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + base64_encode(this.props.user.username + ":" + this.props.user.password));
        fetch("http://localhost:8080/Ekstraklasa/users/" + id, {method: 'PUT', headers: headers,})
            .then((result) => {
                this.readUsers()
                this.setState({
                    info: {show: true, text: "Successful update user permission", success: true}
                })
            }, (error) => {
                console.log(error);
                this.setState({
                    info: {show: true, text: "Failure update user permission", success: false}
                })
            });
    }

    render() {
        let info
        if (this.props.user === null) {
            return <Redirect to='/login'/>;
        }
        let users = this.state.users.sort((a, b) => (a.id > b.id))
        let index = users.findIndex((user) => user.username === this.props.user.username)
        if (index !== -1) {
            users.splice(index, 1)
        }
        if (this.state.info.show) {
            let bgColor = this.state.info.success === true ? "#639925" : "#a1072c"
            info = (
                <div className="mx-auto p-1 mb-3 text-center w-50"
                     style={{backgroundColor: bgColor, color: "#fff", fontSize: "1.5vw"}}>
                    {this.state.info.text}
                </div>
            )
        }
        users = users.map(user => {
            return <RowOfUser key={user.id}
                              id={user.id}
                              nazwa={user.username}
                              role={user.role}
                              callbackFunctions={{
                                  editPermission: this.editPermission.bind(this)
                              }}/>
        })

        return (
            <div className="mx-auto mt-3 p-3" style={{backgroundColor: "#114666", width: "100%"}}>
                <h1 className="text-center" style={{fontSize: "3vw", color: "#ecf6fa"}}> Users</h1>
                {info}
                <table className="mx-auto table table-striped mt-3 w-75 text-center"
                       style={{fontSize: "1.5vw", backgroundColor: "#7eb1d5", color: "#0f091d"}}>
                    <thead className="thead-info">
                    <tr>
                        <th>Username</th>
                        <th>Permissions</th>
                        <th>Edit</th>
                    </tr>
                    </thead>
                    <tbody className="tbody-info">
                    {users}
                    </tbody>
                </table>
            </div>
        )
    }
}

AdministrationUsers.propTypes = {
    user: PropTypes.object
};

export default AdministrationUsers;
