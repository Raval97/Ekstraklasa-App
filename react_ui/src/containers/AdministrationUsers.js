import React, {Component} from 'react';
import RowOfUser from "../components/RowOfUser";
import {encode as base64_encode} from "base-64";


class AdministrationUsers extends Component {
    constructor() {
        super();
        this.state = {
            users: []
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
                    console.log(result)
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
        fetch("http://localhost:8080/Ekstraklasa/users/"+id, {method: 'PUT', headers: headers,})
            .then((result) => {
                this.readUsers()
            }, (error) => {
                console.log(error);
            });
    }

    render() {
        let users = this.state.users.sort((a, b) => (a.id > b.id))

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
            <div className="row mt-3 w-100 mx-auto">
                <h1 className="mx-auto "> Users</h1>
                <table className="table table-striped table-dark mt-3">
                    <thead className="thead-dark">
                    <tr>
                        <th>Username</th>
                        <th>Permissions</th>
                        <th>Edit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AdministrationUsers;
