import React, {Component} from 'react';
import './CountryDescription.css';

export default class CountryDescription extends Component {
    render() {
        return (
            this.props.name ?
                <div className="content">
                    <h2 className="content__country">{this.props.name}</h2>
                    <p className="content__capital">Capital: {this.props.capitalCity}</p>
                    <ul>
                        Borders:
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