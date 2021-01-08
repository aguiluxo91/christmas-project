const posts = require('../models/post.model');
const createError = require('http-errors');

module.exports.list = (req, res) => {
    const postsList = posts.posts
        .sort((p1, p2) => p2.createdAt - p1.createdAt)
    res.render('common/posts', {
        posts: postsList
    });
}


module.exports.new = (req, res) => {
    res.render('posts/new')
}


module.exports.create = (req, res) => {
    const { title, image, text } = req.body;

    if (!title || !text || title.length > 40 || text.length > 300) {
        const errors = {}
        if (!title) {
            errors.title = 'Title is mandatory';
        }
        if (!text) {
            errors.text = 'Text is mandatory'
        }
        if(title.length > 40) {
            errors.title = 'Title length must be shorter than 40 characters'
        }
        if(text.length > 300) {
            errors.text = 'Text length must be shorter than 300 characters'
        }
        res.render('posts/new', {
            post: req.body,
            errors: errors
        })
    } else {
        posts.create({
            title: title,
            image: image,
            text: text
        })
        res.redirect('/posts')
    }

}

module.exports.details = async (req, res, next) => {
    const { id } = req.params;
    const post = await posts.findById(id);

    if (!post) {
        next(createError(404))
    } else {
        res.render('posts/details', {
            post: post
        });
    }
}

module.exports.delete = async (req, res) => {
    const { id } = req.params;
    await posts.findByIdAndDelete(id);
    res.redirect('/posts');
}

module.exports.edit = async (req, res) => {
    const { id } = req.params;
    const post = await posts.findById(id);
    res.render('posts/edit', {
        post
    });
}

module.exports.update = async (req, res) => {
    const { title, image, text } = req.body;
    const { id } = req.params;
    if (!title || !text || title.length > 40 || text.length > 300) {
        const errors = {}
        if (!title) {
            errors.title = 'Title is mandatory';
        }
        if (!text) {
            errors.text = 'Text is mandatory'
        }
        if(title.length > 40) {
            errors.title = 'Title length must be shorter than 40 characters'
        }
        if(text.length > 300) {
            errors.text = 'Text length must be shorter than 300 characters'
        }
        res.render('posts/new', {
            post: req.body,
            errors: errors
        })
    } else {
        await posts.findByIdAndUpdate(id, {
            title: title,
            image: image,
            text: text
        })
        res.redirect(`/posts/${id}`);
    }
}