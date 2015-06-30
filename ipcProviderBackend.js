/**
@module MistBackend
*/

/**
The IPC provider backend filter and tunnel all incoming request to the IPC geth bridge.

@class ipcProviderBackend
@constructor
*/


module.exports = function(){

    const _ = require('underscore');
    const ipc = require('ipc');
    const net = require('net');
    const Socket = net.Socket;

    var sockets = {};




    /**
    The IPC wrapper backend, handling one socket connection per view

    @class GethConnection
    @constructor
    */
    var GethConnection = function(sender, path) {
        this.ipcSocket = new Socket(),
        this.sender = sender,
        this.path = path,
        this.syncEvents = {},
        this.asyncEvents = {},


        this.sender = sender;


        this.ipcSocket.setEncoding('utf8');
        // this.ipcSocket.setKeepAlive(true, 1000 * 5);
        // this.ipcSocket.setTimeout(1000 * 10);
        // this.ipcSocket.setNoDelay(false);

        // setup socket
        this.connect();
        this.setupSocket();


        return this;
    };

    GethConnection.prototype.connect = function(){
        var _this = this;

        if(!this.ipcSocket.writable) {

            console.log('IPCSOCKET '+ this.sender.getId() +' CONNECTING..');

            this.ipcSocket = this.ipcSocket.connect({path: this.path});

        }
    };


    /**
    Creates the socket and sets up the listeners.

    @method setupSocket
    */
    GethConnection.prototype.setupSocket = function() {
        var _this = this;
        

        // wait for data on the socket
        this.ipcSocket.on("data", function(data){
            // send data down to the webview
        });

        this.ipcSocket.on("error", function(data){

            console.log('IPCSOCKET '+ _this.sender.getId() +' ERROR', data);

            _this.connect();
        });
    };




    // wait for incoming requests from dapps/ui
    ipc.on('ipcProvider-create', function(event, options){
        var socket = sockets['id_'+ event.sender.getId()];

        if(socket)
            socket.connect();
        else {
            sockets['id_'+ event.sender.getId()] = new GethConnection(event.sender, options.path);
        }
    });



    var sendRequest = function(event, payload, sync) {
        var socket = sockets['id_'+ event.sender.getId()];

        if(!socket) 
            socket = sockets['id_'+ event.sender.getId()] = new GethConnection(event.sender, options.path);

        // make sure we are connected
        socket.connect();

        console.log('IPCSOCKET '+ socket.sender.getId() +' WRITE'+ (sync ? ' SYNC' : ''), JSON.stringify(jsonPayload, null, 2));

        socket.ipcSocket.write(JSON.stringify(filteredPayload));
    }

    ipc.on('ipcProvider-write', sendRequest);

    ipc.on('ipcProvider-writeSync', function(event, payload){
        sendRequest(event, payload, true);
    });


};