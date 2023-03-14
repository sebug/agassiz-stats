const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {google} = require('googleapis');
const {authenticate} = require('@google-cloud/local-auth');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    context.log(authenticate);

    const responseMessage = "Hello from getting stats";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}