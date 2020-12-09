#!/bin/bash
clear
date
php -f ./run/socketserver.php
echo "$(date) Socket server stopped. " >> ../logs/runnerlog.txt
echo "wait a little while ...";  sleep 10
exec $0