/*
  A ping pong bot, whenever you send "ping", it replies "pong".
*/

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

// The token of your bot - https://discordapp.com/developers/applications/me
const token = '***REMOVED***';

// Prefix to denote bot command
const prefix = 's!';

// Event
client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', (message) => {
  // Make sure I'm sending message starting w/ prefix
  if (message.author !== client.user || !message.content.startsWith(prefix)) return;

  let command = message.content.slice(prefix.length).toLowerCase();

  // Simple ping/pong command
  if (command === 'ping') {
    message.edit(`:information_source: Pong! | ${Date.now() - message.createdAt} ms`);
  }
});

// Log bot in
client.login(token);
