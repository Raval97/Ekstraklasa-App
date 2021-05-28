import React, {Component} from 'react';
import PropTypes from "prop-types";

class InputNumberFilter extends Component {
    constructor() {
        super();
        this.state = {
            default: false
        };
    }

    componentDidMount() {
        this.setState({default: this.props.default})
    }

    onChangeValue(e) {
        this.setState({default: e.target.value})
        this.props.callbackFunctions.onChangeValue(e)
    }

    render() {
        let optionsValues, inputValues, label
        let optionValuesTemp = Array.from({length: this.props.length}, (_, i) => i + this.props.start)
        optionsValues = (
            optionValuesTemp.map(val => {
                return (
                    <option key={val} value={val}>{val}</option>
                )
            })
        )
        if (this.props.label !== true) {
            label = (
                <label>{this.props.label}</label>
            )
        }
        inputValues = (
            <div className="input-container" style={{marginTop: "-10px"}}>
                {label}
                <select className="form-control" onChange={(e) => this.onChangeValue(e)} value={this.state.default}>
                    <option key={-1} value={-1}>No specified</option>
                    {optionsValues}
                </select>
            </div>
        )

        return (
            <div className="col-lg-4" style={{fontSize: "2vw"}}>
                <form>
                    {inputValues}
                </form>
            </div>
        )
    }
}

InputNumberFilter.propTypes = {
    label: PropTypes.string,
    length: PropTypes.number,
    start: PropTypes.number,
    default: PropTypes.number,
    callbackFunctions: PropTypes.object
};

export default InputNumberFilter;
