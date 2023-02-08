const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const builds = require('../builds.json');

const WIKIURL = 'https://genshin-impact.fandom.com/wiki/'
const replaceSpace = (string) => {return string.replaceAll(' ', '_')};

const elementColorMap = {
    anemo: '#74c2a8',
    cryo: '#9fd6e3',
    dendro: '#a5c83b',
    electro: '#af8ec1',
    geo: '#fab632',
    hydro: '#4cc2f1',
    pyro: '#ef7938',
};

const characterToImage = {
    albedo: 'https://i.imgur.com/zghLPyG.png',
    alhaitham: 'https://i.imgur.com/IITgdy7.png',
    aloy: 'https://i.imgur.com/YnKCj9x.png',
    amber: 'https://i.imgur.com/Op1s35g.png',
    itto: 'https://i.imgur.com/DR6y0Ng.png',
    barbara: 'https://i.imgur.com/spgp1On.png',
    bediou: 'https://i.imgur.com/AmpTWvm.png',
    bennett: 'https://i.imgur.com/yete2Yo.png',
    candace: 'https://i.imgur.com/ZrL5hOP.png',
    chongyun: 'https://i.imgur.com/E2o48U9.png',
    collei: 'https://i.imgur.com/Et9G0F3.png',
    cyno: 'https://i.imgur.com/LmH1kPt.png',
    diluc: 'https://i.imgur.com/XoiICwu.png',
    diona: 'https://i.imgur.com/2iNWWfN.png',
    dori: 'https://i.imgur.com/IlnuO3q.png',
    eula: 'https://i.imgur.com/e7QpEco.png',
    faruzan: 'https://i.imgur.com/m7GATWB.png',
    fischl: 'https://i.imgur.com/0RE52q5.png',
    ganyu: 'https://i.imgur.com/lcHauXt.png',
    gorou: 'https://i.imgur.com/tJWLCFW.png',
    hutao: 'https://i.imgur.com/Uh99h3i.png',
    jean: 'https://i.imgur.com/BApJUEO.png',
    kazuha: 'https://i.imgur.com/dxMyJm5.png',
    kaeya: 'https://i.imgur.com/IacfgQv.png',
    ayaka: 'https://i.imgur.com/OjrSQMi.png',
    ayato: 'https://i.imgur.com/3FHYpl0.png',
    keqing: 'https://i.imgur.com/tC3pmBI.png',
    klee: 'https://i.imgur.com/CTgDuel.png',
    sara: 'https://i.imgur.com/C05X8WA.png',
    kuki: 'https://i.imgur.com/ybe9Ptd.png',
    layla: 'https://i.imgur.com/AFlsZki.png',
    lisa: 'https://i.imgur.com/VPX5zVt.png',
    mona: 'https://i.imgur.com/yYRz2r2.png',
    nahida: 'https://i.imgur.com/Vt20rRf.png',
    nilou: 'https://i.imgur.com/0WB9cHo.png',
    ningguang: 'https://i.imgur.com/omxYHcP.png',
    noelle: 'https://i.imgur.com/tb4w8yX.png',
    qiqi: 'https://i.imgur.com/9lZekSq.png',
    raiden: 'https://i.imgur.com/mktPWig.png',
    razor: 'https://i.imgur.com/D6WAvBv.png',
    rosaria: 'https://i.imgur.com/lOz57Th.png',
    kokomi: 'https://i.imgur.com/NiOF1wM.png',
    sayu: 'https://i.imgur.com/LRl2WbZ.png',
    shenhe: 'https://i.imgur.com/Skhn7PT.png',
    heizou: 'https://i.imgur.com/8CJe6uj.png',
    sucrose: 'https://i.imgur.com/5QZVjxS.png',
    tartaglia: 'https://i.imgur.com/JoTFLV1.png',
    thoma: 'https://i.imgur.com/Pyy6d84.png',
    tighnari: 'https://i.imgur.com/oXtTU8Y.png',
    traveler_anemo: 'https://i.imgur.com/lu1ePKH.png',
    traveler_dendro: 'https://i.imgur.com/IPOVqEv.png',
    traveler_electro: 'https://i.imgur.com/zlADdQO.png',
    traveler_geo: 'https://i.imgur.com/Hv589O3.png',
    venti: 'https://i.imgur.com/OtshgSy.png',
    wanderer: 'https://i.imgur.com/beQHBsX.png',
    xiangling: 'https://i.imgur.com/vntER8n.png',
    xiao: 'https://i.imgur.com/zNUHtqD.png',
    xingqui: 'https://i.imgur.com/uaeDWTJ.png',
    xinyan: 'https://i.imgur.com/qnQbE46.png',
    yae: 'https://i.imgur.com/NWCN9Pt.png',
    yanfei: 'https://i.imgur.com/NiCgNuE.png',
    yaoyao: 'https://i.imgur.com/0ssHhW6.png',
    yelan: 'https://i.imgur.com/9LTrAGu.png',
    yoimiya: 'https://i.imgur.com/LgSAGeM.png',
    yunjin: 'https://i.imgur.com/Ygxtw1O.png',
    zhongli: 'https://i.imgur.com/Xk6Hn8d.png',
};

