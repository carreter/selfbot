// Import modules
const Discord = require('discord.js');
const requireDir = require('require-dir');
const fs = require('fs-extra');
const path = require('path');

// Create an instance of a Discord client
const client = new Discord.Client();

// Read config file, create it if it does not exist
let config;
const configFile = path.resolve('./config.json');

fs.readJSON(configFile) // Attempt to read file
  .then((configObj) => { config = configObj; })
  .then(() => client.login(config.token)) // Login once config file read
  .catch((err) => {
    if (err.code === 'ENOENT') { // Prompt to create config file if it does not exist
      console.error('Config file not found, creating template. Please fill this out and rerun bot!');
      fs.writeJSON(configFile, { token: '', prefix: 's!' });
    } else {
      console.log(err);
    }
  });

// Read command modules
const commands = requireDir('./commands');

// Notify on connection to Discord
client.on('ready', () => {
  console.log('Connected to Discord API.');
});

// Create an event listener for messages
client.on('message', (message) => {
  // Make sure I'm sending message starting w/ prefix
  if (message.author !== client.user || !message.content.startsWith(config.prefix)) return;

  // Get command and arguments
  const command = message.content.toLowerCase().slice(config.prefix.length).split(' ')[0];
  const args = message.content.slice(config.prefix.length).split(' ').slice(1);

  // Check if command exists, then run it if it does
  if (Object.prototype.hasOwnProperty.call(commands, command)) {
    commands[command].command(message, args);
  }
});
