import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import RowOfMatch from "../components/RowOfMatch";
import TeamFilter from "../components/OptionsFilterComponents/TeamFilter";
import RoundFilter from "../components/OptionsFilterComponents/RoundFilter";
import CountOfGoalsFilter from "../components/OptionsFilterComponents/CountOfGoalsFilter";
import NewMatchForm from "../components/NewMatchForm";
import axios from "axios";
import {encode as base64_encode} from "base-64";

class AdministrationMatches extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queryTeamName: 0,
            queryRound: 0,
            queryScore: 0,
            showNewMatchPanel: false
        };
        this.onChangeTeamName = this.onChangeTeamName.bind(this);
        this.onChangeRound = this.onChangeRound.bind(this);
        this.onChangeScore = this.onChangeScore.bind(this);
        this.onChangeShowNewMatchPanel = this.onChangeShowNewMatchPanel.bind(this);
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

    onChangeShowNewMatchPanel(e) {
        this.setState({
            showNewMatchPanel: !this.state.showNewMatchPanel
        })
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

    addNewMatch(team) {
        console.log(team)
        axios.post("http://localhost:8080/Ekstraklasa/dashboard/matches", {
            homeTeam: team.homeTeam,
            awayTeam: team.awayTeam,
            homeScore: team.homeScore,
            awayScore: team.awayScore,
            round: team.round,
            place: team.place,
            date: team.date
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64_encode(this.props.user.username + ":" + this.props.user.password)
            }
        })
            .then((result) => {
                this.props.callbackFunctions.readMatches()
                return true
            }, (error) => {
                console.log(error);
                return false
            });
        return true
    }

    deleteMatch(id) {
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + base64_encode(this.props.user.username + ":" + this.props.user.password));
        fetch("http://localhost:8080/Ekstraklasa/dashboard/matches/" + id, {
            method: 'DELETE',
            headers: headers,
        })
            .then(res => res.json())
            .then((result) => {
                    console.log(result)
                    this.props.callbackFunctions.readMatches()
                },
                (error) => {
                    console.error(error)
                }
            )
    }

    render() {

        let filteredMatches = this.setFilteredMatches()
        filteredMatches = filteredMatches.map(FilteredMatch => {
            return <RowOfMatch key={FilteredMatch.id}
                               id={FilteredMatch.id}
                               place={FilteredMatch.place}
                               data={FilteredMatch.date}
                               homeTeam={FilteredMatch.homeTeam.name}
                               homeScore={FilteredMatch.homeScore}
                               awayTeam={FilteredMatch.awayTeam.name}
                               awayScore={FilteredMatch.awayScore}
                               adminPermisions={true}
                               teams={this.props.teams}
                               callbackFunctions={{
                                   deleteMatch: this.deleteMatch.bind(this),
                               }}
            />
        })

        let newMatchPanel = null
        if (this.state.showNewMatchPanel === true)
            newMatchPanel =
                <NewMatchForm teams={this.props.teams} callbakFunctions={{addNewMatch: this.addNewMatch.bind(this)}}/>

        return (
            <div className="checklist--add-list container">
                <Button className="float-right mt-3 mr-2" variant="info"
                        onClick={this.onChangeShowNewMatchPanel}>Add New Match</Button>
                {newMatchPanel}
                <div className="row mt-2 mx-auto">
                    <h1 className="mx-auto "> Mecze </h1>
                </div>

                <div className="row mt-3 w-100 mx-auto">
                    <TeamFilter favouriteTeams={this.props.favouriteTeams} matches={this.props.matches}
                                onlyFavoritesTeams={false} teams={this.props.teams}
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
                </div>

                <div className="row mx-auto mt-2">
                    <table className="table table-striped table-dark">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Place</th>
                            <th scope="col">Home Team</th>
                            <th scope="col">Result</th>
                            <th scope="col">Away Team</th>
                            <th scope="col">Delete</th>
                            <th scope="col">Edit</th>
                        </tr>
                        </thead>
                        {filteredMatches}
                    </table>
                </div>
            </div>
        )
    }
}

AdministrationMatches.propTypes = {
    mecze: PropTypes.arrayOf(PropTypes.object)
};

export default AdministrationMatches;
