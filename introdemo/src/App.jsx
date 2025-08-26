import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  
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

/*
export default function Accordion() {
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel title="About" isActive={true}>
        With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
      </Panel>
      <Panel title="Etymology" isActive={true}>
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
      </Panel>
    </>
  );
}

function Panel({ title, children, isActive }) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={() => setIsActive(true)}>
          Show
        </button>
      )}
    </section>
  );
}
*/

