const express = require('express')
const app = express()
const db = require('./db.js')
require('dotenv').config()


const bodyParser = require('body-parser');
app.use(bodyParser.json())
const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} REquest made to ; ${req.originalUrl}`);
    next();
}

app.get('/', logRequest, function(req, res) {
        res.send("Hello lokey")
    })
    // middlewere




const personRoutes = require('./routes/personRoutes.js')
app.use('/person', personRoutes)
const menuRoutes = require('./routes/menuRoutes.js')
app.use('/menuItem', menuRoutes)
const PORT = process.env.PORT || 6000
app.listen(5000, () => {
    console.log("server is listening on port 5000");
})