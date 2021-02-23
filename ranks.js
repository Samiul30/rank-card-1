const Discord = require('discord.js')
const bot = new Discord.Client();
const Levels = require('discord-xp')
const { MessageEmbed } = require('discord.js')
const canvacord = require('canvacord');
Levels.setURL("mongodb+srv://BotProject:samiul2030@cluster0.e4crj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

bot.login('Nzg4Mjc3NzEwOTU5MDE4MDE0.X9hK0w.ZtASHYP_sljcF7LKxFMWYBs9ptA')

bot.on("ready", bot => {
    console.log('Bot is Online!')
})

bot.on("message", async message => {
    if (!message.guild) return;
    if (message.author.bot) return;

    const prefix = 'p';
    const rankchnl = message.guild.channels.cache.get('695959831462412351')

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

   
    
    //Rank
    if(command === "rank") {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        //let rem1 = new MessageEmbed()
        //.setColor("RANDOM")
        //.setTitle("`Rank Info`")
       // .setImage(message.guild.iconURL)
        //.setDescription(`${message.guild}'s information`)
        //.addField("Owner", `The owner of this server is ${message.guild.owner}`)
       // .addField("Member Count", `This server has ${message.guild.memberCount} members`)
      //  .addField("Channels Count", `This server has ${message.guild.channels.cache.size} channels`)
      //  .addField("Roles Count", `This server has ${message.guild.roles.cache.size} roles`)
       // .addField("Emoji Count", `This server has ${message.guild.emojis.cache.size} emojis`)
       // .addField("Online Count", `Total ${message.guild.presences.cache.size} members are online`)
        //.addField(`You are currently level **${user.level}**! in ${message.guild}`)
        //.addField(`Your XP is **${user.xp}**! in ${message.guild}`)
        //.setFooter(
          //  `Requested by ${message.author.tag}`,
            //message.author.displayAvatarURL({ dynamic: true })
         // )
         
       rankchnl.send(rem1)
    }
    
    //Leaderboard
    if(command === "leaderboard" || command === "lb") {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5);
        if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

        const leaderboard = Levels.computeLeaderboard(bot, rawLeaderboard); 

        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`);

       rankchanl.send(`${lb.join("\n\n")}}`)
       
    }
})