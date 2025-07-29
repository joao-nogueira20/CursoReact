import { useState } from 'react'

const Button = (props) => {
  return (
  <button onClick={props.onClick}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  return (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
  )
}

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

  return(
  <>
    <StatisticLine text="Average" value ={handleAverage()}></StatisticLine>
    <StatisticLine text="Positive" value ={handlePositive()}></StatisticLine>
  </>
  )

  

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
        <Button onClick = {handleGood} text = "good"></Button>
        <Button onClick = {handleNeutral} text = "neutral"></Button>
        <Button onClick = {handleBad} text = "bad"></Button>

      <h1>Statistics</h1>
      {all === 0 
  ? <p>No feedback given</p> 
  : (
      <table>
        <tbody>
          <StatisticLine text="Good" value ={good}></StatisticLine>
          <StatisticLine text="Neutral" value ={neutral}></StatisticLine>
          <StatisticLine text="Bad" value ={bad}></StatisticLine>
          <StatisticLine text="All" value ={all}></StatisticLine>
          <Statistics good={good} neutral={neutral} bad={bad} all={all} />
        </tbody>
        
      </table>

    )
}
    </div>
    
  )
}
export default App