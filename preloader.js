/**
@module MistAPI
*/

const ipcProviderWrapper = require('./ipcProviderWrapper.js');

ipcProviderWrapper.connect('/tmp/geth.ipc');

console.log('LOADED');