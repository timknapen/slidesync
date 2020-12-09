#!/bin/bash
clear
date
ABSPATH=$(cd "$(dirname "$0")"; pwd)
#cd $ABSPATH
php -f $ABSPATH/run/socketserver.php
echo "$(date) Socket server stopped. " >> $ABSPATH/../logs/runnerlog.txt
echo "wait a little while ...";  sleep 10
exec $0