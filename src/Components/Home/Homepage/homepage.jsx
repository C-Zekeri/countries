import React, { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import CountryContext from "../../Context/countryContext";
import axios from 'axios';
import Input from '../Input/input';
import Card from '../Card/card';
import './homepage.css'

const Home = () => {
    const history = useHistory();
    const values = useContext(CountryContext);

    const [countryn, setCountryn] = values.countryName;
    const [input, setInput] = useState('');
    const [endpoint, setEndpoint] = useState("");
    const [countries, setCountries] = useState([]);

    //on first load, set endpoint as 'all'
    useEffect(() => {
        setEndpoint('all');
    }, []);

    //get request, reloads when endpoint changes
    useEffect(() => {
        const getCountries = (param) => {
            const url = `https://restcountries.com/v2/${param}`;
            axios.get(url, {
                params: {
                    fields: 'name,population,region,capital,flag,callingCodes'
                }
            })
                .then((res) => {
                    const data = res.data
                    setCountries(data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        getCountries(endpoint);
    }, [endpoint]);

    //render countries
    const Countries = () => {
        let index = 0;
        return (
            countries.map(country => (
                <Card
                    key={index +=1}
                    flag={country.flag}
                    name={country.name}
                    //redirect to detail page when country name is clicked
                    click={() => {
                        setCountryn(country.name);
                        console.log(countryn);
                        history.push('/detail');
                    }}
                    region={country.region}
                    population={country.population}
                    capital={country.capital}
                />
            ))
        )
    };

    return countries.length === 0 ? (
        <p>Loading...</p>
    ) : (
            <main>
                <Input
                    change={(e) => { setInput(e.target.value) }}
                    click={() => { setEndpoint(`name/${input}`) }}
                />

                <section className="countries flex__wrap">
                    <Countries />
                </section>
            </main>
        )
}

export default Home;
