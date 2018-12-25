//load express module
const express = require('express');
//if we use the above mentioned function, it return an object of type express. We assign this object to a constant called app
const app = express();
//app object has bunch of methods - we will use the get method
//get method takes 2 aurgument, first method takes the path or the url
//2nd aurgument is the call back function - ths call back function has 2 arguments - req and res
app.get('/', (req, res) => {
    res.send('Hello World!');
});
//endpoint to return an array of courses
app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
})
//app object also comes with a web server that we can configure to listen a specific port
app.listen(3000, () => console.log('Listening on port 3000...'));


