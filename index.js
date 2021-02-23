const Discord = require('discord.js')
const bot = new Discord.Client();
const Levels = require('discord-xp')
const { MessageEmbed } = require('discord.js')
const canvacord = require('canvacord');
const levels = require('discord-xp/models/levels');
const canvas = require('canvas');
Levels.setURL("mongodb+srv://BotProject:samiul2030@cluster0.e4crj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

bot.login('')

bot.on("ready", bot => {
    console.log('Bot is Online!')
})

bot.on("message", async message => {
    if (!message.guild) return;
    if (message.author.bot) return;

    const prefix = 'i';
    const rankchnl = message.guild.channels.cache.get('752113413127274626')

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const randomXp = Math.floor(Math.random() * 9) + 1; //Random amont of XP until the number you want + 1
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        
        rankchnl.send(`You leveled up to ${user.level}! Keep flexing in ${message.guild}`);
    }
    if(command === "rank") {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        const neededXp = Levels.xpFor(parseInt(user.level) +1);

        if(!user) return message.reply("`YOU DON'T HAVE XP. TRY TO SEND SOME MESSAGES.`");

        const card = new canvacord.Rank()
        .setAvatar(message.author.displayAvatarURL({dynamic: false, format: 'png'}))
        .setCurrentXP(user.xp)
        .setRequiredXP(neededXp)
        .setStatus(message.author.presence.status)
        .setProgressBar('RANDOM', "COLOR")
        .setLevel(user.level)
        
        .setUsername(message.author.username)
        .setDiscriminator('0001')
        .setBackground("IMAGE",'https://media.discordapp.net/attachments/730799143122894941/806106019566583818/PMRO.png?width=832&height=499')
       card.build()
        .then(data =>{
            const attachment = new Discord.MessageAttachment(data, 'rank.png')
            rankchnl.send(attachment);
            message.delete();
        })
    }
})
