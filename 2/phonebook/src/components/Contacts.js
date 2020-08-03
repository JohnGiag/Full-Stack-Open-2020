import React from "react";

const Contacts = ({ persons, serachValue }) => {
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
          .map((p) => (
            <tr key={p.name}>
              <td> {p.name} </td>
              <td>{p.number}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Contacts;
