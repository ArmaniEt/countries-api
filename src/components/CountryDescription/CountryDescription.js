import React, {Component} from 'react';
import './CountryDescription.css';

export default class CountryDescription extends Component{
    render(){
        return(
            <div className="content">
                <h2>{this.props.name}</h2>
                <p className="content__text">Capital: {this.props.capitalCity}</p>
            </div>
        )
    }

}