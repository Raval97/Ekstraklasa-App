import React, {Component} from 'react';
import LeagueTable from "../components/LeagueTable";
import Results from "../components/Results";

class EkstraklasaPage extends Component {

    render() {
        return (
            <div className="row mx-auto mt-3 df-flex justify-content-center w-100" style={{backgroundColor: "#114666"}}>
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
