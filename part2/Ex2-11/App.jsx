import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const Filter = (props) => {
 
  return (
  <div>
    filter shown with <input value = {props.filterValue} onChange = {props.handleFilter} />
  </div>)
}

const PersonForm = (props) => {

  return (<form  onSubmit ={props.handleSubmit}>
    <div>
      name: <input value ={props.newName} onChange = {props.handleChangeName}/>
    </div>
    <div>number:  <input value ={props.newNumber} onChange = {props.handleChangeNumber} /></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>)
}

const Persons = (props) => {
  
  return (
    <div>
    {props.personsToShow.map(person =>
      <div key ={person.id}> {person.name} {person.number}</div>
    )}
  </div>)
}



const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleFilter = (event) => {
    setFilter(event.target.value);
  }
  

  const personsToShow = (filter.trim() === '') ? persons : persons.filter(persons => persons.name.toLowerCase().includes(filter.trim().toLowerCase()));

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  }
  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  }

 

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = { 
      name: newName,
      number: newNumber}

    if(persons.some(person => person.name === newName)){
      alert(newName + ' is already added to phonebook');
    } else {
      setPersons(persons.concat(newPerson));
    }
    
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filter} handleFilter= {handleFilter}></Filter>


      <h2>add a new</h2>
      <PersonForm handleSubmit = {handleSubmit} newName ={newName} handleChangeName ={handleChangeName} newNumber = {newNumber} handleChangeNumber={handleChangeNumber}></PersonForm>
 

      <h2>Numbers</h2>
      <Persons personsToShow= {personsToShow}></Persons>
        
    </div>
    
  )
}

export default App