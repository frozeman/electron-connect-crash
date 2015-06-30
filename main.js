const app = require('app');  // Module to control application life.
const BrowserWindow = require('browser-window');  // Module to create native browser window.
const ipcProviderBackend = require('./ipcProviderBackend.js');

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

app.on('window-all-closed', function() {
    // do nothing
});


// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {


    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 400,
        height: 400,
    });

    // and load the index.html of the app.
    mainWindow.loadUrl('file://' + __dirname + '/index.html');

    // Open the devtools.
    // mainWindow.openDevTools();


    // initialize the IPC provider on the main window
    ipcProviderBackend(mainWindow);

});