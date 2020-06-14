const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('build'))

// Create morgan token for loggin request body JSON
morgan.token("body", (request, response) => {
  let obj = JSON.stringify(request.body);
  // console.log("obj: ", obj);
  return obj;
});
app.use(morgan(":method :url :status :req[content-length]ms :body"));

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
  {
    name: "James Bond",
    number: "007",
    id: 5,
  },
];

// Get all persons
app.get("/api/persons", (request, response) => {
  return response.json(persons);
});

// Get persons length and current date
app.get("/info", (request, response) => {
  const personsLength = persons.length;
  const date = new Date();

  const responseBody = `<p>Phonebook has info for ${personsLength}</p><br/><p>${date}</p>`;

  return response.send(responseBody);
});

// Get single person
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);

  const singlePerson = persons.find((person) => person.id === id);

  if (singlePerson) {
    return response.json(singlePerson);
  } else {
    return response.status(404).end();
  }
});

// const generateId = () => {
//   const maxId =
//     persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;
//   return maxId;
// };

// Delete single person
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);

  persons = persons.filter((person) => person.id !== id);

  // return response.send(persons);
  return response.status(204).end();
});

// Post new person
app.post("/api/persons/", (request, response) => {
  const body = request.body;

  // if (!body) {
  //   return response.status(400).json({
  //     error: "Content missing",
  //   });
  // }

  if (body.name === "") {
    return response.status(404).json({
      error: "name missing",
    });
    // } else if (persons.map(person => person.name.toLowerCase() === body.name.toLowerCase())) {
  } else if (persons.find((person) => person.name === body.name)) {
    return response.status(406).json({
      error: "name must be unique",
    });
  } else if (body.number === "") {
    return response.status(404).json({
      error: "number missing",
    });
  }

  // console.log("body: ", body);

  const newPerson = {
    name: body.name,
    number: body.number,
    date: new Date(),
    id: Math.floor(Math.random() * 1001),
  };

  // console.log("body.content: ", body.content);

  // console.log("newPerson: ", newPerson);

  persons = persons.concat(newPerson);
  // console.log("persons: ", persons);

  response.json(persons);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
