import { SlashCommandBuilder } from "@discordjs/builders";
import { isValidMusicCommand } from "../../utils/isValidMusicCommand";
import { Command } from "../_Command";

export const remove: Command = {
  data: new SlashCommandBuilder()
    .setName("remove")
    .setDescription("Remove a specific track")
    .addIntegerOption((option) => 
      option
        .setName("track")
        .setDescription("The number of track to remove")
        .setMinValue(1)
        .setRequired(true)),

  run: async (client, interaction, player) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guild?.id as string);
    if (!queue || !queue.playing) {
      await interaction.followUp("❌ | No music is being played!").then(msg => {
        setTimeout(() => interaction.channel?.messages.delete(msg.id).catch(err => console.error("Error with deleting msg " + err)) , 60000);
      });
    }
    else {
      const trackIndex = interaction.options.getInteger("track", true) - 1;
      if (trackIndex >= queue.tracks.length ) {
        await interaction.followUp(`❌ | No track at Position ${trackIndex + 1} found!`).then(msg => {
          setTimeout(() => interaction.channel?.messages.delete(msg.id).catch(err => console.error("Error with deleting msg " + err)) , 60000);
        });        
      }
      else {
        if (await isValidMusicCommand(client, interaction)) {
          const trackName = queue.tracks[trackIndex].title;
          queue.remove(trackIndex);
          await interaction.followUp({ content: `⏭ | **${trackName}** has jumped the queue!` }).then(msg => {
            setTimeout(() => interaction.channel?.messages.delete(msg.id).catch(err => console.error("Error with deleting msg " + err)) , 60000);
          });
        }
      }       
    }
  }
}
