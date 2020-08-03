import React,{useState} from 'react';
import Note from "./components/Note"

const App = (props) => {
 const [notes,setNotes] = useState(props.notes)
 const [newNote, setNewNote] = useState('a new note...') 
 const [showAll, setShowAll] = useState(true)

 const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const toggleView = () =>  setShowAll(!showAll)
  

 const addNote = (event) => {
   event.preventDefault()       
    let noteToPush = {
      id:notes.length+1 ,
      content: newNote,
      date : new Date().toISOString(),
      important: Math.random() < 0.5
    }
    setNotes(notes.concat(noteToPush))
    setNewNote('')
 }

 const handleNoteChange = (event) => {  
  setNewNote(event.target.value)
}

   return (
     <div>
       <h1>Notes</h1>
       <ul>
       {notesToShow.map(note => 
         <Note key={note.id} note={note}/>
       )}
       </ul>
       <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
         />
        <button type="submit">save</button>       
      </form>   
      <button onClick={toggleView}>show {showAll ? 'important' : 'all' }</button>
     </div>
   )
 }

 export default App
 
