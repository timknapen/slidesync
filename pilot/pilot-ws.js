/*
 *
 *  Websocket synced slides test
 *  (c)2020 Tim Knapen
 *  www.timknapen.be
 *
 */

var conn;
var wsTimer = null;
var wsPilotToken = 'SLIDESYNC'; ///<<<< EDIT THIS TO MATCH PILOT_TOKEN in socketserver/run/socketserver.php
var wsRetryCount = 0;

// choose the websocket URL
//--------------------------------------------------
var socketURL = 'ws://prototypeclub.local:8080/'; ///<<<< EDIT THIS


// transmit over ws if you are the pilot
//--------------------------------------------------
function targetSlide(slideid) {
    if (conn == null) {
        return;
    }
    console.log("targeting " + slideid);
    var txt = 'T' + slideid;
    console.log("WS sending " + txt);
    conn.send(txt);
}


//--------------------------------------------------
function showMessage(mssg) {

    console.log(mssg);
    $('#message').html(mssg);
    $('#message').removeClass('hidden');
}

//--------------------------------------------------
function hideMessage() {
    $('#message').addClass('hidden');
}


//--------------------------------------------------
function retryConnection() {
    conn = null;
    showMessage('WS retrying in 3 sec...');

    if (wsTimer == null) {
        wsTimer = setTimeout(connectSocket, 3000); // retry connection in 5 seconds
    }
}

//--------------------------------------------------
function connectSocket() {
    clearTimeout(wsTimer);
    wsTimer = null;
    if (wsRetryCount > 50) {
        showMessage("Exhausted max ws retries");
        return;
    }
    wsRetryCount++;
    showMessage("Creating ws nr." + wsRetryCount);

    if (conn != null) {
        showMessage('WS closing existing connection')
        conn.close();
    }
    conn = new WebSocket(socketURL + wsPilotToken);
    if (typeof(conn.url) == 'undefined') {
        // Safari defines 'URL'
        showMessage('WS Trying to connect to ' + conn.URL);
    } else {
        // Chrome defines 'url'
        showMessage('WS Trying to connect to ' + conn.url);
    }

    conn.onopen = function(e) {
        if (typeof(conn.url) == 'undefined') {
            // Safari defines URL
            console.log('WS connected on ' + conn.URL);
            showMessage("Connected");
        } else {
            // Chrome defines url
            console.log('WS connected on ' + conn.url);
            showMessage("Connected");
        }
    };
    conn.onclose = function(e) {
        showMessage("WS connection closed!");
        retryConnection();
    }
    conn.onerror = function(e) {
        showMessage("WS connection error");
        retryConnection();
    }
    conn.onmessage = function(e) {
        showMessage("Connected");
        var now = new Date();
        var message = e.data;
        if (message.length > 3) {
            // try to parse
            if (message[0] == "T") {
                // select a new target
                var slideid = message.substr(1, message.length);
                selectSlide(slideid);
            } else {
                console.log("WS > " + message);
            }
        }

    };

}