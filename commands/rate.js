// Rate a waifu

const random = require('seedrandom');

const command = (message, args) => {
  const waifu = args.join(' '); // Join arguments into single string
  const rating = Math.round(random(waifu)() * 10); // Rng rating seeded w/ waifu's name

  message.channel.send(`:thinking:  |  I'd give ${waifu} a ${rating}/10`);
};

const help = {
  description: 'Rates a waifu/husbando on a scale of 0 to 10',
  usage: 'rate [waifu]',
  examples: ['rate Kouya', 'rate Shin'],
};

module.exports = {
  command,
  help,
};
