var scopes = 'https://spreadsheets.google.com/feeds';
var clientId = 'working';
var apiKey = 'working';

function handleClientLoad() {
    console.log('inside handleClientLoad function');
    gapi.client.setApiKey(apiKey);
    window.setTimeout(checkAuth,1);
}

function checkAuth() {
    console.log('inside checkAuth function');
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
    console.log('finished checkAuth function');
}

function handleAuthResult(authResult) {
    console.log('inside handleAuthResult function');
    console.log(gapi.auth.getToken());
    var authButton = document.getElementById('authButton');
    authButton.style.display = 'none';
    if (authResult && !authResult.error) {
        //Access token has been successfully retrieved, requests can be sent to the API.
        loadClient();
    } else {
        //No access token could be retrieved, show the button to start the authorization flow.
        authButton.style.display = 'block';
        authButton.onclick = function() {
            gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
        };
    }
}

function loadClient() {
    console.log('inside loadClient function');
    var token = gapi.auth.getToken().access_token;
    var urlLocation = ''; //Get this from the URL of your Spreadsheet in the normal interface for Google Drive.

    //This gives a spitout of ALL spreadsheets that the user has access to.
    var url = 'https://spreadsheets.google.com/feeds/spreadsheets/private/full?access_token=' + token;

    //This gives a list of all worksheets inside the Spreadsheet, does not give actual data
    var url = 'https://spreadsheets.google.com/feeds/worksheets/' + urlLocation + '/private/full?access_token=' + token;

    //This gives the data in a list view - change the word list to cells to work from a cell view and see https://developers.google.com/google-apps/spreadsheets/#working_with_cell-based_feeds for details
    var url = 'https://spreadsheets.google.com/feeds/list/' + urlLocation + '/od6/private/full?access_token=' + token;

    console.log(url);
    $.get(url, function(data) {
        console.log(data);
    });
}