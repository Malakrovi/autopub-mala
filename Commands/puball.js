const Discord = require("discord.js");
const config = require("../config.json")
var selected = require('../temp.js');
var fs = require("fs");
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('./Temps/denied.json')
const db = low(adapter)
 
// Set some defaults
db.defaults({ staff: []}).write()

module.exports.run = async (client, message, args) => {
    db.read();
    if(message.author.id != config.owner && !db.get("staff").find({id : message.author.id}).value()) return;
    if(selected.seletedEmbed == null) return message.channel.send("Please configure your embed !")
    let mbr = await client.users.cache.filter(member => !member.bot).size;
    let scd = mbr*0.12;
    scd= scd * 1000;

    let estim = msToTime(scd)
    

   await message.channel.send(new Discord.MessageEmbed()
        .setTitle("**:white_check_mark: Advertising on all servers started**")
        .setDescription(`Estimated time of ${estim} \n There are ${mbr} members who are not bots and who can potentially receive it`)
        .setColor(config.embedColor))

    let memberarray = client.users.cache.array();
    let membercount = memberarray.length;
    let botcount = 0;
    let successcount = 0;
    let errorcount = 0;

    for (var i = 0; i < membercount; i++) {
        let member = memberarray[i];

        if (member.bot) {
            botcount++;
            continue
        }


        
        await sleep(120);
        if(i == (membercount-1)) {

        } else {
     
        }
        try {
         member.send(selected.seletedEmbed).catch(err => {errorcount++})
            successcount++;
        } catch (error) {
            errorcount++
        }
    }

    message.channel.send(new Discord.MessageEmbed()
    .setTitle("**:white_check_mark: Advertising finish**")
    .setDescription(`Sent to **${successcount}** members`)
    .setFooter(`Not sent: ${errorcount + botcount}`))
}

module.exports.help = {
    name: "puball"
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function msToTime(duration) {
    var milliseconds = parseInt((duration%1000))
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);
    
    hours = hours;
    minutes = minutes;
    seconds = seconds;
    
    return hours + " heure(s) " + minutes + " minute(s) et " + seconds + " seconde(s)"
    }