import React, {Component} from 'react';
import './App.css';
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
}


const CurrentTemperatureCurrentScale = ({temperature, scale}) =>
    <div className="box">
        <h2>Current Temperature : {CurrentTemperatureValue(temperature, scale)} {scale}</h2>
    </div>


const TemperatureBox = ({temperature = 0, scale = 'K', ChangeTemperature}) =>
    <div className="box">
        <input value={CurrentTemperatureValue(temperature, scale)}
               onChange={(event) => (
                   ChangeTemperature(Math.round(event.target.value))
               )
           }/> {scale}
    </div>

const Output = ({temperature, scale}) =>
    <div className="box">
        <h2>Conversions</h2>
        <ul>
            <li>{kelvin(temperature)} K</li>
            <li>{centigrade(temperature)} C</li>
            <li>{farenheit(temperature)} F</li>
            <li>{reaumur(temperature)} Re</li>
        </ul>
    </div>

const Scale = ({onchangeScale}) => {
    return (
        <div className="box">
            <h2>Preferred Units</h2>
            {['K', 'C', 'F', 'R'].map(
                (x, i) =>
                    <div className="radio" onClick={event => onchangeScale(event)}>
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
            min: 0,
            max: 1000,
            onChange: ChangeTemperature,
            step: 5,
            editable: true,
            value: temperature
        }
        return (
            <span>
                <div className="box">
            <Slider {...SliderSettings} />
                </div>
            <div className="wrapper2col">
                <CurrentTemperatureCurrentScale {...this.state} />
                <TemperatureBox {...tempboxargs} />
                <Output {...this.state} />
                <Scale onchangeScale={changeScale}/>
            </div>
                  </span>
        );
    }
}


export default App;
