import React, {Component} from 'react';
import LeagueTable from "../components/LeagueTable";
import Results from "../components/Results";

class EkstraklasaPage extends Component {

    render() {
        return (
            <div>
                <LeagueTable teams = {this.props.teams}/>
                <Results
                    favouriteTeams={this.props.favouriteTeams}
                    matches={this.props.matches}
                    teams={this.props.teams}
                />
            </div>
        )
    }
}

export default EkstraklasaPage;
