require('dotenv').config()
require('./db/connect')
const express = require('express');
const app = express()
const router = require('./routes/router')

// middleware
app.use(express.static('./public'))
app.use(express.json())
app.use("/api/v1/",router)

app.get('/hello', (req,res)=>{
    res.send("Hello Suhas")
})

const port =  3000 || process.env.PORT

app.listen(port, console.log(`Server is listening to the port ${port}`))