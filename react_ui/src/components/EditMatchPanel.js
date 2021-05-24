import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import TeamFilter from "./OptionsFilterComponents/TeamFilter";

class EditMatchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.props.date,
            place: this.props.place,
            homeTeam: this.props.homeTeam,
            awayTeam: this.props.awayTeam,
            homeScore: this.props.homeScore,
            awayScore: this.props.awayScore,
            round: this.props.round,
        };
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangePlace = this.onChangePlace.bind(this);
        this.onChangeHomeTeam = this.onChangeHomeTeam.bind(this);
        this.onChangeAwayTeam = this.onChangeAwayTeam.bind(this);
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

    onChangeHomeTeam(e) {
        this.setState({
            homeTeam: parseInt(e.target.value)
        })
    }

    onChangeAwayTeam(e) {
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
        return (
            <tr style={{backgroundColor: "#885f9f"}}>
                <td>
                    <form>
                    <input type="text"  placeholder={this.state.place} style={{maxWidth:"100px", minHeight:"35px"}}
                           value={this.state.place} onChange={this.onChangePlace}/>
                    </form>
                </td>
                <td >
                    <input type="date" placeholder={this.state.date} style={{maxWidth:"140px", minHeight:"35px"}}
                           value={this.state.date} onChange={this.onChangeDate}/>
                </td>
                <td className="col-3">
                    <TeamFilter teams={this.props.teams} selected={this.state.homeTeam} noSpecified={false}
                                callbackFunctions={{
                                    onChangeTeamName: this.onChangeHomeTeam.bind(this),
                                }}/>
                </td>
                <td className="col-3 text-center">
                    <div>
                        <input type="number"
                               placeholder={this.state.homeScore}
                               value={this.state.homeScore}
                               min={0}
                               step={1}
                               style={{maxWidth:"60px", minHeight:"35px"}}
                               onChange={this.onChangeScoreHome}/>&nbsp;&nbsp;:&nbsp;&nbsp;
                        <input type="number"
                               placeholder={this.state.awayScore}
                               value={this.state.awayScore}
                               min={0}
                               step={1}
                               style={{maxWidth:"60px", minHeight:"35px"}}
                               onChange={this.onChangeScoreAway}/>
                    </div>
                </td>
                <td className="col-3">
                    <TeamFilter teams={this.props.teams} selected={this.state.awayTeam} noSpecified={false}
                                callbackFunctions={{
                                    onChangeTeamName: this.onChangeAwayTeam.bind(this),
                                }}/>
                </td>
                <td>
                </td>
                <td>
                    <Button variant="success"
                        onClick={() => this.props.callbackFunctions.editMatch(this.state, this.props.id)?
                                this.setState({showEditPanel: !this.state.showEditPanel},() => alert("Zmieniono"))
                            : alert("Sprawdź poprawność danych!")}
                    >
                        Confirm
                    </Button>
                </td>
            </tr>
        )
    }
}


export default EditMatchPanel;
