import { SlashCommandBuilder } from "@discordjs/builders";
import { isValidMusicCommand } from "../../utils/isValidMusicCommand";
import { Command } from "../_Command";

export const skip: Command = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip to the current song"),

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
        const currentTrack = queue.current;
        const success = queue.skip();
        await interaction.followUp({ content: success ? `✅ | Skipped **${currentTrack}**!` : "❌ | Something went wrong!" }).then(msg => {
          setTimeout(() => interaction.channel?.messages.delete(msg.id).catch(err => console.error("Error with deleting msg " + err)) , 60000);
        });
      }
    }
  },
};