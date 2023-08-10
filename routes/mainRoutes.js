const express = require('express');
const controller = require('../controllers/mainController');

const mainRouter = express.Router();



//GET /stories/new: send html for for creating a new story
mainRouter.get('/about', controller.about);


//GET /stories/new: send html for for creating a new story
mainRouter.get('/contact', controller.contact);


module.exports = mainRouter;