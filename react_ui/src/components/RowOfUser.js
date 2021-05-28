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
        let confirmButton = (
            <Button className="btn" variant="Secondary" style={{fontSize: "1.5vw", minWidth: "130px", cursor: "default"}}>Edit</Button>
        )
        if (this.props.role !== this.state.permissions)
            confirmButton = (
                <Button className="btn" variant="Success" style={{fontSize: "1.5vw", minWidth: "130px"}}
                        onClick={() => this.props.callbackFunctions.editPermission(this.props.id, this.state.permissions)}>
                    Confirm
                </Button>
            )
        return (
            <tr>
                <td className="col-4">{this.props.nazwa}</td>
                <td className="col-4">
                    <select className="form-control" onChange={this.onChangePermissions} value={this.state.permissions}>
                        <option key={0} value='USER'>User</option>
                        <option key={1} value='ADMIN'>Admin</option>
                    </select>
                </td>
                <td className="col-4">
                    {confirmButton}
                </td>
            </tr>
        )
    }
}

export default RowOfUser;
