const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const builds = require('../builds.json');
const {
    WIKIURL,
    replaceSpace,
    elementColorMap, 
    characterToImage,
    weaponToEmoji,
    characterTitle, 
    getCharacterName, 
} = require('../dictionaries');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('build')
        .setDescription('Produces a given character\'s build')
        .addStringOption((option) => 
            option
                .setName('character')
                .setDescription('Character build to produce')
                .setRequired(true)
        ),
    async execute(interaction) {
        const input_character = await interaction.options.getString('character').toLowerCase();
        const character = getCharacterName(input_character);
        const build = builds[character]
        if (!build) {
            return await interaction.reply('Build for this character is not avaliable.')
        }

        const embed = new EmbedBuilder()
        .setColor(elementColorMap[build.element])
        .setTitle(character.charAt(0).toUpperCase() + character.slice(1))
        .setURL(`${WIKIURL}${character}`)
        .setDescription(build.team + ' - ' + build.role)
        .setThumbnail(characterToImage[character])
        .addFields(
            {
                name: 'Talent Priority',
                value: build.talent_priority,
                inline: true
            },
        );

        if (build.best_con) {
            embed.addFields({ name: 'Best Constellation', value: build.best_con, inline: true,});
        }
        if (characterTitle[character]) {
            embed.setTitle(characterTitle[character]);
            embed.setURL(`${WIKIURL}${replaceSpace(characterTitle[character])}`)
        }
        if (build.f2p_option) {
            embed.addFields({ 
                name: `Weapons ${weaponToEmoji[build.weapon_type]}`, 
                value: `BIS: [${build.BIS}](${WIKIURL}${replaceSpace(build.BIS)})\n F2P: [${build.f2p_option}](${WIKIURL}${replaceSpace(build.f2p_option)})`
            });
        } else {
            embed.addFields({ 
                name: `Weapons ${weaponToEmoji[build.weapon_type]}`, 
                value: `BIS: [${build.BIS}](${WIKIURL}${replaceSpace(build.BIS)})`
            });
        }
        if (build.artifact_set.includes('+')) {
            let artifact_set = build.artifact_set.split(' + ');
            artifact_set = artifact_set.map(s => {
                if (s.includes('[')) {
                    let list = s.replace('[', '').replace(']', '').split(' / ');
                    list = list.map(l => {
                        if (isNaN(parseInt(l[0]))) {
                            return `[${l}](${WIKIURL}${replaceSpace(l)})`;
                        }
                        return l;
                    });
                    return `[${list.join(' / ')}]`;
                }
                if (isNaN(parseInt(s[0]))) {
                    return `[${s}](${WIKIURL}${replaceSpace(s)})`;
                }
                return s;
            });
            embed.addFields({
                name: 'Artifacts <:artifacts:1072389881898217502>',
                value: artifact_set.join(' + '),
            });
        } else {
            embed.addFields({
                name: 'Artifacts <:artifacts:1072389881898217502>',
                value: `[${build.artifact_set}](${WIKIURL}${replaceSpace(build.artifact_set)})`
            });
        }
        
        embed.addFields(
            {
                name: 'Sands <:sands:1072348747419369512>',
                value: build.sands,
                inline: true
            },
            {
                name: 'Goblet <:goblet:1072348752842600619>',
                value: build.goblet,
                inline: true
            },
            {
                name: 'Circlet <:circlet:1072348730117849088>',
                value: build.circlet,
                inline: true
            },
            {
                name: 'Stat priorites / soft goals',
                value: build.stats.map((element, index) => (index + 1) + '. ' + element).join('\n')
            }
        );
        if (build.notes) embed.addFields({ name: 'Notes', value: build.notes.join('\n') });
        embed.setFooter({ text: 'Data updated as of patch 3.4', iconURL: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/nahida-kusanali/sticker_5.png?f838d0700f593d0ab47c80a7e2d46d7a&d=200x200'});
        await interaction.reply({embeds: [embed]});
    }
}