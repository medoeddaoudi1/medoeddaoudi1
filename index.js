////////////////////////////////////////////////////////////////////////////////
const Discord = require('discord.js')
const myths = new Discord.Client()
const { token, prefix } = require("./config.json")
const fs = require("fs");
////////////////////////////////////////////////////////////////////////////////
console.log(`=============================`)
console.log('         Welcome To programing ..')
console.log('         Wait please ..       ')
console.log('         Im login in ..       ')
    ////////////////////////////////////////////////////////////////////////////////
myths.on('ready', () => {
    console.log(`=============================`)
    console.log(`== BY MedoEddaoudi ==`)
    console.log(`=============================`)
    console.log(`Its me ${myths.user.tag}, Hi`)
    console.log(`=============================`)
    console.log(`Project v12 application`)
    console.log(`Project Name : ( ${myths.user.username} )`)
    console.log(`=============================`)
    console.log(`Gulids im in ( ${myths.guilds.cache.size} )`)
    console.log(`=============================`)
    console.log(`Users with me ( ${myths.users.cache.size} )`)
    console.log(`=============================`)
    console.log(`Channels i see ( ${myths.channels.cache.size} )`)
    console.log(`=============================`)
    console.log(`My prefix is ( ${prefix} )`)
    console.log(`=============================`)
});
/////////////////////////////////////////////////////////////////////////////////
myths.on("ready", () => {
    /*const activities_list = [
        "",
        `${prefix }help |  ${myths.guilds.cache.size} Guilds`,
        `${prefix }help |  49726 Users`,
    ];
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        myths.user.setActivity(activities_list[index], {
            type: 'STREAMING',
            url: "https://www.twitch.tv/medo_eddaoudi"
        });
    }, 3000);*/
    myths.user.setActivity(`${prefix}help | ${myths.guilds.cache.size} Guilds`)
});
/////////////////////////////////////////////////////////////////////////////////
myths.login(token);
/////////////////////////////////////////////////////////////////////////////////
myths.on('message', async(msg) => {
    if (msg.author.bot) return;
    if (!msg.guild) return;

    const { prefix } = require("./config.json");
    if (!msg.content.toLowerCase().startsWith(prefix)) return;

    const args = msg.content.split(' ');
    const cmd = args.shift().slice(prefix.length).toLowerCase();

    try {
        const file = require(`./commands/${cmd}.js`);
        file.run(myths, msg, args);
    } catch (err) {

        console.warn(err);
    }
});
////////////////////////////////////////////////////////////////////////////////
//              Events         ---   Myths-Bot-Scripts   ---   
////////////////////////////////////////////////////////////////////////////////
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      myths.on(eventName, event.bind(null, myths));
    });
});

