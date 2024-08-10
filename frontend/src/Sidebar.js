import React, { useState } from 'react';

function Sidebar({ socket }) {
  const [deviceName, setDeviceName] = useState('');

  const handleAddDevice = (type) => {
    socket.emit('createDevice', { name: deviceName, type });
    setDeviceName('');
  };

  return (
    <div className="sidebar">
      <h2>Add Device</h2>
      <input
        type="text"
        value={deviceName}
        onChange={(e) => setDeviceName(e.target.value)}
        placeholder="Device Name"
      />
      <button onClick={() => handleAddDevice('router')}>Add Router</button>
      <button onClick={() => handleAddDevice('pc')}>Add PC</button>
    </div>
  );
}

export default Sidebar;
