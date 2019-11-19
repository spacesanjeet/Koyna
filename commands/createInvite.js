module.exports = {
	name: 'cinvite',
	description: 'Create a temporary server invite.',
  guildOnly: true,
	aliases: ['ci'],
  usage: ['command.', 'Maximum number of uses: 3, Appx time: 17 minutes'],
	cooldown: 2,
	async execute(client, message, args) {
    let invite = await message.channel.createInvite({
    maxAge: 10 * 60 * 1000000, //maximum time for the invite, in milliseconds
    maxUses: 3 //maximum times it can be used
    });
    message.reply(invite ? `Here's your invite: ${invite} : "There has been an error during the creation of the invite."`);
	},
};
