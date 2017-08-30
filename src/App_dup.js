import React, {Component} from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import './APP.scss'

var kelvin = (x) => 0 + x
var centigrade = (x) => Math.round(x - 273.0)
var farenheit = (x) => Math.round((5.0 / 9.0 * centigrade(x)) - 32)
var reaumur = (x) => Math.round(4.0 / 5.0 * centigrade(x))

const CurrentTemperatureValue = (temperature, scale) => {
    switch (scale) {
        case 'K':
            return temperature
        case 'C':
            return centigrade(temperature)
        case 'R':
            return reaumur(temperature)
        case 'F':
            return farenheit(temperature)
        default:
            return '?'
    }
    return '?'
}


const CurrentTemperatureCurrentScale = ({temperature, scale}) =>
    <div>
        <h2>Current Temperature : {CurrentTemperatureValue(temperature, scale)} {scale}</h2>
    </div>

const GridMarker = ({i}) =>
    <span key={i} className="slider-grid-cell">
        {i}
    </span>

const TemperatureSlider = ({SliderSettings}) => {
    var rows = [];
    for (let i = 0; i < 10; i++) {
        rows.push(<GridMarker i={i} />)
    }
    return (
    <div >
    <div className="slider-grid">
        {rows}
    </div>
        <Slider {...SliderSettings} />
    </div>
    )
}
const TemperatureBox = ({temperature = 0, scale = 'K', ChangeTemperature}) =>
    <div>
        <input value={CurrentTemperatureValue(temperature, scale)}
               onChange={(event) => (
                   ChangeTemperature(Math.round(event.target.value))
               )

               }/> {scale}
    </div>

const Output = ({temperature, scale}) =>
    <div>
        <h2>Conversions</h2>
        <p>{kelvin(temperature)} K</p>
        <p>{centigrade(temperature)} C</p>
        <p>{farenheit(temperature)} F</p>
        <p>{reaumur(temperature)} Re</p>
    </div>

const Scale = ({onchangeScale}) => {
    return (
        <div>
            <h2>Preferred Units</h2>
            {['K', 'C', 'F', 'R'].map(
                (x, i) =>
                    <div className="radio" key = {i} onClick={event => onchangeScale(event)}>
                        <label>
                            <input key={i}
                                   name="scale"
                                   type="radio"
                                   value={x}
                            />
                            {x}
                        </label>
                    </div>
            )}
        </div>
    )
}


class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            scale: 'K',
            temperature: 0
        }
    }

    render() {
        const changeScale = (event) => {
            // alert(event.target.value)
            this.setState({'scale': event.target.value})
        }
        const ChangeTemperature = (val) => {
            console.log(val)
            this.setState({'temperature': val})
        }
        const {temperature, scale} = this.state
        const tempboxargs = {temperature, scale, ChangeTemperature}
        const SliderSettings = {
            min: 3,
            max: 550,
            onChange: ChangeTemperature,
            step: 5,
            editable: true,
            value: temperature

        }
        return (
            <div className="App">
                <div className="wrapper1col">
                    <div className="box a">
                        <CurrentTemperatureCurrentScale {...this.state} />
                    </div>
                </div>
                <div className="wrapper1col">
                    <div className="box b">
                        <TemperatureSlider {...SliderSettings} />
                        <br />
                        <TemperatureBox {...tempboxargs} />
                    </div>
                    <div className="wrapper2col">
                        <div className="box e">
                            <Output {...this.state} />
                        </div>
                        <div className="box f">
                            <currentTemperatureCurrentScale />
                            <Scale onchangeScale={changeScale}/>
                        </div>
                    </div>
                </div>
            </div>



        );
    }
}


export default App;
