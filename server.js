const express = require('express')
const app = express()
const db = require('./db.js')


const bodyParser = require('body-parser');
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.send("Hello lokey")
})



const personRoutes = require('./routes/personRoutes.js')
app.use('/person', personRoutes)
const menuRoutes = require('./routes/menuRoutes.js')
app.use('/menuItem', menuRoutes)

app.listen(5000, () => {
    console.log("server is listening on port 5000");
})