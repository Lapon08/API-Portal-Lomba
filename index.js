require('express-async-errors');
const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const competitions = require('./routes/competitions');
const categories = require('./routes/categories');
const users = require('./routes/users');
const auth = require('./routes/auth');
const error = require('./middleware/error');
const notfound = require('./middleware/notfound');

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/portallomba', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log("Connected to Mongodb"))
    .catch(err => console.error('Could not connect to Mongodb'))

app.use(express.json());
app.use('/api/competitions', competitions);
app.use('/api/categories', categories);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);
app.use(notfound);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on PORT " + PORT);
})