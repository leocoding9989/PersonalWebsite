console.log("ignore");
const express = require("express");
const path = require('path');
const app = express();
app.get("/", (req, res, next) => {


    const dir = path.join(__dirname, "..", "Numbercounter.html") 
    console.log(dir);
    res.sendFile(dir);
    
} )
app.get("/name/:name/color/:color", (req, res, next) => {
    const name = req.params.name;
    
    const color = req.params.color;
    res.send(`
        <style>
        h1{
        color: ${color};
        };
        </style>
        <h1>Hello ${name} </h1>
        `);
})
app.listen(3000,() => {
    console.log("server is running");
    
}  )
