const express = require('express');
const router = express.Router();
const {
    Competition,
    validate
} = require('../models/competition');
const {
    Category
} = require('../models/category');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/admin');


router.get('/', auth, async (req, res) => {
    const competitions = await Competition.find();
    res.send(competitions);
});

router.get('/:id', auth, async (req, res) => {
    const competition = await Competition.findById(req.params.id);
    if (!competition) {
        res.status(404).send('The competitions with the given ID was not found');
        return;
    }
    res.send(competition);
});

router.post('/', auth, isAdmin, async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) {
        let message = "";
        for (let index = 0; index < error.details.length; index++) {
            message += error.details[index].message + ". ";
        }
        res.status(400).send(message)
        return;
    }
    const category = await Category.findById(req.body.categoryId);
    if (!category) {
        res.status(400).send('Invalid Category');
        return;
    }
    const competition = new Competition({
        name: req.body.name,
        category: {
            _id: category._id,
            name: category.name
        },
        organizer: req.body.organizer,
        competition_site: req.body.competition_site,
        prices: req.body.prices,
        schedule: req.body.schedule
    });
    const competitions = await competition.save();
    res.send(competitions);
});


router.put('/:id', auth, isAdmin, async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) {
        let message = "";
        for (let index = 0; index < error.details.length; index++) {
            message += error.details[index].message + ". ";
        }
        res.status(400).send(message);
        return;
    }
    const category = await Category.findById(req.body.categoryId);
    if (!category) {
        res.status(400).send('Invalid Category');
        return;
    }
    const competition = await Competition.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        category: {
            _id: category._id,
            name: category.name
        },
        organizer: req.body.organizer,
        competition_site: req.body.competition_site,
        prices: req.body.prices,
        schedule: req.body.schedule
    }, {
        new: true
    });
    if (!competition) {
        res.status(404).send('The competitions with the given ID was not found');
        return;
    } else {
        res.send(competition);
    }

});

router.delete('/:id', auth, isAdmin, async (req, res) => {
    const competition = await Competition.findByIdAndRemove(req.params.id);
    if (!competition) {
        res.status(404).send('The competitions with the given ID was not found');
        return;
    }

    res.send(competition);
});

module.exports = router;