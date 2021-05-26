import React, {Component} from 'react';

class TeamFilter extends Component {

    render() {
        let optionsTeams, inputTeams, noSpecified, label
        let optionTeamsTemp = this.props.teams
        if (this.props.onlyFavoritesTeams !== undefined && this.props.favouriteTeams !== undefined &&
            this.props.onlyFavoritesTeams === true)
            optionTeamsTemp = this.props.teams.filter(team => this.props.favouriteTeams.includes(team.id))
        optionsTeams = (
            optionTeamsTemp.map(team => {
                return (
                    <option key={team.id} value={team.id} >
                        {team.name}
                    </option>
                )
            })
        )
        if(this.props.noSpecified === true) {
            noSpecified = (
                <option key={0} value=''>No teams</option>
            )
        }
        if(this.props.label !== true) {
            label = (
                <label>{this.props.label}</label>
            )
        }
        inputTeams = (
            <div className="" style={{marginTop:"-10px"}}>
                {label}
                <select className="form-control" onChange={this.props.callbackFunctions.onChangeTeamName}>
                    {noSpecified}
                    {optionsTeams}
                </select>
            </div>
        )
        return (
                <form style={{fontSize: "2vw"}}>
                    {inputTeams}
                </form>
        )
    }
}

export default TeamFilter;
