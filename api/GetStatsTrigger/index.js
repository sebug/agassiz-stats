const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const os = require('os');
const {Auth, google} = require('googleapis');
const {authenticate} = require('@google-cloud/local-auth');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize(context) {
    context.log('Service account key length: ' + process.env.SERVICE_ACCOUNT_KEY.length);

    await fs.writeFile(path.join(os.tmpdir(), "keyfile.json"), process.env.SERVICE_ACCOUNT_KEY);

    const auth = new Auth.GoogleAuth({
        keyFile: path.join(os.tmpdir(), "keyfile.json"),
        scopes: SCOPES
    });

    const client = await auth.getClient();

    context.log('Client is ' + client);
    context.log(client);

    return client;
  }

module.exports = async function (context, req) {
    try {
        context.log('Begin get stats.');

        const client = await authorize(context);
    
        context.log(client);
    
        const responseMessage = "The stats will appear here - " + process.env.PROJECT_ID;
    
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: responseMessage
        };
    } catch (err) {
        context.res = {
            status: 500,
            body: '' + err
        };
    }
};