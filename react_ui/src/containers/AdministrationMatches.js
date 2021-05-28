import React, {Component} from 'react';
import TeamFilter from "../components/OptionsFilterComponents/TeamFilter";
import axios from "axios";
import {encode as base64_encode} from "base-64";
import InputNumberFilter from "../components/OptionsFilterComponents/InputNumberFilter";
import {Redirect} from "react-router";
import RowOfMatch from "../components/RowOfMatch";
import Button from "react-bootstrap/Button";
import NewMatchForm from "../components/NewMatchForm";
import PropTypes from "prop-types";

class AdministrationMatches extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queryTeamName: 0,
            queryRound: 1,
            queryScore: -1,
            matchPanelToCreate: true,
            matchToEdit: {},
            info: {
                show: false,
                text: "",
                success: false
            }
        };
        this.onChangeTeamName = this.onChangeTeamName.bind(this);
        this.onChangeRound = this.onChangeRound.bind(this);
        this.onChangeScore = this.onChangeScore.bind(this);
        this.setMatchPanelToEdit = this.setMatchPanelToEdit.bind(this);
        this.setMatchPanelToCreate = this.setMatchPanelToCreate.bind(this);
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

    setMatchPanelToEdit(id) {
        this.setState({
            matchPanelToCreate: false
        })
        this.readMatch(id)
        this.setState({
            info: {show: false, text: "", success: false}
        })
    }

    setMatchPanelToCreate() {
        this.setState({
            matchPanelToCreate: true
        })
        this.setState({
            info: {show: false, text: "", success: false}
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
        if (this.state.queryScore >= 0)
            matches = matches.filter(match => (parseInt(match.awayScore) + parseInt(match.homeScore)) === parseInt(this.state.queryScore))
        return matches
    }

    readMatch(id) {
        fetch("http://localhost:8080/Ekstraklasa/dashboard/matches/" + id, {method: 'GET'})
            .then(res => res.json())
            .then((result) => {
                    this.setState({
                        matchToEdit: result.match
                    });
                },
                (error) => {
                    console.error(error)
                }
            )
    }

    addNewMatch(match) {
        if (this.sameTeamNames(match)) {
            this.setState({
                info: {show: true, text: "Teams cannot be the same or empty", success: false}
            })
        } else {
            axios.post("http://localhost:8080/Ekstraklasa/dashboard/matches", {
                homeTeam: match.homeTeam,
                awayTeam: match.awayTeam,
                homeScore: match.homeScore,
                awayScore: match.awayScore,
                round: match.round,
                place: match.place,
                date: match.date
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + base64_encode(this.props.user.username + ":" + this.props.user.password)
                }
            })
                .then((result) => {
                    this.props.callbackFunctions.readMatches()
                    this.props.callbackFunctions.readTeams()
                    this.setState({
                        info: {show: true, text: "Successful create match", success: true}
                    })
                }, (error) => {
                    this.setState({
                        info: {show: true, text: "Unsuccessful request, set all data", success: false}
                    })
                });
        }
    }

    matchesEquals(oldMatch, newMatch) {
        return (oldMatch.date === newMatch.date && oldMatch.round === newMatch.round &&
            oldMatch.place === newMatch.place && oldMatch.homeTeam.id === newMatch.homeTeam &&
            oldMatch.awayTeam.id === newMatch.awayTeam && oldMatch.homeScore === newMatch.homeScore &&
            oldMatch.awayScore === newMatch.awayScore)
    }

    sameTeamNames(match) {
        return (match.homeTeam === match.awayTeam)
    }

    editMatch(match, id) {
        if (this.matchesEquals(this.state.matchToEdit, match)) {
            this.setState({
                info: {show: true, text: "Nothing changed", success: false}
            })
        } else if (this.sameTeamNames(match)) {
            this.setState({
                info: {show: true, text: "Teams cannot be the same or empty", success: false}
            })
        } else {
            axios.put("http://localhost:8080/Ekstraklasa/dashboard/matches/" + id, {
                homeTeam: match.homeTeam,
                awayTeam: match.awayTeam,
                homeScore: match.homeScore,
                awayScore: match.awayScore,
                round: match.round,
                place: match.place,
                date: match.date
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + base64_encode(this.props.user.username + ":" + this.props.user.password)
                }
            })
                .then((result) => {
                    this.props.callbackFunctions.readMatches()
                    this.props.callbackFunctions.readTeams()
                    this.readMatch()
                    this.setState({
                        info: {show: true, text: "Successful update match", success: true}
                    })
                }, (error) => {
                    this.setState({
                        info: {show: true, text: "Unsuccessful request, set all data", success: false}
                    })
                });
        }
    }

    deleteMatch(id) {
        if (window.confirm('Are you sure you want delete this match from database?')) {
            let headers = new Headers();
            headers.append('Authorization', 'Basic ' + base64_encode(this.props.user.username + ":" + this.props.user.password));
            fetch("http://localhost:8080/Ekstraklasa/dashboard/matches/" + id, {
                method: 'DELETE',
                headers: headers,
            })
                .then(res => res.json())
                .then((result) => {
                        this.props.callbackFunctions.readMatches()
                        this.props.callbackFunctions.readTeams()
                        this.setState({
                            info: {show: true, text: "Successful delete match", success: true}
                        })
                    },
                    (error) => {
                        console.error(error)
                    }
                )
        }
    }

    render() {
        if (this.props.user === null)
            return <Redirect to='/login'/>;
        let filteredMatches = this.setFilteredMatches()
        filteredMatches = filteredMatches.map(FilteredMatch => {
            return <RowOfMatch key={FilteredMatch.id}
                               id={FilteredMatch.id}
                               place={FilteredMatch.place}
                               data={FilteredMatch.date}
                               homeTeam={FilteredMatch.homeTeam}
                               homeScore={FilteredMatch.homeScore}
                               awayTeam={FilteredMatch.awayTeam}
                               awayScore={FilteredMatch.awayScore}
                               round={FilteredMatch.round}
                               adminPermissions={true}
                               teams={this.props.teams}
                               callbackFunctions={{
                                   deleteMatch: this.deleteMatch.bind(this),
                                   setMatchPanelToEdit: this.setMatchPanelToEdit.bind(this),
                               }}
            />
        })

        let matchPanel, panelButton, infoDiv
        if (this.state.matchPanelToCreate) {
            matchPanel = (
                <NewMatchForm teams={this.props.teams} panelForm={"Create"}
                              callbackFunctions={{addNewMatch: this.addNewMatch.bind(this)}}/>
            )
            panelButton = (
                <Button className="float-right" variant="secondary" style={{fontSize: "1.5vw"}} disabled={true}>
                    New Match Form
                </Button>
            )
        } else {
            matchPanel = (
                <NewMatchForm teams={this.props.teams} panelForm={"Edit"} match={this.state.matchToEdit}
                              callbackFunctions={{editMatch: this.editMatch.bind(this)}}/>
            )
            panelButton = (
                <Button className="float-right" variant="success" style={{fontSize: "1.5vw"}}
                        onClick={() => this.setMatchPanelToCreate()}>New Match Form</Button>
            )
        }
        if (this.state.info.show === true) {
            let bgColor = this.state.info.success === true ? "#639925" : "#a1072c"
            infoDiv = (
                <div className="row justify-content-center m-3 p-1"
                     style={{backgroundColor: bgColor, color: "#fff", fontSize: "1.5vw"}}>
                    <h2>{this.state.info.text}</h2>
                </div>
            )
        }

        return (
            <div className="row mx-auto mt-3 df-flex justify-content-center w-100" style={{backgroundColor: "#114666"}}>
                <div className="row mt-3 justify-content-center w-100">
                    <h1 style={{fontSize: "3vw", color: "#ecf6fa"}}>Matches</h1>
                </div>
                <div className="w-50 px-3 py-2">
                    <div className="d-flex justify-content-between w-100" style={{fontSize: "3vw", color: "#ecf6fa"}}>
                        <TeamFilter teams={this.props.teams} noSpecified={true} label={'Team'}
                                    callbackFunctions={{
                                        onChangeTeamName: this.onChangeTeamName.bind(this),
                                    }}/>
                        <InputNumberFilter label={'Round'} length={16} start={1} default={1}
                                           callbackFunctions={{
                                               onChangeValue: this.onChangeRound.bind(this)
                                           }}/>
                        <InputNumberFilter label={'Goals'} length={15} start={0} default={-1}
                                           callbackFunctions={{
                                               onChangeValue: this.onChangeScore.bind(this)
                                           }}/>
                    </div>
                    <div className="mt-3 mb-2 w-100 mx-auto">
                        <table className="table table-striped table-light" style={{fontSize: "1vw"}}>
                            <thead>
                            <tr>
                                <th>Place</th>
                                <th>Date</th>
                                <th>Home</th>
                                <th>Result</th>
                                <th>Away</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            {filteredMatches}
                        </table>
                    </div>
                </div>
                <div className="w-50 p-5" style={{fontSize: "1vw"}}>
                    <div className="float-left py-3 w-100">
                        {panelButton}
                    </div>
                    {matchPanel}
                    {infoDiv}
                </div>
            </div>
        )
    }
}

AdministrationMatches.propTypes = {
    user: PropTypes.object,
    teams: PropTypes.arrayOf(PropTypes.object),
    matches: PropTypes.arrayOf(PropTypes.object),
    callbackFunctions: PropTypes.object
};

export default AdministrationMatches;
