import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

const CountryInfo = (props) => {

    return (
        <div>
            <h1>{props.name.common}</h1>

            <p>Capital {props.capital}</p>
            <p>Area {props.area}</p>

            <h1>Languages</h1>
            <ul>
                {Object.values(props.languages).map(language =>
                    <li key = {language}>{language}</li> )}
            </ul>

            <img src={props.flags.png} alt={props.flags.alt} />


        </div>
        
    )
    
}

const FormSearch = (props) => {

    return (
        <div>
            <form action="">
                <div>
                    find countries <input value={props.value} onChange = {props.handleChange} />
                </div>
                
            </form>
        </div>
    )
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        if(countries.length === 0){
            axios.
            get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then (response => {
                setCountries(response.data)
            })
        }
        
    }, [])

   // const countriesToShow = countries.filter(...)


    const handleChange = (event) => {
        setSearch(event.target.value)
    }

    return (
        <FormSearch value = {search} handleChange = {handleChange}></FormSearch>
    )

       
}