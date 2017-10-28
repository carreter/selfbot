// Import modules
const Discord = require('discord.js');
const requireDir = require('require-dir');

// Read command modules
const commands = requireDir('./commands');

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
  const command = message.content.toLowerCase().slice(config.prefix.length).split(' ')[0];
  const args = message.content.slice(config.prefix.length).split(' ').slice(1);

  commands[command].command(message, args);
});

// Log bot in
client.login(config.token);
