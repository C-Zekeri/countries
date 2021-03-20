import React from "react";
import './card.css';

const Card = (props) => {
    return (
        <div key={props.key} className="card__short">
            <figure>
                <img className="flag" src={props.flag} alt="flag" />
            </figure>
            <div className="info">
                <p className="info__name" onClick={props.click}><b>{props.name}</b></p>
                <p className="info__detail"><b>Population:</b> {props.population}</p>
                <p className="info__detail"><b>Region:</b> {props.region}</p>
                <p className="info__detail"><b>Capital:</b> {props.capital}</p>
            </div>
        </div>
    )
}

export default Card;
