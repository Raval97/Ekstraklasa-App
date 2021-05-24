import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from "react-bootstrap/Button";
import EditMatchPanel from "./EditMatchPanel";

class RowOfMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditMatchPanel: false
        };
        this.onChangeShowEditMatchPanel = this.onChangeShowEditMatchPanel.bind(this);
    }

    onChangeShowEditMatchPanel(e) {
        this.setState({
            showEditMatchPanel: !this.state.showEditMatchPanel
        })
    }


    render() {
        let deleteOptions, editOptions, editPanel
        if (this.props.adminPermisions !== undefined && this.props.adminPermisions === true) {
            deleteOptions = (
                <td>
                    <Button variant="info" onClick={() => this.props.callbackFunctions.deleteMatch(this.props.id)}>
                        Delete
                    </Button>
                </td>)
            editOptions = (
                <td>
                    <Button variant="info" onClick={this.onChangeShowEditMatchPanel}>Edit</Button>
                </td>
            )
        }
        if (this.state.showEditMatchPanel === true) {
            editPanel = (
                <EditMatchPanel id={this.props.id}
                                place={this.props.place}
                                date={this.props.data}
                                homeTeam={this.props.homeTeam.id}
                                homeScore={this.props.homeScore}
                                awayTeam={this.props.awayTeam.id}
                                awayScore={this.props.awayScore}
                                round={this.props.round}
                                teams={this.props.teams}
                                callbackFunctions={this.props.callbackFunctions}
                />
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
            {editPanel}
            </tbody>
        )
    }
}

RowOfMatch.propTypes = {
    id: PropTypes.number,
    place: PropTypes.string,
    date: PropTypes.string,
    homeTeam:PropTypes.object,
    homeScore: PropTypes.number,
    awayTeam: PropTypes.object,
    awayScore: PropTypes.number,
};

export default RowOfMatch;
