module.exports = app => {
    const posts = require('../controllers/post.controller')

    let router = require('express').Router()

    // Create new post
    router.post('/', posts.create)

    // Retrieve all posts
    router.get('/', posts.findAll)

    // Retrieve single post
    router.get('/:id', posts.findOne)

    // Update post
    router.put('/:id', posts.update)

    app.use('/api/posts', router)
}