const express = require('express');
const common = require('../controllers/common.controller');
const posts = require('../controllers/posts.controller');

const router = express.Router();

router.get('/', common.home);
router.get('/posts', posts.list);
router.get('/posts/new', posts.new);
router.post('/posts', posts.create);
router.get('/posts/:id', posts.details);
router.post('/posts/:id/delete', posts.delete);
router.get('/posts/:id/edit', posts.edit);
router.post('/posts/:id', posts.update);

module.exports = router;