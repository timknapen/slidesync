/*
*
*  Websocket synced slides test
*  (c)2020 Tim Knapen
*  www.timknapen.be
*
*/

var conn;
var wsTimer = null;
var wsRetryCount = 0;

// choose the websocket URL
//--------------------------------------------------
var socketURL = 'ws://prototypeclub.local:8080/'; ///<<<< EDIT THIS





//--------------------------------------------------
function retryConnection() {
    conn = null;
    if (wsTimer == null) {
        wsTimer = setTimeout(connectSocket, 3000); // retry connection in 3 seconds
        output('WS retrying in 3sec');
    }
}

//--------------------------------------------------
function connectSocket() {
    clearTimeout(wsTimer);
    wsTimer = null;
    if (wsRetryCount > 10) {
        status("Exhausted max ws retries");
        return;
    }
    wsRetryCount++;
    status("Creating ws nr." + wsRetryCount);

    if (conn != null) {
        status('WS closing existing connection')
        conn.close();
    }
    conn = new WebSocket(socketURL);
    if (typeof (conn.url) == 'undefined') {
        // Safari defines URL
        status('WS Trying to connect to ' + conn.URL);

    } else {
        // Chrome defines url
        status('WS Trying to connect to ' + conn.url);
    }

    conn.onopen = function (e) {
        if (typeof (conn.url) == 'undefined') {
            // Safari defines URL
            status('WS connected on ' + conn.URL);

        } else {
            // Chrome defines url
            status('WS connected on ' + conn.url);
        }

    };
    conn.onclose = function (e) {
        status("WS connection closed!");
        retryConnection();
    }
    conn.onerror = function (e) {
        status("WS connection error");
        retryConnection();
    }
    conn.onmessage = function (e) {
        var now = new Date();
        var message = e.data;
        if (message.length > 1) {
            // try to parse
            if (message[0] == "T") {
                // select a new target
                var slideID = parseInt( message.substr(1, message.length));
                selectSlide(slideID);
            }
            else {
                console.log("WS > " + message);
            }
        }
    };

}
