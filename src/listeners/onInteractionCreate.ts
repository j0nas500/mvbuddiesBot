import { Player } from "discord-player";
import { Client, CommandInteraction, Interaction } from "discord.js";
import { CommandList } from "../commands/_CommandList";

export const onInteractionCreate = (client: Client, player: Player): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand())
    {
      await handleSlashCommand(client, interaction, player);
    }    
  })
}

const handleSlashCommand = async (client: Client, interaction: CommandInteraction, player: Player): Promise<void> => {
  const slashCommand = CommandList.find(c => c.data.name == interaction.commandName);
  if (!slashCommand)
  {
    console.warn(`slash command ${interaction.commandName} not found: ${slashCommand}`)
    interaction.followUp({content: "An error has occured"});
    return;
  }
  slashCommand.run(client, interaction, player);  
}