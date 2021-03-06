const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger.js');
const unknownEndpoint = require('./middleware/unkownEndpoint.js');
const errorHandler = require('./middleware/errorHandler');
const Person = require('./models/person');

const app = express();

// middleware
app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(logger);

// routing
const baseUrl = '/api/persons';

// get all
app.get(baseUrl, (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

// get by id
app.get(`${baseUrl}/:id`, (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// create
// eslint-disable-next-line consistent-return
app.post(baseUrl, (req, res, next) => {
  const { body } = req;

  if (!body.name) {
    return res.status(400).json({
      error: 'Missing name',
    });
  }
  if (!body.number) {
    return res.status(400).json({
      error: 'Missing  number',
    });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => next(error));
});

// delete
app.delete(`${baseUrl}/:id`, (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

// update
app.put(`${baseUrl}/:id`, (req, res, next) => {
  const { body } = req;
  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      // res.json(updatedPerson);
      if (updatedPerson) {
        // person.updateOne({ number: body.number }).then((updatedPerson) => {
        res.json(updatedPerson);
      } else {
        res.status(404).json({
          error: `Person with id ${req.params.id} doesn't exist`,
        });
      }
    })
    .catch((error) => next(error));
});

app.use(unknownEndpoint);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
