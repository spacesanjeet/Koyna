const { RichEmbed } = require('discord.js');
const math = require('math-expression-evaluator');

module.exports = {
    name: 'math',
    description: 'Do calculations',
    guildOnly: true,
    usage: '[calculation]',
    example: '8^3',
    cooldown: 3,
    execute(client, message, args) {
        if (!args[0]) return message.channel.send("Enter a valid calculation!")
        let result;
        try {
            result = math.eval(args.slice(0).join(" "))
        } catch (e) {
            result = 'Error: "Invalid Input"';
        }

        let embed = new RichEmbed()
        .setColor("RANDOM")
        .setTitle("Maths Calculation")
        .addField('Input', `\`\`\`js\n${args.slice(0).join(" ")}\`\`\``)
        .addField('Output', `\`\`\`js\n${result}\`\`\``)
        .setTimestamp(new Date());
        message.channel.send(embed)
    },
};
