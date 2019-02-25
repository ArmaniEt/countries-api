import React, {Component} from 'react';
import './CountryDescription.css';

export default class CountryDescription extends Component {
    render() {
        return (
            this.props.name ?
                <div className="content">
                    <h2 className="content__country">{this.props.name}</h2>
                    <div className="flag">
                        <img className="flag__img" src={this.props.flag} alt="flag"/>
                    </div>
                    <p className="content__capital">Capital:
                        {this.props.capitalCity ? this.props.capitalCity: "Country has not a capital"}</p>

                    <span className="content__text-info">Borders:</span>
                    <ul className="borders">
                        {this.props.borders.length > 0 ? (this.props.borders.map((borderCountry, index) =>
                            <li className="content__border" key={index}>{borderCountry} </li>
                        )) : <p>The country does not border with anyone</p>}
                    </ul>
                </div> :
                <div className="content">
                    <p className="content__empty">Choose a country...</p>
                </div>
        )
    }

}