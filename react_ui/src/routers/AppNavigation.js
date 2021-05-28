import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import LoginPage from "../containers/LoginPage";
import PropTypes from 'prop-types';
import Menu from "../components/Menu";
import EkstraklasaPage from "../containers/EkstraklasaPage";
import AdministrationMatches from "../containers/AdministrationMatches";
import AdministrationUsers from "../containers/AdministrationUsers";
import SignUpPage from "../containers/SignUpPage";
import UserAccount from "../containers/UserAccount";
import RowOfTeam from "../components/RowOfTeam";

class AppNavigation extends Component {

    render() {
        return (
            <Router>
                <Route path="/login" exact render={(props) => <LoginPage
                    successRegister={this.props.successRegister}
                    successLogout={this.props.successLogout}
                    authorizationFunctions={this.props.authorizationFunctions}
                />}/>
                <Route path="/sign_up" exact render={(props) => <SignUpPage
                    teams={this.props.teams}
                    authorizationFunctions={this.props.authorizationFunctions}
                />}/>
                <Route path="/ekstraklasa" render={(props) => (
                    <div className="mx-auto mt-2 p-3" style={{width: "90%", backgroundColor: "#49a1d5"}}>
                        <Menu
                            user={this.props.user}
                            authorizationFunctions={this.props.authorizationFunctions}/>
                        <Route path="/ekstraklasa/home" exact render={(props) => <EkstraklasaPage
                            favouriteTeams={this.props.favouriteTeams}
                            matches={this.props.matches}
                            teams={this.props.teams}/>
                        }/>
                        <Route path="/ekstraklasa/adminMatches" exact render={(props) => <AdministrationMatches
                            user={this.props.user}
                            matches={this.props.matches}
                            teams={this.props.teams}
                            callbackFunctions={this.props.callbackFunctions}/>
                        }/>
                        <Route path="/ekstraklasa/adminUsers" exact render={(props) => <AdministrationUsers
                            user={this.props.user}/>
                        }/>
                        <Route path="/ekstraklasa/userAccount" exact render={(props) => <UserAccount
                            teams={this.props.teams}
                            user={this.props.user}
                            favouriteTeams={this.props.favouriteTeams}
                            callbackFunctions={this.props.callbackFunctions}
                        />}/>
                    </div>
                )
                }/>
            </Router>
        );
    }
}

RowOfTeam.propTypes = {
    user: PropTypes.object,
    successRegister: PropTypes.bool,
    successLogout: PropTypes.bool,
    teams: PropTypes.arrayOf(PropTypes.object),
    matches: PropTypes.arrayOf(PropTypes.object),
    favouriteTeams: PropTypes.arrayOf(PropTypes.number),
    authorizationFunctions: PropTypes.object,
    callbackFunctions: PropTypes.object
};

export default AppNavigation;
