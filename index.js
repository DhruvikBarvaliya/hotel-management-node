const dotenv = require('dotenv').config()
const indexRouter = require('./routes/indexRouter')
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded())
const database = require('./config/db');

// database();
app.use(indexRouter)
const port = process.env.PORT || 4000

app.listen(port, console.log(`Server is Running on Port No ${port}`))