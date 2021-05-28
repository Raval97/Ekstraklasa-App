import React, {Component} from 'react';
import Switch from "react-switch";
import PropTypes from 'prop-types';

class FavouriteTeamsFilter extends Component {

    render() {
        let switchFavouriteTeams
        if (this.props.favouriteTeams !== undefined && this.props.favouriteTeams.length !== 0)
            switchFavouriteTeams = (
                <div className="row df-flex justify-content-center w-100">
                    <span className="" style={{fontSize: "2vw"}}>Only Favorites Teams</span>
                    <div className="">
                        <Switch className="mx-3" onChange={this.props.callbackFunctions.handleChangeOFT}
                                checked={this.props.onlyFavoritesTeams}/>
                    </div>
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
    teams: PropTypes.arrayOf(PropTypes.object),
    matches: PropTypes.arrayOf(PropTypes.object),
    favouriteTeams: PropTypes.arrayOf(PropTypes.number),
    onlyFavoritesTeams: PropTypes.bool,
    callbackFunctions: PropTypes.object
};

export default FavouriteTeamsFilter;
