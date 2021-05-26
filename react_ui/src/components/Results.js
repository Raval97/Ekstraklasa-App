import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RowOfMatch from "./RowOfMatch";
import FavouriteTeamsFilter from "./OptionsFilterComponents/FavouriteTeamsFilter";
import TeamFilter from "./OptionsFilterComponents/TeamFilter";
import InputNumberFilter from "./OptionsFilterComponents/InputNumberFilter";

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queryTeamName: 0,
            queryRound: 0,
            queryScore: -1,
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
                this.props.favouriteTeams.includes(match.homeTeam.id) ||
                this.props.favouriteTeams.includes(match.awayTeam.id)
            )
        if (this.state.queryTeamName > 0)
            matches = matches.filter(match =>
                parseInt(match.homeTeam.id) === parseInt(this.state.queryTeamName) ||
                parseInt(match.awayTeam.id) === parseInt(this.state.queryTeamName))
        if (this.state.queryRound > 0)
            matches = matches.filter(match => parseInt(match.round) === parseInt(this.state.queryRound))
        if (this.state.queryScore >= 0)
            matches = matches.filter(match => (parseInt(match.awayScore) + parseInt(match.homeScore)) === parseInt(this.state.queryScore))
        return matches
    }

    render() {
        let filteredMatches = this.setFilteredMatches()
        filteredMatches = filteredMatches.map(FilteredMatch => {
            return <RowOfMatch key={FilteredMatch.id}
                               place={FilteredMatch.place}
                               data={FilteredMatch.date}
                               homeTeam={FilteredMatch.homeTeam}
                               homeScore={FilteredMatch.homeScore}
                               awayTeam={FilteredMatch.awayTeam}
                               awayScore={FilteredMatch.awayScore}/>
        })

        return (
            <section className="text-center text-white w-50 px-1 pt-3">
                <div className="row justify-content-center">
                    <h1 style={{fontSize: "3vw", color: "#ecf6fa"}}>Results</h1>
                </div>
                <div className="row mt-3 w-100 mx-auto">
                    <div className="d-flex justify-content-between w-100">
                        <TeamFilter favouriteTeams={this.props.favouriteTeams} teams={this.props.teams}
                                    noSpecified={true}
                                    onlyFavoritesTeams={this.state.onlyFavoritesTeams} label={'Team'}
                                    callbackFunctions={{
                                        onChangeTeamName: this.onChangeTeamName.bind(this),
                                    }}/>
                        <InputNumberFilter label={'Round'} length={16} start={1}
                                           callbackFunctions={{
                                               onChangeValue: this.onChangeRound.bind(this)
                                           }}/>
                        <InputNumberFilter label={'Goals'} length={15} start={0}
                                           callbackFunctions={{
                                               onChangeValue: this.onChangeScore.bind(this)
                                           }}/>
                    </div>
                    <FavouriteTeamsFilter favouriteTeams={this.props.favouriteTeams} matches={this.props.matches}
                                          teams={this.props.teams} onlyFavoritesTeams={this.state.onlyFavoritesTeams}
                                          callbackFunctions={{
                                              handleChangeOFT: this.handleChangeOFT.bind(this)
                                          }}/>
                    <div className="row mt-3 mb-2 w-100 mx-auto">
                        <table className="table table-striped table-light" style={{fontSize: "1vw"}}>
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
