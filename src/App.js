import React, {Component} from 'react';
import './App.css';
import CountryForm from './container/CountryForm';


class App extends Component {
    render() {
        return (
            <div className="container">
                <CountryForm/>
            </div>
        );
    }
}

export default App;
