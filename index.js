// Import modules
const Discord = require('discord.js');
const fs = require('fs-extra');
const path = require('path');
const random = require('seedrandom');

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

  switch (command) {
    // Simple ping/pong command
    case 'ping': {
      message.edit(`:information_source: Pong!  |  ${Date.now() - message.createdAt} ms`);
      break;
    }

    // Save logs from current channel
    // Args: # of messages, log filename
    case 'savelogs': {
      let logs;
      const loglength = args[0];
      const logfile = path.join('logs/', args[1]);
      if (loglength === undefined) {
        message.edit(':x: Error! Please provide number of messages to be saved.');
        break;
      }
      if (logfile === undefined) {
        message.edit(':x: Error! Please provide a file to save logs to.');
        break;
      }

      message.edit(`:information_source: Attempting to save ${loglength} messages...`)
        .then(() => message.channel.fetchMessages({ limit: loglength }))
        .then((messages) => {
          logs = messages;
          message.edit(`:information_source: Found ${logs.size} messages, writing to file ${logfile}`);
        })
        .then(() => fs.outputFile(logfile, logs.array().map(msg => `${msg.createdAt.toTimeString().split(' ')[0]}: ${msg.author.username}: ${msg.content}`).reverse().join('\n')))
        .then(() => message.edit(`:white_check_mark: Successfully saved ${logs.size} messages!`))
        .catch((err) => {
          message.edit(':x: Error! Please check bot logs.');
          console.error(err);
        });
      break;
    }

    // Command to rate waifus
    case 'rate': {
      const waifu = args.join(' '); // Join arguments into single string
      const rating = Math.round(random(waifu)() * 10); // Rng rating seeded w/ waifu's name

      message.channel.send(`:thinking:  |  I'd give ${waifu} a ${rating}/10`);
      break;
    }
    // Make a warning if command not recognized
    default: {
      console.warn(`${command} is not a valid command!`);
    }
  }
});

// Log bot in
client.login(config.token);
