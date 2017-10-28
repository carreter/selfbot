// Simple ping/pong command

const command = (message) => {
  message.edit(`:information_source: Pong!  |  ${Date.now() - message.createdAt} ms`);
};

const help = {
  description: 'Simple ping/pong command',
  usage: 'ping',
  examples: ['ping'],
};

module.exports = {
  command,
  help,
};
