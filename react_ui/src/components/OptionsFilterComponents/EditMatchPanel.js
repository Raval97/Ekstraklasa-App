import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';

class EditMatchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.props.data,
            place: this.props.place,
            homeTeam: this.props.homeTeam,
            awayTeam: this.props.awayTeam,
            homeScore: this.props.homeScore,
            awayScore: this.props.awayScore,
            round: this.props.round,
        };
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangePlace = this.onChangePlace.bind(this);
        this.onChangeIdHome = this.onChangeIdHome.bind(this);
        this.onChangeIdAway = this.onChangeIdAway.bind(this);
        this.onChangeScoreHome = this.onChangeScoreHome.bind(this);
        this.onChangeScoreAway = this.onChangeScoreAway.bind(this);
        this.onChangeShowEditPanel = this.onChangeShowEditPanel.bind(this);
    }

    onChangeDate(e) {
        this.setState({
            date: e.target.value
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
            awayScore:  parseInt(e.target.value)
        })
    }

    onChangeShowEditPanel(e) {
        this.setState({
            showEditPanel: !this.state.showEditPanel
        })
    }

    render() {
        let inputTeams1, inputTeams2, optionsTeams, optionsTeams1

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
        optionsTeams1 = (
            this.props.teams
                .map(team => {
                    return (
                        <option key={team.id+20} value={team.id}>
                            {team.name}
                        </option>
                    )
                })
        )
        inputTeams1 = (
            <div className="input-container">
                <select  value={this.state.homeTeam} className="form-control" onChange={this.onChangeIdHome}>
                    {optionsTeams}
                </select>
            </div>
        )
        inputTeams2 = (
            <div className="input-container">
                <select value={this.state.awayTeam} className="form-control" onChange={this.onChangeIdAway}>
                    {optionsTeams1}
                </select>
            </div>
        )

        return (
            <tr>
                <td>
                    <input type="date" placeholder={this.state.date}
                           value={this.state.date} onChange={this.onChangeDate}/>
                </td>
                <td>
                    <input type="text"  placeholder={this.state.place}
                           value={this.state.place} onChange={this.onChangePlace}/>
                </td>
                <td>
                    <form>{inputTeams1}</form>
                </td>
                <td>
                    <div className="row">
                        <input type="number"
                               placeholder={this.state.homeScore}
                               value={this.state.homeScore}
                               min={0}
                               step={1}
                               style={{maxWidth:"30px"}}
                               onChange={this.onChangeScoreHome}/>:
                        <input type="number"
                               placeholder={this.state.awayScore}
                               value={this.state.awayScore}
                               min={0}
                               step={1}
                               style={{maxWidth:"30px"}}
                               onChange={this.onChangeScoreAway}/>
                    </div>
                </td>
                <td>
                    <form>{inputTeams2}</form>
                </td>
                <td>
                </td>
                <td>
                    <Button variant="info"
                        // onClick={() => this.props.funkcjeZwrotne.edytujMecz(this.state, this.props.id)?
                        //         this.setState({showEditPanel: !this.state.showEditPanel},() => console.log("Zmieniono")) : alert("Sprawdź poprawność danych!")}
                    >
                        Confirm
                    </Button>
                </td>
            </tr>
        )
    }
}


export default EditMatchPanel;
