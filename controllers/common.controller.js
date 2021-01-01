const uuid = require('uuid');
let postsDB = require('../data/posts')

module.exports.home = (req, res, next) => {
    
    const { user } = req.query;

    const posts = postsDB
        .sort((p1, p2) => p2.createdAt - p1.createdAt)
        .filter(post => user ? post.user.includes(user) : true);

    res.render('common/home', {
        posts: posts,
        user: user
    });
}