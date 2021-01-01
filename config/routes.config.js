const express = require('express');
const common = require('../controllers/common.controller');
const posts = require('../controllers/posts.controller');


const router = express.Router();

router.get('/', common.home);
router.get('/create', posts.create);

module.exports = router;