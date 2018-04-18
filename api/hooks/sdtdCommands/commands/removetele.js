let SdtdCommand = require('../command.js');
const sevenDays = require('machinepack-7daystodiewebapi');

class removeTele extends SdtdCommand {
    constructor(serverId) {
        super(serverId, {
            name: 'removetele',
        });
        this.serverId = serverId;
    }

    async run(chatMessage, player, server, args) {
        let playerTeleports = await PlayerTeleport.find({ player: player.id });

        if (!server.config.enabledPlayerTeleports) {
            return chatMessage.reply(`This command is disabled! Ask your server admin to enable this.`)
        }

        if (args.length == 0) {
            return chatMessage.reply(`Please specify what teleport location you want to remove.`)
        }

        if (args.length > 1) {
            return chatMessage.reply(`Too many arguments! Just provide a name please.`)
        }

        let teleportFound = false
        playerTeleports.forEach(teleport => {
            if (teleport.name == args[0]) {
                teleportFound = teleport
            }
        })

        if (!teleportFound) {
            return chatMessage.reply(`Error: Did not find a teleport with that name!`)
        }

        await PlayerTeleport.destroy(teleportFound);
        return chatMessage.reply(`Your teleport ${teleportFound.name} was deleted!`)

    }
}

module.exports = removeTele;