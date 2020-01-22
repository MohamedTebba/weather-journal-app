// Setup empty JS object to act as endpoint for all routes
let projectData = {
    temperature:'12',
    date:'Jan-22-2020',
    userResponse:`Good! You know, I have my off-days here and there, but I’m hanging in there.`,
    icon:'50d'
}


// Require Express to run server and routes
// import express from 'express'
const express = require('express')
// Start up an instance of app
const app = express()
/* Middleware*/
// import bodyParser from 'body-parser'
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cors for cross origin allowance
// import cors from 'cors'
const cors = require('cors')
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'))


// Setup Server
const port = 8080
app.listen(port, () => console.group('server is running at: ',port))


app.post('/', (req, res) => {
    projectData = {...req.body}
    console.group('data:')
    console.log(projectData)
    console.groupEnd()

})

app.get('*', (req, res) => {
    res.send(projectData)
})