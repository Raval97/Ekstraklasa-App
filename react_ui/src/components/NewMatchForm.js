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
        }
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

    componentWillReceiveProps(nextProps, a) {
        if (nextProps.match !== undefined && nextProps.match.homeTeam !== undefined) {
            let temp = Object.assign({}, nextProps.match)
            this.setState({date: temp.date})
            this.setState({round: temp.round})
            this.setState({place: temp.place})
            this.setState({homeTeam: temp.homeTeam.id})
            this.setState({awayTeam: temp.awayTeam.id})
            this.setState({homeScore: temp.homeScore})
            this.setState({awayScore: temp.awayScore})
        } else {
            this.setState({date: ""})
            this.setState({round: 1})
            this.setState({place: ""})
            this.setState({homeTeam: 0})
            this.setState({awayTeam: 0})
            this.setState({homeScore: 0})
            this.setState({awayScore: 0})
        }
    }

    getOptionTeams(id) {
        let optionsTeams = (
            this.props.teams
                .map(team => {
                    let selected = (team.id === id) ? "selected" : ""
                    return (
                        <option key={team.id} value={team.id} selected={selected}>
                            {team.name}
                        </option>
                    )
                })
        )
        return optionsTeams
    }

    render() {
        let confirmButton, inputTeams1, inputTeams2
        if (this.props.panelForm === "Create") {
            confirmButton = (
                <Button variant="success" style={{fontSize: "2vw"}} onClick={() => this.props.callbackFunctions.addNewMatch(this.state)}>
                    Create
                </Button>
            )
        } else {
            confirmButton = (
                <Button variant="success" style={{fontSize: "2vw"}}
                        onClick={() => this.props.callbackFunctions.editMatch(this.state, this.props.match.id)}>
                    Update
                </Button>
            )
        }
        inputTeams1 = (
            <select className="form-control" onChange={this.onChangeIdHome}>
                <option key={0} value={0}>Home Team</option>
                {this.getOptionTeams(this.state.homeTeam)}
            </select>
        )
        inputTeams2 = (
            <select className="form-control" onChange={this.onChangeIdAway}>
                <option key={0} value={0}>Away Team</option>
                {this.getOptionTeams(this.state.awayTeam)}
            </select>
        )

        return (
            <div className="p-3 m d-flex flex-column"
                 style={{backgroundColor: "#5686ac", fontSize: "1.5vw", color: "#eee"}}>
                <div>
                    <div className="my-2">
                        <label className="col-lg-6">Date of the match</label>
                        <input className="col-lg-6" type="date" onChange={this.onChangeDate} value={this.state.date}/>
                    </div>
                    <div className="mb-2">
                        <label className="col-lg-6">Round</label>
                        <input className="col-lg-6" type="number"
                               placeholder={this.state.round}
                               value={this.state.round}
                               min={1}
                               max={37}
                               step={1}
                               onChange={this.onChangeRound}/>
                    </div>
                    <div className="mb-2">
                        <label className="col-lg-6">Place of the match</label>
                        <input type="text" className="col-lg-6" placeholder="enter the city"
                               value={this.state.place} onChange={this.onChangePlace}/>
                    </div>
                </div>
                <div className="row mt-3 ">
                    <div className="col-lg-6">
                        <form>{inputTeams1}</form>
                    </div>
                    <div className="col-lg-6">
                        <label className="col-lg-6">Score</label>
                        <input className="col-lg-6" type="number" placeholder={this.state.homeScore}
                               value={this.state.homeScore} min={0} step={1} onChange={this.onChangeScoreHome}/>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-lg-6">
                        <form>{inputTeams2}</form>
                    </div>
                    <div className="col-lg-6">
                        <label className="col-lg-6">Score</label>
                        <input className="col-lg-6" type="number" placeholder={this.state.awayScore}
                               value={this.state.awayScore} min={0} step={1} onChange={this.onChangeScoreAway}/>
                    </div>
                </div>
                <div className="row justify-content-center mt-5">
                    {confirmButton}
                </div>
            </div>
        )
    }
}

export default AdminNowyMecz;
