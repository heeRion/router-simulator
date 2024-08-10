import React, { useState, useEffect } from 'react';

function NetworkDesigner({ socket }) {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    socket.on('networkUpdate', (network) => {
      setDevices(network.devices);
    });
  }, [socket]);

  return (
    <div className="network-designer">
      {devices.map(device => (
        <div
          key={device.name}
          className="device"
          style={{ position: 'absolute', left: device.x, top: device.y }}
        >
          {device.name}
        </div>
      ))}
    </div>
  );
}

export default NetworkDesigner;
