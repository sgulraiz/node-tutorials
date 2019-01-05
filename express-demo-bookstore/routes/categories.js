const express = require('express');
//we need to use a router here
const router = express.Router();
//Define category array - When using DB, this will not be needed since all the categories will be read from the DB
var categories = [
    {"id": 1, "name": "Fiction"},
    {"id": 2, "name": "Business"},
    {"id": 3, "name": "Sports"},
    {"id": 4, "name": "Technology"},
];
//Define a get route to retrieve all categories
router.get('/', (req, res) => {
    res.send(categories);
})
//Define a get route using route parameter to get a specific record from the array using an id
router.get('/api/categories/:id', (req, res) => {
    //match the id passed into the request to the id in the array
    var category = categories.find(c => c.id === parseInt(req.params.id));
    //if the id is found then return the record, if not then send http 400 (record not found)
    if (!category) {
        res.status(400).send('Given ID is not found');
        return;
    } else {
        res.send(category);
    }
});
//Define a Post route to add a new category
router.post('/', (req, res) => {
    //validate the data in the request body
    //we are using Object destructuring below. We are reading the error object in the response that is returned from validation
    var { error } = validateCategory(req.body);
    //if req contains error then return http 404 - Bad request and the first record of the details array with the message
    //if req is valid, then add the object to the categories array
    if (error) {
        res.status(404).send(error.details[0].message);
        return;
    } else {
        var category = {
            id: categories.length + 1,
            name: req.body.name
        }
        categories.push(category);
        res.send(category);
    }
});
//Define a Put route to update a specific categories using a route param
router.put('/:id', (req, res) => {
    //check if the id in the req matched with a record in the array
    var category = categories.find(c => c.id === parseInt(req.params.id));
    //if id in the body does not match with a record in the array then send http 400 - record not found
    if (!category) {
        res.status(400).send('Give ID is not found');
        return;
    } 
    //if category id matches with the record in the array then validate the name of category before adding
    var { error } = validateCategory(req.body);
    //if the name is invalid then send 404 and 1st record from the details array with the message under the error object
    if (error) {
        res.status(404).send(error.details[0].message);
        return;
    } else {
        category.name = req.body.name;
        res.send(category);
    }
});
//Define a delete route to remove a specific record from the array using a route parameter
router.delete('/:id', (req, res) => {
    //check if the id in the req matches with a record in the categories array
    var category = categories.find(c => c.id === parseInt(req.params.id));
    //if category is not found then return http 400 - record not found
    if (!category) {
        res.status(400).send('Given ID is not found');
        return;
    } else {
        //find the index of the record in the array that needs to be deleted and then use splice to remove the record
        var index = categories.indexOf(category);
        //use splice - pass index with 1 record to be deleted
        categories.splice(index, 1);
        //send the deleted record back
        res.send(category);
    }
});
//function to validate book categories
function validateCategory(category){
    //define category schema
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(category, schema);
}

//export the router
module.exports = router;