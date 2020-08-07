const mongoose = require("mongoose");

// if (process.argv.length < 5) {
//   console.log(
//     "Please provide the password, the name and the number as an arguments: node mongo.js <password> <name> <number>"
//   );
//   process.exit(1);
// }

// const password = process.argv[2];
require("dotenv").config();

const url = process.env.MONGODB_URI;
// const newName = process.argv[3];
// const newNumber = process.argv[4];

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

// const person = new Person({
//   name: newName,
//   number: newNumber,
// });

// person.save().then((result) => {
//   console.log(`added ${person} to the phonebook`);
//   mongoose.connection.close();
// });

Person.findOne({name:"Arto"}).then((result) => {
  console.log(result);
  
  mongoose.connection.close();
});
