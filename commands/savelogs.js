// Save logs from current channel

const path = require('path');
const fs = require('fs-extra');

const command = (message, args) => {
  let logs;
  const loglength = args[0];
  const logfile = path.join('logs/', args[1]); // Resolve path for log file
  if (loglength === undefined) {
    message.edit(':x: Error! Please provide number of messages to be saved.');
  }
  if (logfile === undefined) {
    message.edit(':x: Error! Please provide a file to save logs to.');
  }

  message.edit(`:information_source: Attempting to save ${loglength} messages...`)
    .then(() => message.channel.fetchMessages({ limit: loglength })) // Fetch messages
    .then((messages) => {
      logs = messages;
      message.edit(`:information_source: Found ${logs.size} messages, writing to file ${logfile}`); // Notify user messages have been found
    })
    .then(() => fs.outputFile(logfile, logs.array().map(msg => `${msg.createdAt.toTimeString().split(' ')[0]}: ${msg.author.username}: ${msg.content}`).reverse().join('\n'))) // Write messages to file
    .then(() => message.edit(`:white_check_mark: Successfully saved ${logs.size} messages!`)) // Notify user messages have been saved
    .catch((err) => {
      message.edit(':x: Error! Please check bot logs.');
      console.error(err);
    });
};

const help = {
  description: 'Save a  number of messages (max ???) from current channel to a text file',
  usage: 'savelogs [number of messages] [filename]',
  examples: ['savelogs 30 that_one_convo.txt', 'savelogs 40 that_other_convo'],
};

module.exports = {
  command,
  help,
};
