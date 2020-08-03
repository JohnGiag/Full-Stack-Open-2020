import React, { useState } from "react";
import Search from "./components/Search";
import AddContactForm from "./components/AddContactForm";
import Contacts from "./components/Contacts"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setnNewNumber] = useState("");
  const [serachValue, setSearchValue] = useState("");

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setnNewNumber(event.target.value);

  const handleSearch = (event) => setSearchValue(event.target.value);

  const addToPhoneBook = (event) => {
    event.preventDefault();
    if (persons.some((p) => p.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
    }
    setNewName("");
    setnNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Search value={serachValue} onChange={handleSearch} />
      <AddContactForm
        onSubmit={addToPhoneBook}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Contacts</h2>
      <Contacts persons={persons} serachValue={serachValue}/>
    </div>
  );
};

export default App;
