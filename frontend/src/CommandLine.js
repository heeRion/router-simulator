import React, { useState } from 'react';

function CommandLine({ socket }) {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');

  const handleCommandSubmit = () => {
    socket.emit('executeCommand', command);
    socket.on('commandResult', (result) => {
      setOutput(result);
    });
    setCommand('');
  };

  return (
    <div className="command-line">
      <input
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="Enter command"
      />
      <button onClick={handleCommandSubmit}>Execute</button>
      <pre>{output}</pre>
    </div>
  );
}

export default CommandLine;
