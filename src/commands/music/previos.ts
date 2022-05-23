import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../_Command";

export const previos: Command = {
  data: new SlashCommandBuilder()
    .setName("previos")
    .setDescription("Plays the previous track"),

  run: async (client, interaction, player) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guild?.id as string);
    if (!queue || !queue.playing) {
      await interaction.followUp("❌ | No music is being played!").then(msg => {
        setTimeout(() => interaction.channel?.messages.delete(msg.id) , 60000);
      });
    }
    else {
      await queue.back();
      await interaction.followUp({ content: '✅ | Playing the previous track!' }).then(msg => {
        setTimeout(() => interaction.channel?.messages.delete(msg.id) , 60000);
      });
    }
  },
};