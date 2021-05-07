import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TeamFilter extends Component {

    render() {
        let optionsTeams, inputTeams
        let optionTeamsTemp = (this.props.onlyFavoritesTeams === false) ? this.props.teams :
            this.props.teams.filter(team => this.props.favouriteTeams.includes(team.name))
        optionsTeams = (
            optionTeamsTemp.map(team => {
                return (
                    <option key={team.id} value={team.id}>
                        {team.name}
                    </option>
                )
            })
        )
        inputTeams = (
            <div className="input-container">
                <label>Team</label>
                <select className="form-control" onChange={this.props.callbackFunctions.onChangeTeamName}>
                    <option key={0} value=''>No teams</option>
                    {optionsTeams}
                </select>
            </div>
        )
        return (
            <div className="col-lg-4">
                <form>
                    {inputTeams}
                </form>
            </div>
        )
    }
}

TeamFilter.propTypes = {
    matches: PropTypes.arrayOf(PropTypes.object)
};

export default TeamFilter;
