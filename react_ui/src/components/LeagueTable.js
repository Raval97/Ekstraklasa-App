import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RowOfTeam from "./RowOfTeam";

class LeagueTable extends Component {

    render() {
        let sortedTeams = this.props.teams
            .sort((a, b) => ((a.points < b.points) || ((a.goalsScores - a.goalsLoses) < (b.goalsScores - b.goalsLoses))))
        let teams = sortedTeams.map((team, index) => {
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
            <div className="w-50 p-3">
                <div className="row justify-content-center">
                    <h1 style={{fontSize: "3vw", color: "#ecf6fa"}}>Ekstraklasa Table</h1>
                </div>

                <table className="table table-striped table-info" style={{fontSize: "1vw"}}>
                    <thead className="thead-info">
                    <tr>
                        <th>Pos.</th>
                        <th>Name</th>
                        <th>Points</th>
                        <th>M</th>
                        <th>Goals</th>
                        <th>Wins</th>
                        <th>Draws</th>
                        <th>Loses</th>
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
