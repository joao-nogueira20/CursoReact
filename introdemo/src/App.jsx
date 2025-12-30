import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import personService from './services/persons'
import './styles.css';

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


const Notification = ({ message,type }) => {
  let classStyle = ''
  switch(type){
    case 'successful': 
    classStyle = 'message-successful'
    break;

    case 'error':
    classStyle = 'message-error'
    break;
  }


  if (message === null) {
    return null
  }

  return (
    <div className= {classStyle}>
      {message}
    </div>
  )
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
  const [message, setMessage] = useState(null)
  const [type, setType] = useState(null)

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
            p.id === returnedPerson.id ? returnedPerson : p ));
            setMessage('Updated ' + returnedPerson.name)
            setType('successful')

            setTimeout(() => {
              setMessage(null)
            }, 5000)
          
          
          })
          .catch(error => {
            setPersons(persons.filter(p => p.id !== personAlreadyAdded.id));

            setMessage('Information of ' + personAlreadyAdded.name + ' has already been removed from server')
            setType('error')


            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }

 
    } else {
      personService.create(newPerson)
    .then(returnedPerson  => {
      setMessage('Added ' + returnedPerson.name)
      setType('successful')

      setTimeout(() => {
        setMessage(null)
      }, 5000)

      setPersons(persons.concat(returnedPerson ))
    })
    }
    
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message ={message} type = {type}></Notification>

      <Filter filterValue={filter} handleFilter= {handleFilter}></Filter>


      <h2>add a new</h2>
      <PersonForm handleSubmit = {handleSubmit} newName ={newName} handleChangeName ={handleChangeName} newNumber = {newNumber} handleChangeNumber={handleChangeNumber}></PersonForm>
 

      <h2>Numbers</h2>
      <Persons personsToShow= {personsToShow} handleDelete={handleDelete}></Persons>
        
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

