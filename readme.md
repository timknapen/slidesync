
A simple websocket test for Thea's presentation.
By Tim Knapen. 

This is built with Ratchet. See https://github.com/ratchetphp/Ratchet

# Setting up this websocket slideshow

### Requirements
All computers need to be connected to the same network so they can see each other. (Or run your servers on a remote machine)

## Setup the server
One computer needs to be the server. Let's call him `thea.local`

On this computer we'll run an Http server which will serve the pilot page to your phone. The pilot page functions as the remote control for the other computers.

We'll also run the websocket server on this machine.


### Apache setup

- Download and install MAMP
- Open the MAMP app in `/Applications/MAMP/`
- In MAMP's preferences, set Apache port to 80
- Move the whole repo into `/Applications/MAMP/htdocs/`
- Start MAMP by clicking the **start servers** button. It should ask you for your password.


### Socket server

Start the socketserver by double clicking **runner.command** in `slidesync/socketserver/`
Don't close the terminal window that opens.
To shut down the socket server, type `ctrl+c`


### Viewers

On all the other computers, edit the images and videos in the `files` folder.

Edit the list of files in `site/slidesync.js` so it matches the contents of the `files` folder.

Start the slideshow simply by opening `index.html` in Safari or Chrome. The page should automatically connect to the socket server.


### Open the pilot page

On your iPhone, open Safari go to `thea.local/slidesync/pilot/` .

Pressing the buttons should control all the other machines now.


