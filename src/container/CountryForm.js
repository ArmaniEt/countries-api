import React, {Component} from 'react';
import "./CountryForm.css";
import CountriesList from "../components/CountriesList/CountriesList";
import CountryDescription from "../components/CountryDescription/CountryDescription";

export default class CountryForm extends Component {

    componentDidMount() {
        const COUNTRIES_URL = "https://restcountries.eu/rest/v2/all?fields=name;alpha3Code";
        fetch(COUNTRIES_URL).then(response => {
            if (response.ok) return response.json();
            throw new Error("Something wrong with network request");

        }).then(countries => {
            const receivedCountries = countries.map(country => {
                return {...country} // ask about unpack
            });
            this.setState({countries: receivedCountries});

        }).catch(error => {console.log(error)});

    }

    state = {
        countries: [],
        currentCountry: {}
    };

    render(){
        return(
            <div>
                <CountriesList
                    allCountries={this.state.countries}
                />
                <CountryDescription/>
            </div>
        )
    }
}