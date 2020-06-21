// const mongoose = require("mongoose");

// if (process.argv.length < 3) {
//   console.log("give password as argument");
//   process.exit(1);
// }

// const password = process.argv[2];

// const url = `mongodb+srv://oma-user-1:${password}@cluster0-a69br.mongodb.net/persons?retryWrites=true&w=majority`;

// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// const personSchema = mongoose.Schema({
//   name: String,
//   number: String,
//   date: Date,
// });

// const Person = mongoose.model("Person", personSchema);

// const person = new Person({
//   name: process.argv[3],
//   number: process.argv[4],
//   date: new Date(),
// });

// // Save person to database
// if (process.argv.length > 3) {
//   person.save().then((response) => {
//     console.log(
//       `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
//     );
//     mongoose.connection.close();
//   });
// }

// // Get persons from database
// if (process.argv.length === 3) {
//   Person.find({}).then((result) => {
//     console.log("Phonebook: ");
//     result.forEach((person) => {
//       // phonebook.push([person.name, person.number]);
//       console.log(`${person.name} ${person.number}`);
//     });
//     mongoose.connection.close();
//   });
// }

// // console.log('arguments: ', process.argv)
