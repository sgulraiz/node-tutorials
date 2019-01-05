//Custom middleware
//A midddleware function takes req, res and next parameters
//next passes control to the next middle function in order
//if next is not mentioned then we need to end the req, res cycle or must include next
//otherwise application will hang

function log(req, res, next){
    console.log("Logging.....");
    next();
}

//export module's function

module.exports = log;