import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = (props) => (<h1>{props.text}</h1>) 

const Button = ({handleClick,text}) => (
  <button onClick={handleClick}>{text}</button>
)


const Statistic = ({text,value}) => (<tr><td>{text}</td><td>{value}</td></tr>)

const Statistics = (props) => {
  let total = props.good+props.neutral+props.bad
  if(total===0){
    return (
      <p>No feedback given</p>
    )

  } else{


  return(
    
    <div>   
      <table>
        <tbody>
          <Statistic text="good" value={props.good}/>
          <Statistic text="neutral" value={props.neutral}/>
          <Statistic text="bad" value={props.bad}/>
          <Statistic text="all" value={total}/>
          <Statistic text="average" value={(props.good-props.bad)/total}/>
          <Statistic text="positive" value={Number((props.good/total)/100).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2})} />     
        </tbody>
      </table>
    </div>
  )
}
}




const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  

  return (
    <div>
      <Header text="give feedback"/>
      <Button handleClick={()=>setGood(good+1)} text="good"/>
      <Button handleClick={()=>setNeutral(neutral+1)} text="neutral"/>
      <Button handleClick={()=>setBad(bad+1)} text="bad"/>
      <Header text="statistics"/>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

