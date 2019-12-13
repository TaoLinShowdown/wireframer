import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ChromePicker } from 'react-color';
import Slider from 'react-rangeslider';
import { 
    textChange,
    fontSizeChange,
    textColorChange,
    backgroundChange,
    borderColorChange,
    borderThicknessChange,
    borderRadiusChange, } from '../../store/actions/actionCreators';

class WireframeControlProperties extends Component {    
    handleTextChange = (e) => {
        this.props.textChange(e.target.value, this.props.control.id);
        this.props.changesMade();
    }

    handleFontSizeChange = (e) => {
        if(!isNaN(e.target.value)){
            this.props.fontSizeChange(Number(e.target.value), this.props.control.id);
            this.props.changesMade();
        }
    }

    handleTextColorChange = (color) => {
        const newRGB = "rgba(" + color.rgb.r + "," + color.rgb.g + "," + color.rgb.b + "," + color.rgb.a + ")";
        this.props.textColorChange(newRGB, this.props.control.id);
        this.props.changesMade();
    }

    handleBackgroundChange = (color) => {
        const newRGB = "rgba(" + color.rgb.r + "," + color.rgb.g + "," + color.rgb.b + "," + color.rgb.a + ")";
        this.props.backgroundChange(newRGB, this.props.control.id);
        this.props.changesMade();
    }

    handleBorderColorChange = (color) => {
        const newRGB = "rgba(" + color.rgb.r + "," + color.rgb.g + "," + color.rgb.b + "," + color.rgb.a + ")";
        this.props.borderColorChange(newRGB, this.props.control.id);
        this.props.changesMade();
    }

    handleBorderThicknessChange = (value) => {
        this.props.borderThicknessChange(value, this.props.control.id);
        this.props.changesMade();
    }

    handleBorderRadiusChange = (value) => {
        this.props.borderRadiusChange(value, this.props.control.id);
        this.props.changesMade();
    }
    
    render() {
        const { control } = this.props;

        if(!control) {
            return <div>No control selected</div>
        }

        return (
            <div>
                Control {control.id} Properties

                {
                    control.type !== 'container' ?
                    <div className="input-field">
                    <input type="text" value={control.text} onChange={this.handleTextChange} />
                    <label className="active">Control Text</label>
                    </div>
                    : null
                }
                {
                    control.type !== 'container' ?
                    <div className="input-field">
                        <input type="text" value={control['font-size']} onChange={this.handleFontSizeChange} />
                        <label className="active">Font Size</label>
                    </div>
                    : null
                }
                {
                    control.type !== 'container' ?
                    <div>
                        Text Color:
                        <ChromePicker
                            width="210px"
                            color={control['font-color']}
                            onChangeComplete={this.handleTextColorChange} />
                        <br/>
                    </div>
                    : null
                }

                <div>
                    Background:
                    <ChromePicker
                        width="210px"
                        color={control['background']}
                        onChangeComplete={this.handleBackgroundChange} />
                    <br/>
                </div>

                <div>
                    Border Color:
                    <ChromePicker
                        width="210px"
                        color={control['border-color']}
                        onChangeComplete={this.handleBorderColorChange} />
                    <br/>
                </div>

                <div>
                    Border Thickness:
                    <Slider 
                        min={0}
                        value={control['border-thickness']}
                        orientation="horizontal"
                        onChange={this.handleBorderThicknessChange} />
                </div>

                <div>
                    Border Radius:
                    <Slider
                        min={0}
                        value={control['border-radius']}
                        orientation="horizontal"
                        onChange={this.handleBorderRadiusChange} />
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        control: state.wireframe.controls[ownProps.selectedControl]
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        textChange: (newText, id) => { dispatch(textChange(newText, id)) },
        fontSizeChange: (newFontSize, id) => { dispatch(fontSizeChange(newFontSize, id)) },
        textColorChange: (newColor, id) => { dispatch(textColorChange(newColor, id)) },
        backgroundChange: (newColor, id) => { dispatch(backgroundChange(newColor, id)) },
        borderColorChange: (newColor, id) => { dispatch(borderColorChange(newColor, id)) },
        borderThicknessChange: (newThicc, id) => { dispatch(borderThicknessChange(newThicc, id)) },
        borderRadiusChange: (newRad, id) => { dispatch(borderRadiusChange(newRad, id)) },
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(WireframeControlProperties);