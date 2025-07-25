import { useState } from 'react'

const Statistics = (props) => {
  const handleAverage = () =>{
    if (props.all > 0){
        return (props.good  - props.bad)/props.all; 
    } else {
        return 0;
    }
  }

  const handlePositive = () =>{
    if (props.all > 0){
        return (props.good/props.all)*100 + "%"; 
    } else {
        return 0;
    }
  }

  if (props.good == 0 && props.neutral == 0 && props.bad == 0){
    return (
      <p>No feedback given</p>
    )
  } else {

  return(
  <>
    <p>Average {handleAverage()}</p>
    <p>Positive {handlePositive()}</p>
  </>
  )
}
  

}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () =>{
    setGood(good+1);
    setAll(all+1);
  }
  const handleNeutral = () =>{
    setNeutral(neutral+1);
    setAll(all+1);
  }
  const handleBad = () =>{
    setBad(bad+1);
    setAll(all+1);
  }


  return (
    <div>
      <h1>Give feedback</h1>
        <button onClick={handleGood}>good</button>
        <button onClick={handleNeutral}>neutral</button>
        <button onClick={handleBad}>bad</button>

      <h1>Statistics</h1>
      {all === 0 
  ? <p>No feedback given</p> 
  : (
      <>
        <p>Good {good}</p>
        <p>Neutral {neutral}</p>
        <p>Bad {bad}</p>
        <p>All {all}</p>
        <Statistics good={good} neutral={neutral} bad={bad} all={all} />
      </>
    )
}
    </div>
    
  )
}
export default App