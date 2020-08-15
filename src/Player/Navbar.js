import React, {Component} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';

class Navbar extends Component {
    render() {
        let sliderDefault;
        switch (this.props.result) {
            case "Town":
                sliderDefault = 1;
                break;
            case "Mafia":
                sliderDefault = 3;
            default:
                sliderDefault = 2;
        }

        return (
            <div>
                <header className="Navbar">
                    <div className="Logo">
                        <a href="#">Placeholder Name</a>
                    </div>

                    {/* TODO: ALLOW GAME STATE TO BE CHANGED */}
                    <div className="Slider">
                        <Slider min={1} max={3}/>
                    </div>
                </header>
            </div>
        );
    }
}

export default Navbar;