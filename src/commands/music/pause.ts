import { SlashCommandBuilder } from "@discordjs/builders";
import { isValidMusicCommand } from "../../utils/isValidMusicCommand";
import { Command } from "../_Command";

export const pause: Command = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pause/Resume the current song"),

  run: async (client, interaction, player) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guild?.id as string);
    if (!queue || !queue.playing) {
      await interaction.followUp("❌ | No music is being played!").then(msg => {
        setTimeout(() => interaction.channel?.messages.delete(msg.id).catch(err => console.error("Error with deleting msg " + err)) , 60000);
      });
    }
    else {
      if (await isValidMusicCommand(client, interaction)) {
        if (queue.setPaused() === true) {
          const paused = queue.setPaused(false);
          await interaction.followUp({ content: paused ? "❌ | Something went wrong!" : "▶ | Resumed!" }).then(msg => {
            setTimeout(() => interaction.channel?.messages.delete(msg.id).catch(err => console.error("Error with deleting msg " + err)) , 60000);
          });
        } 
        else {
          const paused = queue.setPaused(true);
          await interaction.followUp({ content: paused ? "⏸ | Paused!" : "❌ | Something went wrong!" }).then(msg => {
            setTimeout(() => interaction.channel?.messages.delete(msg.id).catch(err => console.error("Error with deleting msg " + err)) , 60000);
          });
        }
      }
    }
  },
};