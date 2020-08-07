import React, { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      console.log("promise fulfilled");
      setNotes(initialNotes);
    });
  }, []);
  console.log("render", notes.length, "notes");

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const toggleView = () => setShowAll(!showAll);

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    
    const changedNote = { ...note, important: !note.important };

    noteService.update(id, changedNote).then((changedNote) => {
      setNotes(notes.map((note) => (note.id !== id ? note : changedNote)));
    })
    .catch(error => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  };

  const addNote = (event) => {
    event.preventDefault();
    let noteToPush = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };

    noteService
    .create(noteToPush)
    .then(newNote => {
      setNotes(notes.concat(newNote))
      setNewNote('')
    })
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>
      <div>
      <Notification message={errorMessage} />
      <ul>
        {notesToShow.map((note, i) => (
          <Note
            key={i}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} /> &nbsp;&nbsp;&nbsp; <button type="submit">save</button>
      </form>
      <button onClick={toggleView}>show {showAll ? "important" : "all"}</button>
      </div>
      <Footer text="Notes App, JohnGiag 2020"/>
    </div>
  );
};

export default App;
