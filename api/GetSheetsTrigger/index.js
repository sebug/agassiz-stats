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
        context.log('Begin get sheets.');

        const client = await authorize(context);

        const sheets = google.sheets({version: 'v4', auth: client });

        context.log(process.env.SHEET_ID);

        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID
        });
    
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: res.data.sheets
        };
    } catch (err) {
        context.log(err);
        context.res = {
            status: 500,
            body: '' + err
        };
    }
};