import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CountOfGoalsFilter extends Component {

    render() {

        return (
            <div className="col-lg-4">
                <div className="form-group mb-0">
                    <label>Count of goals</label>
                    <input className="form-control col-12 mx-auto"
                           type="number"
                           placeholder={this.props.queryScore}
                           value={this.props.queryScore}
                           min={0}
                           step={1}
                           onChange={this.props.callbackFunctions.onChangeScore}
                    />
                </div>
            </div>
        )
    }
}

CountOfGoalsFilter.propTypes = {
    matches: PropTypes.arrayOf(PropTypes.object)
};

export default CountOfGoalsFilter;
