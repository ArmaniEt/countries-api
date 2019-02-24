import React, {Component} from 'react';
import "./CountryForm.css";
import CustomScroll from 'react-customscroll';
import CountryDescription from "../components/CountryDescription/CountryDescription";
import Country from "../components/Country/Country"

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

    getCountry = (countryId) => {
        const COUNTRY_URL = "https://restcountries.eu/rest/v2/alpha/";
        fetch(COUNTRY_URL + countryId).then(response => {
            if (response.ok) return response.json();
            throw new Error("Something wrong with network request");

        }).then(country => {
            this.setState({currentCountry: {...country}});
            console.log(this.state.currentCountry);

        });
    };

    render(){
        return(
            <div>
                <aside className="sidebar">
                    <CustomScroll>
                        {this.state.countries.map((country) => <Country
                            key={country.alpha3Code}
                            name={country.name}
                            getInfo={() => this.getCountry(country.alpha3Code)}
                        />)}
                    </CustomScroll>
                </aside>
                <CountryDescription
                    capitalCity={this.state.currentCountry.capital}
                    name={this.state.currentCountry.name}
                    borders={this.state.currentCountry.borders}
                />
            </div>
        )
    }
}