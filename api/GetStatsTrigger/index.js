const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {google} = require('googleapis');
const {authenticate} = require('@google-cloud/local-auth');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize(context) {
    context.log('Service account key length: ' + process.env.SERVICE_ACCOUNT_KEY.length)

    await fs.writeFile("keyfile.json", process.env.SERVICE_ACCOUNT_KEY);

    client = await authenticate({
      scopes: SCOPES,
      keyfilePath: "keyfile.json",
    });
    return client;
  }

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const client = await authorize(context);

    context.log(client);

    const responseMessage = "The stats will appear here - " + process.env.PROJECT_ID;

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}