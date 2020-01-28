const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
require("./routes/dialogFlowRoutes")(app);


app.listen(PORT, ()=>{
    console.log("started server")
});