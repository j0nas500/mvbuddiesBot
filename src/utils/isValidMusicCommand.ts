import { Client, CommandInteraction} from "discord.js";

export const isValidMusicCommand = async (client: Client, interaction: CommandInteraction): Promise<boolean> => {
  const userVoiceChannel = interaction.guild?.voiceStates.cache.get(interaction.member?.user.id as string)?.channel;
  const botVoiceChannel = interaction.guild?.voiceStates.cache.get(client.user?.id as string)?.channel;
  const permissions = userVoiceChannel?.permissionsFor(interaction.client.user?.id as string);
  if (!permissions?.has("CONNECT") || !permissions?.has("SPEAK"))
    {
      await interaction.followUp("I don't have the permission to join and speak in your voice channel!").then(msg => {
        setTimeout(() => interaction.channel?.messages.delete(msg.id).catch(err => console.error("Error with deleting msg " + err)) , 60000);
      });
      return false;
    } 
  else if (!userVoiceChannel)
  {
    await interaction.followUp({ content: "Please join a voice channel first"}).then(msg => {
      setTimeout(() => interaction.channel?.messages.delete(msg.id).catch(err => console.error("Error with deleting msg " + err)) , 60000);
    });
    return false;
  }
  else if (botVoiceChannel && userVoiceChannel != botVoiceChannel)
  {
    await interaction.followUp({ content: `I am already on a voice channel (${botVoiceChannel.name})`}).then(msg => {
      setTimeout(() => interaction.channel?.messages.delete(msg.id).catch(err => console.error("Error with deleting msg " + err)) , 60000);
    });
    return false;      
  }
  return true;
};