# Saamyukkth_21BAI1116

Chess-Like Game Project
Overview
This project is a chess-like game with a server-client architecture. It uses WebSockets for real-time communication. The client is built with React and the server is built with Node.js. The project allows players to interact with a game board and make moves in real-time.

Project Structure
client/: Contains the React-based web client for rendering the game board and player interactions.
server/: Contains the Node.js server for handling game logic and WebSocket communication.
Prerequisites
Node.js (v16 or higher)
npm (v8 or higher)
Installation
Client Setup
Navigate to the client directory:

bash
Copy code
cd client
Install the dependencies:

bash
Copy code
npm install
Create a .env file in the client directory and add the following variables:

env
Copy code
REACT_APP_SERVER_URL=http://localhost:5000
Server Setup
Navigate to the server directory:

bash
Copy code
cd server
Install the dependencies:

bash
Copy code
npm install
Create a .env file in the server directory and add the following variables:

env
Copy code
PORT=5000
Starting the Server
Navigate to the server directory:

bash
Copy code
cd server
Start the server:

bash
Copy code
npm start
The server will start on http://localhost:5000.

Starting the Client
Navigate to the client directory:

bash
Copy code
cd client
Start the client:

bash
Copy code
npm start
The client will open in your default browser at http://localhost:3000.

Operating the Game
Open the Client: Once both the server and client are running, open the client application in your web browser.

Create or Join a Game:

If your application supports creating or joining games, use the appropriate interface in the client to start or join a game session.
Playing the Game:

Interact with the game board by making moves according to the game rules.
Moves will be synchronized in real-time with the other player(s) through WebSocket communication.
Troubleshooting
Server Not Starting: Ensure that you have the correct environment variables set in the .env file and that no other process is using the specified port.
Client Not Connecting: Verify that the REACT_APP_SERVER_URL in the .env file is correctly pointing to the server's URL and that the server is running.
