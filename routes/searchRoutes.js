const express = require('express');
const controller = require('../controllers/searchController');
const {isLoggedIn, isAuthor} = require('../middlewares/auth');
const{validateId, validateConnection, validateResult} = require('../middlewares/validator');

const router = express.Router();

//GET /stories: send all stories to the user

router.get('/', controller.homepage);

router.post('/', controller.searching);

router.get('/:id', controller.codeInspectorInfo);

router.get('/review', controller.review);

module.exports = router;