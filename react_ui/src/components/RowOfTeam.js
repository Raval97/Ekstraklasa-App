import React, {Component} from 'react';
import PropTypes from 'prop-types';

class RowOfTeam extends Component {

    render() {
        let countOfMatches = this.props.wins + this.props.draws + this.props.loses
        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.name}</td>
                <td>{this.props.points}</td>
                <td>{countOfMatches}</td>
                <td>{this.props.goalsScores} | {this.props.goalsLoses}</td>
                <td>{this.props.wins}</td>
                <td>{this.props.draws}</td>
                <td>{this.props.loses}</td>
            </tr>
        )
    }
}

RowOfTeam.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    points: PropTypes.number,
    goalsScores: PropTypes.number,
    goalsLoses: PropTypes.number,
    wins: PropTypes.number,
    draws: PropTypes.number,
    loses: PropTypes.number
};

export default RowOfTeam;
