import React, {Component} from 'react';

class InputNumberFilter extends Component {

    render() {
        let optionsValues, inputValues, label
        let optionValuesTemp = Array.from({length: this.props.length}, (_, i) => i + this.props.start)
        optionsValues = (
            optionValuesTemp.map(val => {
                return (
                    <option key={val} value={val}>
                        {val}
                    </option>
                )
            })
        )
        if(this.props.label !== true) {
            label = (
                <label>{this.props.label}</label>
            )
        }
        inputValues = (
            <div className="input-container" style={{marginTop:"-10px"}}>
                {label}
                <select className="form-control" onChange={this.props.callbackFunctions.onChangeValue}>
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

export default InputNumberFilter;
