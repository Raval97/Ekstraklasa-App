import React, {Component} from "react";

class FavouriteTeamsForm extends Component {
    constructor() {
        super();
        this.state = {
            favouriteTeams: []
        };
    }

    selectTeam(id) {
        let newState = this.state.favouriteTeams
        let index = newState.findIndex((value) => value === id)
        if (index !== -1) {
            newState.splice(index, 1)
            this.setState({
                favouriteTeams: newState
            })
        } else {
            newState.push(id)
            this.setState({
                favouriteTeams: newState
            })
        }
        this.props.callbackFunctions.updateFavouriteTeams(this.state.favouriteTeams)
    }


    render() {

        let optionsTeams = (this.props.teams.map(team => {
            return (
                <div key={team.id} onClick={() => this.selectTeam(team.id)}
                     className="w-25 float-left b-1 p-1 teamBox"
                     style={this.state.favouriteTeams.findIndex((value) => value === team.id) === -1 ?
                         {backgroundColor: "#49a1d5"} : {backgroundColor: "#6820a8"}}>
                    {team.name.split(" ")[0]} <br></br> {team.name.split(" ")[1]}
                </div>
            )
        }))
        let inputTeams = (
            <div className="input-container p-1">
                {optionsTeams}
            </div>)

        return (
            <div style={{fontSize: 14}}>
                <h4 className="text-center" style={{fontSize: "2vw"}}>Favourite Teams</h4>
                {inputTeams}
            </div>
        )
    }

}

export default FavouriteTeamsForm;
