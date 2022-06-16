import { REST } from "@discordjs/rest";
import { Client } from "discord.js"
import { Routes } from "discord.js/node_modules/discord-api-types/v10";
import { CommandList } from "../commands/_CommandList";
import { getTempChannels } from "../modules/voiceRolesData";

export const onReady = (client:Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application)
    {
      return;
    }
    const rest = new REST({ version: "9" }).setToken(process.env.TOKEN as string);
    
    const commandData = CommandList.map(command => command.data.toJSON());

    // Adds slash commands only on a specific Discord server (GUILD_ID in .env). Good for development, as the command is immediately available.
    await rest.put(Routes.applicationGuildCommands(client.user.id, process.env.GUILD_ID as string), { body: commandData });

    // Adds the commands on all servers on which the bot is. Disadvantage takes about an hour
    await rest.put(Routes.applicationCommands(client.user.id), { body: commandData })

    //const tempChannelData = await getTempChannels();
    /*const options = {
      childCategory: "979393332658728992",
      childAutoDeleteIfEmpty: true,
      childAutoDeleteIfOwnerLeaves: true,
      childMaxUsers: 3,
      childBitrate: 64000,
      childFormat: (str: any, count: any) => `Example #${count} | ${str}`,
      childTextFormat: (str: any, count: any) => `example-${count}_${str}`,
      childVoiceFormatRegex: /^Example #\d+ \|/,
      childTextFormatRegex: /^example-\d+_/i
    }*/
    //tempChannelManager.registerChannel("979392544288960572", options);
    //tempChannelData.forEach((tempChannel) => {
    //  tempChannelManager.registerChannel(tempChannel.voiceChannelId, tempChannel.options);
    //})    

    console.log(`Discord Bot ${client.user.username}#${client.user.discriminator} is online`);    
  });  
}