<?php
namespace Ratchet\Tutorials;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;


class Chat implements MessageComponentInterface {
    protected $clients; 
    protected $lastMessage;
    protected $numConnections;
    protected $pilot;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
        $this->lastMessage = "welcome";
        $this->numConnections = 0;
        echo "\n\n";
        output("# Started WS server");
        echo "\n";
    }

    public function onOpen(ConnectionInterface $conn) {
        // Store the new connection to send messages to later
        $this->clients->attach($conn);
        $this->numConnections++;
        output( "Created connection ".$this->numConnections." from: ".$conn->remoteAddress);
        if (isset($conn->WebSocket)) {
            //echo 'name: '.$conn->WebSocket->request->getCookie('name')."\n";
            //echo "info: \n";
            $url = $conn->WebSocket->request->getURL();
            $uri = "$url";
            $token = basename($uri);
            //echo 'token: '.$token."\n";
           
           
            output('token: '.$token);

            if($token == PILOT_TOKEN && PILOT_TOKEN != ''){
                output( " - We have a new pilot!");
                $this->pilot = $conn;
                $conn->send('P1 you are pilot');
            }
            

        }

        if($this->lastMessage){
            $conn->send( $this->lastMessage); // << welcome message
        }
        
        $conn->send($this->numConnections." connections live.");
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        if(substr($msg, 0, 1) == 'T'){
            $this->lastMessage = $msg;
        }
        if($from == $this->pilot){
           // echo ">".$from->resourceId.': '.$this->lastMessage."\n"; // print the received messages
            foreach ($this->clients as $client) {
                if ($from !== $client) {
                    $client->send($msg);
                }
            }
        }
    }

    public function onClose(ConnectionInterface $conn) {
        // The connection is closed, remove it, as we can no longer send it messages
        $this->clients->detach($conn);
        $this->numConnections--;
        output( "Closed connection (".$this->numConnections.")"); 

        if($this->pilot == $conn){
            output("--- The pilot has left");
        }
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        trigger_error("An error has occurred: {$e->getMessage()}\n", E_USER_WARNING);
        $conn->close();
    }
}