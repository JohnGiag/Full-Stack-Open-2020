const mongoose = require('mongoose')
const dotenv = require("dotenv");
// if (process.argv.length < 3) {
//     console.log('Please provide the password as an argument: node mongo.js <password>')
//     process.exit(1)
//   }
  
//   const password = process.argv[2]
  
dotenv.config();
  const url =
  `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.icmy8.mongodb.net/note-app?retryWrites=true&w=majority`

  
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  
  const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
  })
  
  const Note = mongoose.model('Note', noteSchema)
  
//   const note = new Note({
//     content: 'HTML is Easy',
//     date: new Date(),
//     important: true,
//   })
  
//   note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
//   })

Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })