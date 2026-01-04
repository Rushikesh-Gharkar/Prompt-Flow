const express = require('express')
const { model } = require('mongoose')

const app =express()

// for middleware
app.use(express.json())

//checking
app.get('/' , (req , res)=>{
    res.send("API is running")
})

module.exports = app;