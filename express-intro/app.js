//load Joi module for schema validation - require(joi) retuens a class
const Joi = require("joi");
//load express module
const express = require('express');
//if we use the above mentioned function, it return an object of type express. We assign this object to a constant called app
const app = express();
//We need the express.json middleware to read the object from the request before using the information in a post request
app.use(express.json());
//Define Schema
const schema = {
    name: Joi.string().min(3).required()
};
//app object has bunch of methods - we will use the get method
//get method takes 2 aurgument, first method takes the path or the url
//2nd aurgument is the call back function - ths call back function has 2 arguments - req and res
app.get('/', (req, res) => {
    res.send('Hello World!');
});
//Define courses array
var courses = [
    {id: 1, name: 'Course1'},
    {id: 2, name: 'Course2'},
    {id: 3, name: 'Course3'},
]
//endpoint to return courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
})
//route parameters to within the body of the endpoint - example below we have 
//a parameter defined in the endpoint named "id" and it could be anything and doesnt have to be just "id"
//app.get('/api/courses/:id', (req, res) => {
//    res.send(req.params.id);
//});
//Below we will define a get endpoint to return a specific course
//we will go through the courses array by using the find function and match the id with the id passed in as a parameter in the url
//if found then we will return the course otherwise we will return http error 404
app.get('/api/courses/:id', (req, res) => {
    var course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with given id was not found');
    } else {
        res.send(course);
    }
});
//in the example below we have 2 parameters defined which can read from the req object and send it as a response
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});
//Below is the example of a post request where the information passed into the request
//we use the informtion and create a ccourse object and then push it to the courses array
app.post('/api/courses', (req, res) => {
    //define a course object and contruct it using the infromation passed on the body of the request
    //we will read the name from the body of the request
    //In this example since we are not using a database, we are responsible for manually creating an id
    //we will take the length of the courses array and add 1 to it to create an id
    //We will validate the name passed in the body against our defined schema 
    var result = Joi.validate(req.body, schema);
    if (result.error){
        res.status(400).send(result.error.details[0].message)
    } else {
        var course = {
            id: courses.length + 1,
            name: req.body.name
    }
}
    //push the new course to the courses array
    courses.push(course);
    res.send(course);
});
//app object also comes with a web server that we can configure to listen a specific port
//this is hardcoded port - in real world we need to use environment variable to use the port dynamilcally assigned by the hosting provider
//app.listen(3000, () => console.log('Listening on port 3000...'));
//When hosting this application on a hosting provider, they will assign a port or will provider environment variable
//in this example, we will set an environment variable called PORT and will assign port 5000 - on MAC export PORT=5000
//if the environment variable is not defined, it will use port 3000 - "|| 3000"
const port = process.env.PORT || 3000;
//We will have app listen on PORT - We are using back tick when defining string template below - key next to number 1 on keybord
app.listen(port, () => console.log(`Listening on port ${port}...`));