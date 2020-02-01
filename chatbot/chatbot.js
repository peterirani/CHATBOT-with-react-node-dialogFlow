const dialogFlow = require("dialogflow");
const config = require("../Config/keys");
const structjsnon = require("structjson");


const projectID = config.googleProjectID;
const credentials = {
    client_email : config.googleClientEmail,
    private_key: config.googlePrivateKey
};

const sessionClient = new dialogFlow.SessionsClient({projectID: projectID, credentials : credentials});

module.exports = {
    textQuery : async function(text, userID ,parameters = {}){
        //create a unique dialogFlow sessions id for each client by appending the UUID v4 (a pure number) as a string.
        let sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID + userID);
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    // The query to send to the dialogflow agent, this comes from the user
                    text: text,
                    // The language used by the client (en-US)
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
                queryParams : {
                    payload : {
                        data : parameters
                    }
                }
            },
        };
        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;
    },

    handleAction : function(responses){
        return responses;
    },

    eventQuery : async function(event, userID, parameters = {}){
        // self is used to import the functions exported by this module
        let self = module.exports;
        let sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID + userID);
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    // The query to send to the dialogflow agent, this comes from the user
                    name: event,
                    parameters : structjsnon.jsonToStructProto(parameters),
                    languageCode: config.dialogFlowSessionLanguageCode,
                }
            },
        };
        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;
    },

};