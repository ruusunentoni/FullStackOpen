require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const Person = require("./models/person");
// const { request, response } = require("express");
// const person = require("./models/person");
// const note = require("../osa3/part3/models/note");
// const { request } = require("express");

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

// Middleware;
const requestLogger = (request, response, next) => {
  console.log("Method: ", request.method);
  console.log("Path: ", request.path);
  console.log("Body: ", request.body);
  console.log("----");

  next();
};

app.use(requestLogger);

// Create morgan token for loggin request body JSON
morgan.token("body", (request) => {
  let obj = JSON.stringify(request.body);
  // console.log("obj: ", obj);
  return obj;
});
app.use(morgan(":method :url :status :req[content-length]ms :body"));

// let persons = [
//   {
//     name: "Arto Hellas",
//     number: "040-123456",
//     id: 1,
//   },
//   {
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//     id: 2,
//   },
//   {
//     name: "Dan Abramov",
//     number: "12-43-234345",
//     id: 3,
//   },
//   {
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//     id: 4,
//   },
//   {
//     name: "James Bond",
//     number: "007",
//     id: 5,
//   },
// ];

// app.get("/", (request, response) => {
//   response.send("<h1>Hello World!</h1>");
// });

// Get info
app.get("/info", (request, response) => {
  let contacts = 0;
  Person.find({}).then((persons) => {
    contacts = persons.length;
    response
      .status(200)
      .send(
        `<p>Phonebook has info for ${contacts}</p> <br/> <p>${new Date()}</p>`
      );
  });
});

// Get all notes
app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons.map((person) => person.toJSON()));
    })
    .catch((error) => next(error));
});

// Get single person
app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// Delete single person
app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      console.log("Removed!");
      response.status(204).end();
    })
    .catch((error) => next(error));
  // .catch((error) => {
  //   console.error(error);
  //   response.send({ error: `${error.message}` });
  // });
  // const id = Number(request.params.id);
  // persons = persons.filter((person) => person.id !== id);

  // response.status(204).end();
});

// const genereateId = () => {
//   const maxId =
//     notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;

//   return maxId;
// };

// Post single note
app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (body.name === undefined) {
    return response.status(400).json({ error: "name missing" });
  } else if (body.number === undefined) {
    return response.status(400).json({ error: "number missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    date: new Date(),
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson.toJSON());
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

// Middleware
// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: "unknown endpoint" });
// };

// app.use(unknownEndpoint);

// Errorhandler middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  // else if (error.name === "ReferenceError") {
  //   return response.status(409).json({ error: error.message });
  // }
  else if (error.name === "ValidationError") {
    return response.status(409).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// require("dotenv").config();
// const express = require("express");
// const morgan = require("morgan");
// const cors = require("cors");
// const Person = require("./models/person");

// const app = express();

// app.use(express.json());
// app.use(cors());
// app.use(express.static("build"));

// // Create morgan token for loggin request body JSON
// morgan.token("body", (request, response) => {
//   let obj = JSON.stringify(request.body);
//   // console.log("obj: ", obj);
//   return obj;
// });
// app.use(morgan(":method :url :status :req[content-length]ms :body"));

// let persons = [
//   {
//     name: "Arto Hellas",
//     number: "040-123456",
//     id: 1,
//   },
//   {
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//     id: 2,
//   },
//   {
//     name: "Dan Abramov",
//     number: "12-43-234345",
//     id: 3,
//   },
//   {
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//     id: 4,
//   },
//   {
//     name: "James Bond",
//     number: "007",
//     id: 5,
//   },
// ];

// console.log('Person: ', Person)

// // Get all persons
// app.get("/api/persons", (request, response) => {
//   Person.find({}).then((persons) => {
//     response.json(persons.map((person) => person.toJSON()));
//   });
//   // return response.json(persons);
// });

// // Get persons length and current date
// app.get("/info", (request, response) => {
//   const personsLength = persons.length;
//   const date = new Date();

//   const responseBody = `<p>Phonebook has info for ${personsLength}</p><br/><p>${date}</p>`;

//   return response.send(responseBody);
// });

// // Get single person
// app.get("/api/persons/:id", (request, response) => {
//   Person.findById(request.params.id).then((person) => {
//     response.json(person.toJSON());
//   });
//   // const id = Number(request.params.id);

//   // const singlePerson = persons.find((person) => person.id === id);

//   // if (singlePerson) {
//   //   return response.json(singlePerson);
//   // } else {
//   //   return response.status(404).end();
//   // }
// });

// // const generateId = () => {
// //   const maxId =
// //     persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;
// //   return maxId;
// // };

// // Delete single person
// app.delete("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);

//   persons = persons.filter((person) => person.id !== id);

//   // return response.send(persons);
//   return response.status(204).end();
// });

// // Post new person
// app.post("/api/persons/", (request, response) => {
//   const body = request.body;

//   if (body.name === undefined) {
//     return response.status(400).json({ error: "name missing" });
//   }

//   // if (!body) {
//   //   return response.status(400).json({
//   //     error: "Content missing",
//   //   });
//   // }

//   if (body.name === "") {
//     return response.status(404).json({
//       error: "name missing",
//     });
//     // } else if (persons.map(person => person.name.toLowerCase() === body.name.toLowerCase())) {
//   } else if (persons.find((person) => person.name === body.name)) {
//     return response.status(406).json({
//       error: "name must be unique",
//     });
//   } else if (body.number === "") {
//     return response.status(404).json({
//       error: "number missing",
//     });
//   }

//   const person = new Person({
//     name: body.name,
//     number: body.number,
//     date: new Date(),
//   });

//   person.save().then((savedPerson) => {
//     response.json(savedPerson.toJSON());
//   });

//   // console.log("body: ", body);

//   // const newPerson = {
//   //   name: body.name,
//   //   number: body.number,
//   //   date: new Date(),
//   //   id: Math.floor(Math.random() * 1001),
//   // };

//   // console.log("body.content: ", body.content);

//   // console.log("newPerson: ", newPerson);

//   // persons = persons.concat(newPerson);
//   // console.log("persons: ", persons);

//   // response.json(persons);
// });

// const PORT = process.env.PORT;
// console.log("PORT: ", PORT);
// console.log('URI: ', process.env.MONGO_URI)
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
