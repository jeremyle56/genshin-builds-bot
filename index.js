import dotenv from 'dotenv'
dotenv.config()

import { 
    Client, 
    GatewayIntentBits,
} from 'discord.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
});

const prefix = '!';

client.once('ready', (c) => {
    console.log(`Ready! ${c.user.tag} is online`)
})

client.on("messageCreate", async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        message.channel.send('pong!');
    } else if (command === 'bruh') {
        message.reply('bruh bruh');
    }
});

client.login(process.env.DISCORD_TOKEN);
