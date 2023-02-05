const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

// inside a command, event listener, etc.

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed')
		.setDescription('Sends an embed!'),
	async execute(interaction) {
		const exampleEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('bruh')
			.setURL('https://discord.js.org/')
			.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
			.setDescription('Some description here')
			.setThumbnail('https://i.imgur.com/es5Gzu5.png')
			.addFields(
				{ name: 'Regular field title', value: 'Some value here' },
				{ name: '\u200B', value: '\u200B' },
				{ name: 'Inline field title', value: 'Some value here', inline: true },
				{ name: 'Inline field title', value: 'Some value here', inline: true },
		)
			.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
			.setImage('https://i.imgur.com/AfFp7pu.png')
			.setTimestamp()
			.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
		await interaction.reply({embeds: [exampleEmbed]});
	},
};
