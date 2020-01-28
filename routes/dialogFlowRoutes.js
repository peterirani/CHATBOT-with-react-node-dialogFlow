const dialogFlow = require("dialogflow");
const config = require("../Config/keys");

const sessionClient = new dialogFlow.SessionsClient();

const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);

// export GOOGLE_APPLICATION_CREDENTIALS="/Users/pesh/Downloads/cmpt-733-eddchl-02a94f5173d4.json"


module.exports = (app) => {
    app.get("/", (req, res) => {
        res.send({"Hello": "Jonny"});
    });

    app.post("/api/df_text_query", async (req, res) => {

        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    // The query to send to the dialogflow agent, this comes from the user
                    text: req.body.text,
                    // The language used by the client (en-US)
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
            },
        };

        let responses = await sessionClient.detectIntent(request);



        res.send(responses[0].queryResult);
    });

    app.post("/api/df_event_query", (req, res) => {
        res.send({"sample" : "event_data"})
    });
};