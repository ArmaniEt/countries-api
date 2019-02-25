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
                return {...country}
            });
            this.setState({countries: receivedCountries});

        }).catch(error => {
            console.log(error)
        });

    }

    state = {
        countries: [],
        currentCountry: {},
        borders: []
    };

    getResponse = (countryId, url) => {
        return fetch(url + countryId).then(response => {
            if (response.ok) return response.json();
            throw new Error("Something wrong with network request");

        })
    };

    getCountry = (countryId) => {
        const BORDERS = [];
        const COUNTRY_URL = "https://restcountries.eu/rest/v2/alpha/";

        this.getResponse(countryId, COUNTRY_URL).then(country => {
            for (let i = 0; i < country.borders.length; i++) {
                let promise = fetch(COUNTRY_URL + country.borders[i]).then(response => {
                    //country.borders[i] represents alpha3Code of neighbor's countries
                    if (response.ok) return response.json()
                });
                BORDERS.push(promise);
            }
            Promise.all(BORDERS).then(bordersCountry => {
                // Important to call Promise.all before we setState in main .then method (which gives us a country value)
                // Promise.all accepted array with promises
                // We passed array to .then to map it
                // Finally we get country's borders from object and set it to state
                let name = bordersCountry.map(countryName => countryName.name);
                this.setState({borders: name})
            });
            this.setState({currentCountry: {...country}});
        });
    };

    render() {
        return (
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
                    borders={this.state.borders}
                />
            </div>
        )
    }
}