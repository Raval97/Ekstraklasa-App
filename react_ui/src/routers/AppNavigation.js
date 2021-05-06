import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import LoginPage from "../containers/LoginPage";
import PropTypes from 'prop-types';
import Menu from "../components/Menu";
import EkstraklasaPage from "../containers/EkstraklasaPage";
import AdministrationMatches from "../containers/AdministrationMatches";
import AdministrationUsers from "../containers/AdministrationUsers";

class AppNavigation extends Component {

    render() {
        return (
            <Router>
                <Route path="/login" exact render={(props) => <LoginPage
                    user={this.props.user}
                    failedAuthorization={this.props.failedAuthorization}
                    successLogout={this.props.successLogout}
                    authorizationFunctions={this.props.authorizationFunctions}
                />}/>
                <Route path="/ekstraklasa"  render={(props) => (
                    <div className="container checklist--add-list">
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
                    </div>
                )
                }/>
            </Router>
        );
    }
}

AppNavigation.propTypes = {
    user: PropTypes.object,
    failedAuthorization: PropTypes.bool,
    successLogout: PropTypes.bool,
    authorizationFunctions: PropTypes.object
};

export default AppNavigation;
