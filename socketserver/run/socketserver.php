<?php
use Ratchet\Tutorials\Chat;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;


define('PILOT_TOKEN', 'SLIDESYNC'); ///<<<< EDIT THIS TO MATCH pilot token in pilot-ws.js

function output($txt){
    wslog($txt);
    echo getNow().' '.$txt."\n";
}

function getNow(){
    return  date("Y-m-d H:i:s");
}

function wslog($log){
    $log = getNow().' '.$log."\n";
    $root = dirname(dirname(dirname(__FILE__))).'/';
    file_put_contents($root.'logs/log_'.date("Y-n-j").'.txt', $log, FILE_APPEND);
}




    require dirname(__DIR__) . '/vendor/autoload.php';

    $server = IoServer::factory(
        new HttpServer(
            new WsServer(
                new Chat()
            )
        )
      , 8080
    );

    $server->run();