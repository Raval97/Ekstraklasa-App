import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';

class AdminNowyMecz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "",
            round: 1,
            place: "",
            homeTeam: 0,
            awayTeam: 0,
            homeScore: 0,
            awayScore: 0

        };
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeRound = this.onChangeRound.bind(this);
        this.onChangePlace = this.onChangePlace.bind(this);
        this.onChangeIdHome = this.onChangeIdHome.bind(this);
        this.onChangeIdAway = this.onChangeIdAway.bind(this);
        this.onChangeScoreHome = this.onChangeScoreHome.bind(this);
        this.onChangeScoreAway = this.onChangeScoreAway.bind(this);
    }

    onChangeDate(e) {
        this.setState({
            date: e.target.value
        })
    }

    onChangeRound(e) {
        this.setState({
            round: parseInt(e.target.value)
        })
    }

    onChangePlace(e) {
        this.setState({
            place: e.target.value
        })
    }

    onChangeIdHome(e) {
        this.setState({
            homeTeam: parseInt(e.target.value)
        })
    }

    onChangeIdAway(e) {
        this.setState({
            awayTeam: parseInt(e.target.value)
        })
    }

    onChangeScoreHome(e) {
        this.setState({
            homeScore: parseInt(e.target.value)
        })
    }

    onChangeScoreAway(e) {
        this.setState({
            awayScore: parseInt(e.target.value)
        })
    }


    render() {
        let inputTeams1, inputTeams2, optionsTeams
        optionsTeams = (
            this.props.teams
                .map(team => {
                    return (
                        <option key={team.id} value={team.id}>
                            {team.name}
                        </option>
                    )
                })
        )
        inputTeams1 = (
            <select className="form-control" onChange={this.onChangeIdHome}>
                <option key={0} value={0}>Home Team</option>
                {optionsTeams}
            </select>
        )
        inputTeams2 = (
            <select className="form-control" onChange={this.onChangeIdAway}>
                <option key={0} value={0}>Away Team</option>
                {optionsTeams}
            </select>
        )

        return (
            <section className="bg-secondary text-white pt-5 pb-5 mt-2 rounded-left">
                <div className="row mt-2">
                    <div className="col-lg-4">
                        <label className="col-lg-4">Date of the match</label>
                        <input type="date" onChange={this.onChangeDate}/>
                    </div>
                    <div className="col-lg-3">
                        <label className="col-lg-5">Round</label>
                        <input style={{maxWidth: "40px"}} type="number"
                               placeholder={this.state.round}
                               value={this.state.round}
                               min={1}
                               max={37}
                               step={1}
                               onChange={this.onChangeRound}/>
                    </div>
                    <div className="col-lg-4">
                        <label className="col-lg-5">Place of the match</label>
                        <input type="text" className="col-lg-6" placeholder={this.state.place}
                               value={this.state.place} onChange={this.onChangePlace}/>
                    </div>
                </div>
                <div className="row mt-3 ">
                    <div className="col-lg-8">
                        <form className="col-lg-12">{inputTeams1}</form>
                    </div>
                    <div className="col-lg-4">
                        <label className="col-lg-3">Score</label>
                        <input style={{maxWidth: "70px"}} type="number" placeholder={this.state.homeScore}
                               value={this.state.homeScore} min={0} step={1} onChange={this.onChangeScoreHome}/>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-lg-8">
                        <form className="col-lg-12">{inputTeams2}</form>
                    </div>
                    <div className="col-lg-4">
                        <label className="col-lg-3">Score</label>
                        <input style={{maxWidth: "70px"}} type="number" placeholder={this.state.awayScore}
                               value={this.state.awayScore} min={0} step={1} onChange={this.onChangeScoreAway}/>
                    </div>
                </div>
                <div className="row justify-content-center mt-5">
                    <Button variant="success"
                             onClick={() => this.props.callbakFunctions.addNewMatch(this.state) ? console.log("Dodano") :
                                 alert("Sprawdz Poprawnosc Danych")}
                    >POTWIERDŹ</Button>
                </div>
            </section>
        )
    }
}

export default AdminNowyMecz;
