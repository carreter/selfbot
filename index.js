// Import modules
const Discord = require('discord.js');

// Read config file
const config = require('./config.json');

// Create an instance of a Discord client
const client = new Discord.Client();

// Event
client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', (message) => {
  // Make sure I'm sending message starting w/ prefix
  if (message.author !== client.user || !message.content.startsWith(config.prefix)) return;

  // Get command and arguments
  const command = message.content.toLowerCase().slice(config.prefix.length);
  const args = message.content.toLowerCase().slice(config.prefix.length).split(' ').slice(1);

  // Simple ping/pong command
  if (command === 'ping') {
    message.edit(`:information_source: Pong! | ${Date.now() - message.createdAt} ms`);
  }
});

// Log bot in
client.login(config.token);
