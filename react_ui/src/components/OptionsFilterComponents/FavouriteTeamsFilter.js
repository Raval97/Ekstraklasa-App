import React, {Component} from 'react';
import Switch from "react-switch";
import PropTypes from 'prop-types';

class FavouriteTeamsFilter extends Component {

    render() {
        let switchFavouriteTeams
        if (this.props.favouriteTeams !== undefined && this.props.favouriteTeams.length !== 0)
            switchFavouriteTeams = (
                <div className="col-lg-3 align-middle mt-2">
                    <label>
                        <Switch className="react-switch mr-3" onChange={this.props.callbackFunctions.handleChangeOFT}
                                checked={this.props.onlyFavoritesTeams}/>
                        <span>Only Favorites Teams</span>
                    </label>
                </div>
            )
        return (
            <div className="row mt-3 w-100 mx-auto">
                {switchFavouriteTeams}
            </div>
        )
    }
}

FavouriteTeamsFilter.propTypes = {
    matches: PropTypes.arrayOf(PropTypes.object)
};

export default FavouriteTeamsFilter;
