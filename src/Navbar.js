import React, {Component} from 'react';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import 'rc-slider/assets/index.css';
import './Navbar.css';
import { Menu } from '@material-ui/core';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "summary"
        }
    }

    handleChangePage = e => {
        this.setState({page: e.target.value});
        this.props.changePage(e.target.value);
    }

    render() {
        let sliderMessage;
        let defaultSliderValue;
        switch (this.props.winner) {
            case "town":
                sliderMessage = "Town  Victory";
                defaultSliderValue = 3;
                break;
            case "mafia":
                sliderMessage = "Mafia Victory";
                defaultSliderValue = 1;
                break;
            default:
                sliderMessage = "In   Progress";
                defaultSliderValue = 2;
        }

        return (
            <div>
                <header className="Navbar">
                    <div className="SliderContainer">
                        <span>{sliderMessage}</span>
                        <div className="Slider">
                            <Slider min={1} 
                                max={3} 
                                defaultValue={defaultSliderValue}
                                onAfterChange={this.props.updateWinner}
                            />
                        </div>
                    </div>
                    
                    <div className="SelectContainer">
                        <Select value={this.state.page} onChange={this.handleChangePage}>
                            <MenuItem value={"summary"}>Summary</MenuItem>
                            <MenuItem value={"notes"}>Notes</MenuItem>
                        </Select>
                    </div>
                </header>
            </div>
        );
    }
}

export default Navbar;