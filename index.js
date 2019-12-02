// implement your API here

const express = require("express");
const db = require("./data/db.js");

const server = express();

server.use(express.json());
// req === request res === response AKA "the homies"
server.get("/", (req, res) => {
  res.send({ api: "up and running." });
});

//GET list of users
server.get("/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log("ERROR on GET /users", error);
      res
        .status(500)
        .json({ errorMessage: "error getting list of users from database" });
    });
});

//POST create a user
server.post("/users", (req, res) => {
  const userData = req.body;
  if (!userData.name || !userData.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please add a name and bio for the user." });
  } else {
    db.insert(userData)
      .then(user => res.status(201).json(user))
      .catch(error => {
        console.log("ERROR on POST /users", error);
        res.status(500).json({ errorMessage: "error adding user" });
      });
  }
});

//GET user by id
server.get("/users/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ errorMessage: " error retrieving user" });
    });
});

//DELETE user by id
server.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(removed => {
      if (removed) {
        res.status(200).json({ message: "user deleted succesfully" });
      } else {
        res.status(500).json({ Message: "user not found" });
      }
    })
    .catch(error => {
      console.log("error on delete /users", error);
      res.status(500).json({ errorMessage: "error deleting user" });
    });
});
//PUT updates the user info with data from request body. returns modified document

server.put("users/:id", (req, res) => {

})

const port = 5000;
server.listen(port, () =>
  console.log(`\n ** API running on port ${port} ** \n`)
);
