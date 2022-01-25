import React, { useState, useEffect, useContext } from "react";
import CountryContext from '../Context/countryContext';
import axios from 'axios';
import './detail.css';

const DetailPage = () => {
    const values = useContext(CountryContext);
    const langArray = [];
    const currenciesArray = [];
    const [countryn, setCountryn] = values.countryName;
    const [countries, setCountries] = useState([]);
    const [code, setCode] = useState('');

    useEffect(() => {
        const getCountries = (param) => {
            const url = `https://restcountries.com/rest/v2/name/${countryn}`;
            axios.get(url)
                .then((res) => {
                    const data = res.data
                    setCountries(data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        getCountries();
        //eslint-disable-next-line
    }, [countryn]);

    useEffect(() => {
        const getBorder = () => {
            const url = `https://restcountries.com/rest/v2/alpha/${code}`;
            axios.get(url)
                .then((res) => {
                    const data = res.data
                    setCountryn(data.name)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        getBorder();
        //eslint-disable-next-line
    }, [code]);

    const Borders = () => {
        const borders = countries[0].borders;
        let index = 0;

        return (
            borders.map(border => (
                <span
                    key={index += 1}
                    className="border"
                    onClick={()=> {
                        setCode(border);
                    }}
                >
                    {border}
                </span>
            ))
        );
    }

    const Languages = () => {
        const languages = countries[0].languages;
        languages.forEach(language => {
            langArray.push(language.name)
        });

        return (
            <span>{langArray.join(', ')}</span>
        )
    }

    const Currencies = () => {
        const currencies = countries[0].currencies;
        currencies.forEach(currency => {
            currenciesArray.push(currency.name)
        });

        return (
            <span>{currenciesArray.join(', ')}</span>
        )
    }

    return countries.length === 0 ? (
        <p>Loading...</p>
    ) : (
            <main className="card__detailed flex__center">
                <figure>
                    <img className="flag__detailed" src={countries[0].flag} alt="flag" />
                </figure>

                <section className="card__detailed-info">
                    <h2 className="info__name">{countries[0].name}</h2>
                    <div className="flex__wrap">
                        <div className="container">
                            <p className="info__detail"><b>Native Name:</b> {countries[0].nativeName}</p>
                            <p className="info__detail"><b>Population:</b> {countries[0].population}</p>
                            <p className="info__detail"><b>Region:</b> {countries[0].region}</p>
                            <p className="info__detail"><b>Sub Region:</b> {countries[0].subregion}</p>
                            <p className="info__detail"><b>Capital:</b> {countries[0].capital}</p>
                        </div>

                        <div className="container">
                            <p className="info__detail"><b>Top Level Domain:</b> {countries[0].topLevelDomain[0]}</p>
                            <p className="info__detail"><b>Currencies:</b> <Currencies /> </p>
                            <p className="info__detail"><b>Languages:</b> <Languages /> </p>
                        </div>
                    </div>

                    <div className="info__borders flex">
                        <b>Border Countries: </b>
                        <div className="borders__wrap">
                            <Borders />
                        </div>
                    </div>
                </section>
            </main>
        )
}

export default DetailPage;
