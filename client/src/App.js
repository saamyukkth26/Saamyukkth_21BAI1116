import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 60px);
  grid-template-rows: repeat(5, 60px);
  gap: 5px;
  background-color: #333;
  padding: 10px;
  margin: 20px auto;
`;

const Cell = styled.div`
  width: 60px;
  height: 60px;
  background-color: ${({ occupied }) => (occupied ? '#555' : '#999')};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border: 1px solid #222;

  &:hover {
    background-color: ${({ occupied }) => (occupied ? '#777' : '#aaa')};
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  margin: 0 5px;
  padding: 10px;
  font-size: 16px;
`;

const App = () => {
  const [board, setBoard] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState('A');
  const [selected, setSelected] = useState(null);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:3000');
    websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'stateUpdate') {
        setBoard(message.state.board);
        setCurrentPlayer(message.currentPlayer);
      } else if (message.type === 'invalid') {
        alert(message.message);
      }
    };
    setWs(websocket);
    return () => websocket.close();
  }, []);

  const handleCellClick = (row, col) => {
    const character = board[row][col];
    if (character && character.startsWith(currentPlayer)) {
      setSelected({ row, col, character });
    }
  };

  const handleMove = (direction) => {
    if (selected) {
      ws.send(JSON.stringify({ type: 'move', character: selected.character, direction }));
      setSelected(null);
    }
  };

  return (
    <div>
      <h1>Current Player: {currentPlayer}</h1>
      <Board>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell key={`${rowIndex}-${colIndex}`} occupied={!!cell} onClick={() => handleCellClick(rowIndex, colIndex)}>
              {cell}
            </Cell>
          ))
        )}
      </Board>
      <Controls>
        <Button onClick={() => handleMove('L')}>L</Button>
        <Button onClick={() => handleMove('R')}>R</Button>
        <Button onClick={() => handleMove('F')}>F</Button>
        <Button onClick={() => handleMove('B')}>B</Button>
      </Controls>
      <p>Selected: {selected ? selected.character : 'None'}</p>
    </div>
  );
};

export default App;
