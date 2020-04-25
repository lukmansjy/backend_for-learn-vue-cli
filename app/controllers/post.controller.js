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
                message: `Error retrieving post with id=${id}`
            })
        })
}

exports.update = (req, res) => {
    const id = req.params.id

    Post.update(req.body, {
        where: {id: id}
    }).then(data => {
        if(data == 1){
            res.send({
                message: "Post was updated successfully"
            })
        }else{
            res.send({
                message: `Cannot update Post with id=${id}`
            })
        }
    }).catch( err =>{
        res.status(500).send({
            message: `Error updating post with id=${id}`
        })
    })
}

exports.delete = (req, res) => {
    const id = req.params.id

    Post.destroy({
        where: {id: id}
    }).then( data=> {
        if(data == 1){
            res.send({
                message: "Post was deleted successfully"
            })
        }else{
            res.send({
                message: `Error delete post with id=${id}`
            })
        }
    }).catch( err => {
        res.status(500).send({
            message: `Could not delete post with id=${id}`
        })
    })
}

exports.deleteAll = (req, res) => {

}

exports.findAllPublished = (req, res) => {

}