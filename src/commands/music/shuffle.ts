import { SlashCommandBuilder } from "@discordjs/builders";
import { isValidMusicCommand } from "../../utils/isValidMusicCommand";
import { Command } from "../_Command";

export const shuffle: Command = {
  data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("Shuffle the queue"),

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
        await queue.shuffle();
        await interaction.followUp({ content: '✅ | Queue has been shuffled!' }).then(msg => {
          setTimeout(() => interaction.channel?.messages.delete(msg.id).catch(err => console.error("Error with deleting msg " + err)) , 60000);
        });
      }
    }
  },
};