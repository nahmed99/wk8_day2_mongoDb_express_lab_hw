const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (collection) {

  const router = express.Router();

  // GET route - all bird sightings
  // GET /
  router.get('/', (req, res) => {
    collection
      .find()
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  // SHOW route - for a particular object id
  // GET /:id
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection
      .findOne({ _id: ObjectID(id) })
      .then((doc) => res.json(doc))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });


  // Create route
  // POST /
  router.post("/", (request, response) => {  // illustrating that you can name the parameters anything you want
    
    // get the body (data) from the *request*
    const newData = request.body;
    
    // take the body and save it to the DB
    collection.insertOne(newData)
    .then((result) => {
      // generate and return a suitable (?) response+  
      response.json(result.ops[0]); 
      // res.json(result.ops); // Will return the whole result of the insert into the database - including success (etc) codes etc.

    });
  });



  return router;
};

module.exports = createRouter;
