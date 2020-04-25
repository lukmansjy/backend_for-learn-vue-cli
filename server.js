const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./app/models')

const app = express()

const whiteList = ['http://localhost:8080']

const corsOption = {
    origin: function(origin, callback){
        if(whiteList.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else{
            callback(new Error("Not allowed by CORS"))
        }
    }
}


app.use(cors(corsOption))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

db.sequelize.sync()

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome'
    })
})

require("./app/routes/post.routes")(app)

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})