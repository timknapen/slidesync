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
var socketURL = 'ws://thea.local:8080/'; ///<<<< EDIT THIS


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
function retryConnection() {
    conn = null;
    if (wsTimer == null) {
        wsTimer = setTimeout(connectSocket, 3000); // retry connection in 5 seconds
        console.log('WS retrying in 3sec');
    }
}

//--------------------------------------------------
function connectSocket() {
    clearTimeout(wsTimer);
    wsTimer = null;
    if (wsRetryCount > 5) {
        console.log("Exhausted max ws retries");
        return;
    }
    wsRetryCount++;
    console.log("Creating ws nr." + wsRetryCount);

    if (conn != null) {
        console.log('WS closing existing connection')
        conn.close();
    }
    conn = new WebSocket(socketURL + wsPilotToken);
    if (typeof (conn.url) == 'undefined') {
        // Safari defines 'URL'
        console.log('WS Trying to connect to ' + conn.URL);
    } else {
        // Chrome defines 'url'
        console.log('WS Trying to connect to ' + conn.url);
    }

    conn.onopen = function (e) {
        if (typeof (conn.url) == 'undefined') {
            // Safari defines URL
            console.log('WS connected on ' + conn.URL);

        } else {
            // Chrome defines url
            console.log('WS connected on ' + conn.url);
        }
    };
    conn.onclose = function (e) {
        console.log("WS connection closed!");
        retryConnection();
    }
    conn.onerror = function (e) {
        console.log("WS connection error");
        retryConnection();
    }
    conn.onmessage = function (e) {
        var now = new Date();
        var message = e.data;
        if (message.length > 3) {
            // try to parse
            if (message[0] == "T") {
                // select a new target
                var slideid = message.substr(1, message.length);
                selectSlide(slideid);
            }
            else {
                console.log("WS > " + message);
            }
        }

    };

}
