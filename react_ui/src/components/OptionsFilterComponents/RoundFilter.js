import React, {Component} from 'react';
import PropTypes from 'prop-types';

class RoundFilter extends Component {

    render() {

        return (
            <div className="col-lg-4">
                <div className="form-group mb-0">
                    <label>Round</label>
                    <input className="form-control col-12 mx-auto"
                           type="number"
                           placeholder={this.props.queryRound}
                           value={this.props.queryRound}
                           min={0}
                           step={1}
                           onChange={this.props.callbackFunctions.onChangeRound}
                    />
                </div>
            </div>
        )
    }
}

RoundFilter.propTypes = {
    matches: PropTypes.arrayOf(PropTypes.object)
};

export default RoundFilter;
