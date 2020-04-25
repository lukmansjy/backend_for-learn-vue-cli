const db = require('../models')
const Post = db.posts
const Op = db.Sequelize.Op

exports.create = (req, res) => {
    if(!req.body.title){
        res.status(400).send({
            message: 'Content can not be emty'
        })
        return
    }

    const post = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    Post.create(post)
        .then((data)=>{
            res.send(data)
        }).catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Post"
            })
        })
}

exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { [Op.like]: `%${title}%` } }: null

    Post.findAll({where: condition})
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while find post"
            })
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id

    Post.findByPk(id)
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: "Error retrieving post with id=" + id
            })
        })
}

exports.update = (req, res) => {

}

exports.delete = (req, res) => {

}

exports.deleteAll = (req, res) => {

}

exports.findAllPublished = (req, res) => {

}