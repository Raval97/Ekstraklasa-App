import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from "react-bootstrap/Button";

class RowOfMatch extends Component {

    render() {
        let deleteOptions, editOptions
        if (this.props.adminPermissions !== undefined && this.props.adminPermissions === true) {
            deleteOptions = (
                <td>
                    <Button variant="info" onClick={() => this.props.callbackFunctions.deleteMatch(this.props.id)}>
                        Delete
                    </Button>
                </td>)
            editOptions = (
                <td>
                    <Button variant="info"
                            onClick={() => this.props.callbackFunctions.setMatchPanelToEdit(this.props.id)}>
                        Edit
                    </Button>
                </td>
            )
        }

        return (
            <tbody>
            <tr>
                <td>{this.props.place}</td>
                <td>{this.props.data}</td>
                <td>{this.props.homeTeam.name}</td>
                <td>{this.props.homeScore} : {this.props.awayScore} </td>
                <td>{this.props.awayTeam.name}</td>
                {editOptions}
                {deleteOptions}
            </tr>
            </tbody>
        )
    }
}

RowOfMatch.propTypes = {
    id: PropTypes.number,
    place: PropTypes.string,
    date: PropTypes.string,
    homeTeam: PropTypes.object,
    homeScore: PropTypes.number,
    awayTeam: PropTypes.object,
    awayScore: PropTypes.number,
    round: PropTypes.number,
    adminPermissions: PropTypes.bool,
    teams: PropTypes.arrayOf(PropTypes.object),
    callbackFunctions: PropTypes.object
};

export default RowOfMatch;
