const express = require("express");
const path = require('path');
const app = express();


app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next();
})
app.get("/", (req, res, next) => {


    const dir = path.join(__dirname, "..", "index.html") ;
    console.log(req.path);
    res.sendFile(dir);
    
} )

app.listen(2500,() => {
    console.log("server is running");
    
}  )