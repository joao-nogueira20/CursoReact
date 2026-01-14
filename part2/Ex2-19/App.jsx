import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

const CountryInfo = (props) => {

    return (
        <div>
            <h1>{props.name}</h1>

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

const CountriesToShow = (props) => {
  if(props.search === ''){
    return null
  }

    const countriesToShow = props.countries.filter(country => country.name.common.toLowerCase().includes(props.search.toLowerCase()))


    if(countriesToShow.length > 10){
        return <p>Too many matches, specify another filter</p>
    }
    else if ( 1 < countriesToShow.length && countriesToShow.length <= 10){
        return (
        <div>
        {countriesToShow.map(country =>
          <div key ={country.name.common}> {country.name.common} <button onClick = {() => props.handleButtonClick(country)} >Show</button>  </div>
        )}
      </div>)
    }
    else if(countriesToShow.length === 1){
        return(
            <CountryInfo name ={countriesToShow[0].name.common} capital ={countriesToShow[0].capital} area={countriesToShow[0].area} languages={countriesToShow[0].languages} flags={countriesToShow[0].flags}></CountryInfo>
        )
    }
    else {
        return null
    }
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState('')
    const [country, setCountry] = useState(null)

    useEffect(() => {
        if(countries.length === 0){
            axios.
            get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then (response => {
                setCountries(response.data)
            })
        }
        
    }, [])

    
    const handleShowCountry = (country) => {
        setCountry(country);
    }


    const handleChange = (event) => {
        setSearch(event.target.value)
        setCountry(null)
    }

    return (
        <div>
            <FormSearch value = {search} handleChange = {handleChange}></FormSearch>
            {country ? (
                <CountryInfo  name ={country.name.common} capital ={country.capital} area={country.area} languages={country.languages} flags={country.flags}></CountryInfo>
            ) : (
            <CountriesToShow handleButtonClick = {handleShowCountry} countries = {countries} search ={search}></CountriesToShow>)}            
        </div>
    )

       
}

export default App