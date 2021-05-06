import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RowOfMatch from "./RowOfMatch";
import FavouriteTeamsFilter from "./OptionsFilterComponents/FavouriteTeamsFilter";
import RoundFilter from "./OptionsFilterComponents/RoundFilter";
import TeamFilter from "./OptionsFilterComponents/TeamFilter";
import CountOfGoalsFilter from "./OptionsFilterComponents/CountOfGoalsFilter";

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queryTeamName: 0,
            queryRound: 0,
            queryScore: 0,
            onlyFavoritesTeams: false
        };
        this.onChangeTeamName = this.onChangeTeamName.bind(this);
        this.onChangeRound = this.onChangeRound.bind(this);
        this.onChangeScore = this.onChangeScore.bind(this);
        this.handleChangeOFT = this.handleChangeOFT.bind(this);
    }

    onChangeTeamName(e) {
        this.setState({
            queryTeamName: e.target.value
        })
    }
    onChangeRound(e) {
        this.setState({
            queryRound: e.target.value
        })
    }
    onChangeScore(e) {
        this.setState({
            queryScore: e.target.value
        })
    }
    handleChangeOFT(checked) {
        this.setState({onlyFavoritesTeams: checked});
    }

    setFilteredMatches() {
        let matches = this.props.matches
        if (this.state.onlyFavoritesTeams === true)
            matches = matches.filter(match =>
                this.props.favouriteTeams.includes(match.homeTeam.name) ||
                this.props.favouriteTeams.includes(match.awayTeam.name)
            )
        if (this.state.queryTeamName > 0)
            matches = matches.filter(match =>
                parseInt(match.homeTeam.id) === parseInt(this.state.queryTeamName) ||
                parseInt(match.awayTeam.id) === parseInt(this.state.queryTeamName))
        if (this.state.queryRound > 0)
            matches = matches.filter(match => parseInt(match.round) === parseInt(this.state.queryRound))
        if (this.state.queryScore > 0)
            matches = matches.filter(match => (parseInt(match.awayScore) + parseInt(match.homeScore)) === parseInt(this.state.queryScore))
        return matches
    }

    render() {
        let filteredMatches = this.setFilteredMatches()
        filteredMatches = filteredMatches.map(FilteredMatch => {
            return <RowOfMatch key={FilteredMatch.id}
                               place={FilteredMatch.place}
                               data={FilteredMatch.date}
                               homeTeam={FilteredMatch.homeTeam.name}
                               homeScore={FilteredMatch.homeScore}
                               awayTeam={FilteredMatch.awayTeam.name}
                               awayScore={FilteredMatch.awayScore}/>
        })

        return (
            <section className="text-center bg-danger text-white">
                <div className="row justify-content-center">
                    <h1 className="text-white mt-3 ">Results</h1>
                </div>
                <div className="row mt-3 w-100 mx-auto">
                    <TeamFilter favouriteTeams={this.props.favouriteTeams} matches={this.props.matches}
                                onlyFavoritesTeams={this.state.onlyFavoritesTeams} teams={this.props.teams}
                                queryTeamName={this.state.queryTeamName}
                                callbackFunctions={{
                                    onChangeTeamName: this.onChangeTeamName.bind(this),
                                }}/>
                    <RoundFilter matches={this.props.matches} queryRound={this.state.queryRound}
                                 callbackFunctions={{
                                     onChangeRound: this.onChangeRound.bind(this)
                                 }}/>
                    <CountOfGoalsFilter matches={this.props.matches} queryScore={this.state.queryScore}
                                        callbackFunctions={{
                                            onChangeScore: this.onChangeScore.bind(this)
                                        }}/>
                    <FavouriteTeamsFilter favouriteTeams={this.props.favouriteTeams} matches={this.props.matches}
                                          teams={this.props.teams} onlyFavoritesTeams={this.state.onlyFavoritesTeams}
                                          callbackFunctions={{
                                              handleChangeOFT: this.handleChangeOFT.bind(this)
                                          }}/>
                    <div className="row mt-5 mb-5 w-100 mx-auto">
                        <table className="table table-striped table-light">
                            <thead>
                            <tr>
                                <th>Place</th>
                                <th>Date</th>
                                <th>Home Team</th>
                                <th>Result</th>
                                <th>Away Team</th>
                            </tr>
                            </thead>
                            {filteredMatches}
                        </table>
                    </div>
                </div>
            </section>
        )
    }
}

Results.propTypes = {
    matches: PropTypes.arrayOf(PropTypes.object)
};

export default Results;
