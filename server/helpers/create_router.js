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
  router.post("/", (request, response) => { 

    // response.send("placeholder POST"); // This will show up in Insomnia - if you are using it!
    
    // get the body (data) from the *request*
    const newData = request.body;
    
    // take the body and save it to the DB
    collection.insertOne(newData)
    .then((result) => {
      // generate and return a suitable (?) response+  
      response.json(result.ops[0]); 
      // res.json(result.ops); // Will return the whole result of the insert into the database - including success (etc) codes etc.

    })
    .catch((err) => {
      console.error(err);
      response.status(500);
      response.json( { status: 500, error: err } );
    });
  });


  // Delete route
  // DELETE /:id
  router.delete("/:theId", (request, response) => {
    // response.send("placeholder DELETE"); // This will show up in Insomnia - if you are using it!

    const id = request.params.theId;

    collection.deleteOne( { _id: ObjectID(id) })
    .then((result) => {
      return response.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err });
    });


    // Could have written the delete as - need to decypher it...:
    /*

    collection
      .deleteOne({ _id: ObjectID(id) })
      .then(() => collection.find().toArray())
      .then((docs) => response.json(docs))
      .catch((err) => {
        console.error(err)
        response.status(500);
        response.json({ status: 500, error: err});
      });

    */
  });


  return router;
};

module.exports = createRouter;
