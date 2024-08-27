const express = require('express');
const WebSocket = require('ws');

const app = express();
const port = 3000;
const server = app.listen(port, () => console.log(`Server is running on port ${port}`));

const wss = new WebSocket.Server({ server });

let gameState = initializeGameState();
let currentPlayer = 'A';

wss.on('connection', (ws) => {
    ws.send(JSON.stringify({ type: 'init', state: gameState }));

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        if (data.type === 'move') {
            const response = processMove(data);
            if (response.valid) {
                broadcastState();
            } else {
                ws.send(JSON.stringify({ type: 'invalid', message: response.message }));
            }
        }
    });
});

function initializeGameState() {
    // Initialize the game state with players' characters on the board
    return {
        board: [
            ['A-P1', 'A-P2', 'A-H1', 'A-H2', 'A-P3'],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['B-P1', 'B-P2', 'B-H1', 'B-H2', 'B-P3']
        ]
    };
}

function processMove(data) {
    // Validate and process the move, update gameState if valid
    // Logic goes here
    return { valid: true, message: 'Move processed' };
}

function broadcastState() {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'stateUpdate', state: gameState, currentPlayer }));
        }
    });
}