const weaponToEmoji = {
    bow: '<:bow:1072315518335324181>',
    catalyst: '<:catalyst:1072315522080845855>',
    claymore: '<:claymore:1072315527550214224>',
    polearm: '<:polearm:1072315524131860551>',
    sword: '<:sword:1072315318287990865>',
};

const characterTitle = {
    itto: 'Arataki Itto',
    hutao: 'Hu Tao',
    kazuha: 'Kaedehara Kazuha',
    ayaka: 'Kamisato Ayaka',
    ayato: 'Kamisato Ayato',
    sara: 'Kujou Sara',
    kuki: 'Kuki Shinobu',
    raiden: 'Raiden Shogun',
    kokomi: 'Sangonomiya Kokomi',
    heiouz: 'Shikanoin Heiouz',
    traveler_anemo: 'Traveler',
    traveler_dendro: 'Traveler',
    traveler_electro: 'Traveler',
    traveler_geo: 'Traveler',
    yae: 'Yae Miko',
    yunjin: 'Yun Jin',
};

const characterAliases = {
    'arataki itto': 'itto',
    'arataki': 'itto',
    'hu tao': 'hutao',
    'hu-tao': 'hutao',
    'kaedehara kazuha': 'kazuha',
    'kaedehara': 'kazuha',
    'kamisato ayaka': 'ayaka',
    'kamisato ayato': 'ayato',
    'kujou sara': 'sara',
    'kujou': 'sara',
    'kuki shinobu': 'kuki',
    'shinobu': 'kuki',
    'ning': 'ningguang',
    'raiden shogun': 'raiden',
    'shogun': 'raiden',
    'sangonomiya kokomi': 'kokomi',
    'sangonomiya': 'kokomi',
    'shikanoin heizou': 'heizou',
    'shikanoin': 'heizou',
    'childe': 'tartaglia',
    'traveler anemo': 'traveler_anemo',
    'anemo traveler': 'traveler_anemo',
    'amc': 'traveler_anemo',
    'traveler dendro': 'traveler_dendro',
    'dendro traveler': 'traveler_dendro',
    'dmc': 'traveler_dendro',
    'traveler electro': 'traveler_electro',
    'electro traveler': 'traveler_electro',
    'emc': 'traveler_electro',
    'traveler geo': 'traveler_geo',
    'geo traveler': 'traveler_geo',
    'gmc': 'traveler_geo',
    'yae miko': 'yae',
    'miko': 'yae',
    'yun jin': 'yunjin',
};

const getCharacterName = (character) => {
    if (characterAliases[character]) {
        return characterAliases[character]
    }
    return character;
}

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
        console.log(characterToImage[character])
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