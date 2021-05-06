import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';

class RowOfUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            permissions: this.props.role
        };
        this.onChangePermissions = this.onChangePermissions.bind(this);
    }

    onChangePermissions(e) {
        this.setState({
            permissions: e.target.value
        })
    }


    render() {
        let confirmButton = <Button className="btn btn-secondary btn-lg" variant="info">Edit</Button>
        if (this.props.role !== this.state.permissions)
            confirmButton = (
                <Button variant="info"
                        onClick={() => this.props.callbackFunctions.editPermission(this.props.id, this.state.permissions)}>
                    Confirm
                </Button>
            )
        return (
            <tr>
                <td>{this.props.nazwa}</td>
                <td>
                    <select className="form-control" onChange={this.onChangePermissions} value={this.state.permissions}>
                        <option key={0} value='USER'>User</option>
                        <option key={1} value='ADMIN'>Admin</option>
                    </select>
                </td>
                <td>
                    {confirmButton}
                </td>
            </tr>
        )
    }
}

export default RowOfUser;
