import React, {Component} from 'react';
import CustomScroll from 'react-customscroll';
import "./CountriesList.css";

// do onclick event to all countries
export default class CountriesList extends Component {
    render(){
        return(
            <aside className="sidebar">
                <CustomScroll>
                    {this.props.allCountries.map(country => <p key={country.alpha3Code} className="sidebar__country">{country.name}</p>)}
                </CustomScroll>
            </aside>
        )
    }
}