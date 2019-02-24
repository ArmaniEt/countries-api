import React from 'react';
import "./Country.css";

const Country = function (props) {
    return (
        <p onClick={props.getInfo} className="country">{props.name}</p>
    )

};

export default Country;