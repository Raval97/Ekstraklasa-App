import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RowOfTeam from "./RowOfTeam";

class LeagueTable extends Component {

    render() {
        var teams = this.props.teams.map((team, index) => {
            return <RowOfTeam key={team.id}
                              id={index + 1}
                              name={team.name}
                              points={team.points}
                              goalsScores={team.goalsScores}
                              goalsLoses={team.goalsLoses}
                              wins={team.wins}
                              draws={team.draws}
                              loses={team.loses}/>
        })

        return (
            <div>
                <div className="row justify-content-center">
                    <h1>Ekstraklasa Table</h1>
                </div>

                <table className="table table-striped table-dark">
                    <thead className="thead-dark">
                    <tr>
                        <td>Position</td>
                        <td>Name</td>
                        <td>Points</td>
                        <td>Gaols</td>
                        <td>Wins</td>
                        <td>Draws</td>
                        <td>Loses</td>
                    </tr>
                    </thead>
                    <tbody>
                    {teams}
                    </tbody>
                </table>
            </div>
        )
    }
}

LeagueTable.propTypes = {
    teams: PropTypes.arrayOf(PropTypes.object)
};

export default LeagueTable;
