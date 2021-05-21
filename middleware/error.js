const mongoose = require('mongoose');
module.exports = function (err, req, res, next) {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).send("Syntax Error");
    } else if (err instanceof mongoose.CastError) {
        res.status(404).send("The given ID was not found");
    } else {
        res.status(500).send("Something Failed.");
    }
}