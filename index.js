const express = require("express");
const app = express();
const PORT = process.env.PORT || 500

app.get("/", (req, res) => {
    res.send({"Hello": "There"});
});

app.listen(PORT, ()=>{
    console.log("started server")
});