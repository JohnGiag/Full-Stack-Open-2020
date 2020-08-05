import React from "react";

const Contacts = ({ persons, serachValue , deleteContact }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Number</th>
        </tr>
      </thead>

      <tbody>
        {persons
          .filter((person) => person.name.toLowerCase().includes(serachValue.toLowerCase()))
          .map((p,i) => (
            <tr key={i}>
              <td> {p.name} </td>
              <td>{p.number}</td>
              <td><button onClick={() => deleteContact(p.id)}>delete</button></td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Contacts;
