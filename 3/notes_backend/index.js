const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger.js');
const unknownEndpoint = require('./middleware/unkownEndpoint.js');

const app = express();
const Note = require('./models/note');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.static('build'));
app.use(logger);

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then((result) => {
      // eslint-disable-next-line no-console
      console.log('res', result);
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post('/api/notes', (request, response, next) => {
  const { body } = request;

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote.toJSON());
    })
    .catch((error) => next(error));
});

app.put('/api/notes/:id', (request, response, next) => {
  const { body } = request;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

app.use(unknownEndpoint);

app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
