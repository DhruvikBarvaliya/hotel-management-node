const dotenv = require('dotenv').config()
const indexRouter = require('./routes/indexRouter')
const path = require('path')
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, 'uploads')));
app.use('/uploads/*', express.static('uploads'));

const database = require('./config/db');
database();

app.use("/api", indexRouter)

const port = process.env.PORT || 4000

app.listen(port, console.log(`Server is Running on Port No ${port}`))