import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
      <form  onSubmit ={handleSubmit}>
        <div>
          name: <input value ={newName} onChange = {handleChangeName}/>
        </div>
        <div>number:  <input value ={newNumber} onChange = {handleChangeNumber} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person =>
          <div>{person.name} {person.number}</div>
        )}
    </div>
    
  )
}

export default App