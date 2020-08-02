import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css';

const Button = ({handleClick,text}) => (<button onClick={handleClick}>{text}</button>)

const Display = (props) => {
return(
  <div>
    <h1>{props.title}</h1>
    {props.anecdote}
    <br/>
    has {props.votes} votes
    <br/>
  </div>
)

}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes,setVotes] = useState(new Array(anecdotes.length).fill(0))

  const indexOfMaxValue = votes.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);

  const getRandomJoke = ()=> (setSelected(Math.floor(Math.random() * anecdotes.length) ));
  
  const upvote = () => {
    const new_votes = [...votes]
    new_votes[selected]+=1
    setVotes(new_votes)
  }

  return (
    <div>
      <Display title="Anecdote of the day" anecdote={props.anecdotes[selected] } votes= {votes[selected]}/>          
      <Button handleClick={upvote} text="vote"/>
      <Button handleClick={getRandomJoke} text="next anecdote"/>
      <Display title="Anecdote with the most votes" anecdote={props.anecdotes[indexOfMaxValue] } votes= {votes[indexOfMaxValue]}/>     
    </div>
    
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />    
  </React.StrictMode>,
  document.getElementById('root')
);

