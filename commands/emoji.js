const { RichEmbed, Util } = require('discord.js');
const snek = require('snekfetch');
const twemoji = require('twemoji');
const fs = require('fs');

module.exports = {
    name: 'emoji',
    description: 'Enlarge the emoji',
    guildOnly: true,
    aliases: ['emote'],
    usage: '[emoji]',
    example: ':yum:',
    cooldown: 3,
    async execute(client, message, args) {
      if(!args.join(" ")) return message.channel.send("Provide a emoji!");
        try {
            const emote = Util.parseEmoji(args[0]);
            if (emote.animated === true) {
              const URL = `https://cdn.discordapp.com/emojis/${emote.id}.gif?v=1`;
              const { body: buffer } = await snek.get(`${URL}`);
              const toSend = fs.writeFileSync('emote.gif', buffer);
              const name = args[0].match(/\w+/);
              const id = args[0].match(/\d{18}/);
              message.channel.send(`\`Id:\` **${id}**\n\`Name:\` **${name}**`);
              message.channel.send({ file: 'emote.gif' });
            } else if (emote.id === null) {
              const twemote = twemoji.parse(args[0]);
              const regex = /src="(.+)"/g;
              const regTwemote = regex.exec(twemote)[1];
              const { body: buffer } = await snek.get(`${regTwemote}`);
              const toSend = fs.writeFileSync('emote.png', buffer);
              await message.channel.send({ file: 'emote.png' });
            } else {
              const URL = `https://cdn.discordapp.com/emojis/${emote.id}.png`;
              const { body: buffer } = await snek.get(`${URL}`);
              const toSend = fs.writeFileSync('emote.png', buffer);
              const name = args[0].match(/\w+/);
              const id = args[0].match(/\d{18}/);
              message.channel.send(`\`Id:\` **${id}**\n\`Name:\` **${name}**`)
              message.channel.send({ file: 'emote.png' });
            }
          } catch (error) {
            if (error.message === 'TypeError: Cannot read property \'1\' of null') {
              message.reply('Give me an actual emote.');
            }
          }
    },
};
