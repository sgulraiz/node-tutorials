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
//this is hardcoded port - in real world we need to use environment variable to use the port dynamilcally assigned by the hosting provider
//app.listen(3000, () => console.log('Listening on port 3000...'));
//When hosting this application on a hosting provider, they will assign a port or will provider environment variable
//in this example, we will set an environment variable called PORT and will assign port 5000 - on MAC export PORT=5000
//if the environment variable is not defined, it will use port 3000 - "|| 3000"
const port = process.env.PORT || 3000;
//We will have app listen on PORT - We are using back tick when defining string template below - key next to number 1 on keybord
app.listen(port, () => console.log(`Listening on port ${port}...`));


