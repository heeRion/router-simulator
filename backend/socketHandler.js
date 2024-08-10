const Network = require('./simulator/network');
const Router = require('./simulator/router');
const PC = require('./simulator/pc');

const network = new Network();

function handleSocketEvents(socket, io) {
  socket.on('createDevice', (data) => {
    let device;
    if (data.type === 'router') {
      device = new Router(data.name);
    } else if (data.type === 'pc') {
      device = new PC(data.name);
    }
    network.addDevice(device);
    io.emit('networkUpdate', network.showNetwork());
  });

  socket.on('connectDevices', (data) => {
    const { device1, interface1, device2, interface2 } = data;
    const device1Instance = network.getDeviceByName(device1);
    const device2Instance = network.getDeviceByName(device2);

    if (device1Instance && device2Instance) {
      const cable = new Cable();
      cable.connect(device1Instance, interface1, device2Instance, interface2);
      network.addCable(cable);
      io.emit('networkUpdate', network.showNetwork());
    }
  });

  socket.on('executeCommand', (command) => {
    const result = processCommand(command, network);
    socket.emit('commandResult', result);
  });
}

module.exports = { handleSocketEvents };
