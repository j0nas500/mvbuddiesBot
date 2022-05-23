import { REST } from "@discordjs/rest";
import { Client } from "discord.js"
import { Routes } from "discord.js/node_modules/discord-api-types/v10";
import { CommandList } from "../commands/_CommandList";

export const onReady = (client:Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application)
    {
      return;
    }
    const rest = new REST({ version: "9" }).setToken(process.env.TOKEN as string);
    
    const commandData = CommandList.map(command => command.data.toJSON());

    // Adds slash commands only on a specific Discord server (GUILD_ID in .env). Good for development, as the command is immediately available.
    // await rest.put(Routes.applicationGuildCommands(client.user.id, process.env.GUILD_ID as string), { body: commandData });

    // Adds the commands on all servers on which the bot is. Disadvantage takes about an hour
    await rest.put(Routes.applicationCommands(client.user.id), { body: commandData })
    
    console.log(`Discord Bot ${client.user.username}#${client.user.discriminator} is online`);

    
    
  });  
}