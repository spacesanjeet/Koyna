const { RichEmbed } = require('discord.js');

module.exports = {
    name: 'emotes',
    description: 'View all server emojis',
    guildOnly: true,
    usage: ' ',
    cooldown: 3,
    execute(client, message, args) {
        const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
        let embed = new RichEmbed()
        .setColor("RANDOM")
        .setDescription(emojiList)
        message.channel.send(embed)
        if (!emojiList) return message.channel.send("No custom emojis in the server!");
    },
};
