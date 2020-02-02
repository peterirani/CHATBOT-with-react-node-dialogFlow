const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
require("./routes/dialogFlowRoutes")(app);

if(process.env.NODE_ENV === "production"){
    //we will display our front end
    app.use(express.static('client/build'));

    //all page routes
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, ()=>{
    console.log("started server")
});