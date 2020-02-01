
const chatbot = require("../chatbot/chatbot");

// export GOOGLE_APPLICATION_CREDENTIALS="/Users/pesh/Downloads/cmpt-733-eddchl-02a94f5173d4.json"


module.exports = (app) => {
    app.get("/", (req, res) => {
        res.send({"Hello": "Jonny"});
    });

    app.post("/api/df_text_query", async (req, res) => {
        let responses = await chatbot.textQuery(req.body.text, req.body.userID, req.body.parameters);
        // The text query request.
        res.send(responses[0].queryResult);
    });

    app.post("/api/df_event_query", async (req, res) => {
        let responses = await chatbot.eventQuery(req.body.event, req.body.userID,req.body.parameters);
        res.send(responses[0].queryResult);
    });
};