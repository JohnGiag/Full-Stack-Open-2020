import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import AddContactForm from "./components/AddContactForm";
import Contacts from "./components/Contacts";
import phonebookService from "./services/phonebook";
import Footer from "./components/Footer";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setnNewNumber] = useState("");
  const [serachValue, setSearchValue] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState("success");

  //load data from db
  useEffect(() => {
    phonebookService.getAll().then((initialData) => {
      setPersons(initialData);
    });
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setnNewNumber(event.target.value);

  const handleSearch = (event) => setSearchValue(event.target.value);

  const updateOrAddToPhoneBook = (event) => {
    event.preventDefault();
    //update number in already existing contact
    let personObject = { name: newName, number: newNumber };
    let oldPersonObject = persons.find((p) => p.name === newName);
    if (persons.some((p) => p.name === newName)) {
      const confirm = window.confirm(
        `${newName} is already in the phonebook, replace old number with new number ?`
      );
      if (confirm) {
        personObject.id = oldPersonObject.id;
        phonebookService
          .update(oldPersonObject.id, personObject)
          .then((updatedContact) => {
            setPersons(
              persons.map((p) =>
                p.id === oldPersonObject.id ? personObject : p
              )
            );
            setNotificationType("success");
            setNotificationMessage(`Updated '${personObject.name}'`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 3000);
          })
          .catch((error) => {
            setNotificationType("error");
            setNotificationMessage(
              `${personObject.name}' has been removed from the phonebook`
            );
            setTimeout(() => {
              setNotificationMessage(null);
            }, 3000);
            setPersons(persons.filter((p) => p.id !== oldPersonObject.id));
          });
      }
    } else {
      //add new contact
      phonebookService.create(personObject).then((newPerson) => {
        setPersons(persons.concat(newPerson));
        setNewName("");
        setnNewNumber("");
        setNotificationType("success");
        setNotificationMessage(`Added '${personObject.name}'`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 3000);
      });
    }
  };

  const deleteContact = (id) => {
    const person = persons.find((p) => p.id === id);
    const confirm = window.confirm(`Delete ${person.name} ?`);
    if (confirm) {
      phonebookService.deleteResource(id)
      .then((updatedContacts) => {
        setPersons(updatedContacts);
        setNotificationType("success");
        setNotificationMessage(`Deleted '${person.name}'`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 3000);
      })
      .catch((error) => {
        setNotificationType("error");
        setNotificationMessage(
          `${person.name}' has already been removed from the phonebook`
        );
        setTimeout(() => {
          setNotificationMessage(null);
        }, 3000);
        setPersons(persons.filter((p) => p.id !== person.id));
      });;
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notificationMessage} type={notificationType} />

      <Search value={serachValue} onChange={handleSearch} />
      <AddContactForm
        onSubmit={updateOrAddToPhoneBook}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Contacts</h2>
      <Contacts
        persons={persons}
        serachValue={serachValue}
        deleteContact={deleteContact}
      />
      <Footer text="Phonebook app, JohnGiag 2020" />
    </div>
  );
};

export default App;
