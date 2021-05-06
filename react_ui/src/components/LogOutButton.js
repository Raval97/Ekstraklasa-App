import React, {Component} from 'react';
import PropTypes from 'prop-types';

class LogOutButton extends Component {

    render() {
        return (
            <div>
                <div className="form-group row">
                    <div className="pl-3">
                        <button type="submit" className="btn btn-primary"
                                onClick={() => this.props.callbackFunctions.logOut()}>Log Out</button>
                    </div>
                </div>
            </div>
        )
    }
}

LogOutButton.propTypes = {
    authorizationFunctions: PropTypes.object
};

export default LogOutButton;
