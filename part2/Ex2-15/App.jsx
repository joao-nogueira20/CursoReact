import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import personService from '../../introdemo/src/services/persons'

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
      <div key ={person.id}> {person.name} {person.number} <button onClick= {() => props.handleDelete(person)}>delete</button></div>
    )}
  </div>)
}



const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService.getAll()
      .then(initialPersons  => {
        setPersons(initialPersons)
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

  const handleDelete = (person) => {
    if(window.confirm("Delete " + person.name + "?")) {
    axios.delete('http://localhost:3001/persons/' + person.id)
    .then(() => {
      setPersons(persons.filter(p => p.id !== person.id));
    })
    .catch(error => {
      console.error("Error deleting person: ", error);
    });
    }
    
  }

 

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = { 
      name: newName,
      number: newNumber}
      
    if(persons.some(person => person.name === newName)){
      const personAlreadyAdded = persons.find((n) => n.name === newName);
      if(window.confirm(personAlreadyAdded.name + " is already added to phonebook, replace the old number with a new one?")) {
        personService.update(personAlreadyAdded.id,newPerson)
        .then(returnedPerson  => {
          setPersons(persons.map(p =>
            p.id === returnedPerson.id ? returnedPerson : p ))});
      }

 
    } else {
      personService.create(newPerson)
    .then(returnedPerson  => {
      setPersons(persons.concat(returnedPerson ))
    })
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
      <Persons personsToShow= {personsToShow} handleDelete={handleDelete}></Persons>
        
    </div>
    
  )
}

export default App