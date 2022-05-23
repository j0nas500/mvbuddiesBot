import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../_Command";

export const stop: Command = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stop the player"),

  run: async (client, interaction, player) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guild?.id as string);
    if (!queue || !queue.playing) {
      await interaction.followUp("❌ | No music is being played!").then(msg => {
        setTimeout(() => interaction.channel?.messages.delete(msg.id) , 60000);
      });
    }
    else {
      queue.destroy();
      await interaction.followUp({ content: '🛑 | Stopped the player!' }).then(msg => {
        setTimeout(() => interaction.channel?.messages.delete(msg.id) , 60000);
      });
    }
  },
};