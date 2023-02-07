const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const builds = require('../builds.json');

const elementColorMap = {
    anemo: '#74c2a8',
    cryo: '#9fd6e3',
    dendro: '#a5c83b',
    electro: '#af8ec1',
    geo: '#fab632',
    hydro: '#4cc2f1',
    pryo: '#ef7938',
}

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
    traveler_dendro: 'https://i.imgur.com/numA69g.png',
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
    yunjin: 'https://i.imgur.com/mdBSIwC.png',
    zhongli: 'https://i.imgur.com/Xk6Hn8d.png',
};

const weaponToEmoji = {
    bow: '<:bow:1072315518335324181>',
    catalyst: '<:catalyst:1072315522080845855>',
    claymore: '<:claymore:1072315527550214224>',
    polearm: '<:polearm:1072315524131860551>',
    sword: '<:sword:1072315318287990865>',
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
        try {
            const input_character = await interaction.options.getString('character');
            const build = builds[input_character]

            if (!build) {
                throw new Error('Build for this character is not avaliable.')
            }

            const exampleEmbed = new EmbedBuilder()
			.setColor(elementColorMap[build.element])
			.setTitle(input_character.charAt(0).toUpperCase() + input_character.slice(1))
			.setURL(`https://genshin-impact.fandom.com/wiki/${input_character}`)
			.setDescription(build.team + ' - ' + build.role)
			.setThumbnail(characterToImage[input_character])
            .addFields(
				{ 
                    name: `Weapons ${weaponToEmoji[build.weapon_type]}`, 
                    value: `BIS: ${build.BIS}\n F2P: ${build.f2p_option}`, 
                },
                {
                    name: 'Talent Priority',
                    value: build.talent_priority,
                },
                {
                    name: 'Artifacts',
                    value: build.artifact_set
                },
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
            )
		    await interaction.reply({embeds: [exampleEmbed]});
        } catch (error) {
            await interaction.reply(error);
        }
    }

}