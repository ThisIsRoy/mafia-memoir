import React, {Component} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';

class Navbar extends Component {
    handleUpdateWinner = e => {
        this.props.updateWinner(e);
    }


    render() {
        let sliderMessage;
        switch (this.props.winner) {
            case 3:
                sliderMessage = "Town  Victory";
                break;
            case 1:
                sliderMessage = "Mafia Victory";
                break;
            default:
                sliderMessage = "In   Progress";
        }

        return (
            <div>
                <header className="Navbar">
                    <div className="Logo">
                        <a href="#">Placeholder Name</a>
                    </div>

                    {/* TODO: ALLOW GAME STATE TO BE CHANGED */}
                    <div className="SliderContainer">
                        <span>{sliderMessage}</span>
                        <div className="Slider">
                            <Slider min={1} 
                                max={3} 
                                defaultValue={this.props.winner}
                                onAfterChange={this.handleUpdateWinner}
                            />
                        </div>
                    </div>
                    
                </header>
            </div>
        );
    }
}

export default Navbar;