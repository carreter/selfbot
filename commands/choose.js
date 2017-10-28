// Command to choose between options

const command = (message, args) => {
  const choice = args.join(' ').split('|')[Math.round(Math.random() * args.length)].trim();

  message.channel.send(`:thinking:  |  I choose **${choice}**!`);
};

const help = {
  description: 'Choose between a set of options',
  usage: 'choose [option 1] | [option 2] | [option ...]',
  examples: ['choose heads | tails', 'choose dogs | cats | birds | snakes'],
};

module.exports = {
  command,
  help,
};
