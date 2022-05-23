import { SlashCommandBuilder } from "@discordjs/builders";
import { isValidMusicCommand } from "../../utils/isValidMusicCommand";
import { Command } from "../_Command";

export const volume: Command = {
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Sets music volume")
    .addIntegerOption((option) => 
      option
        .setName("value")
        .setDescription("The volume value to set")
        .setMaxValue(100)
        .setMinValue(0)
        .setRequired(false)),

  run: async (client, interaction, player) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guild?.id as string);
    if (!queue || !queue.playing) {
      await interaction.followUp("❌ | No music is being played!").then(msg => {
        setTimeout(() => interaction.channel?.messages.delete(msg.id).catch(err => console.error("Error with deleting msg " + err)) , 60000);
      });
    }
    else {
      const volume = interaction.options.get("value", false);
      if (!volume) {
          await interaction.followUp(`🎧 | Current volume is **${queue.volume}**%!`).then(msg => {
            setTimeout(() => interaction.channel?.messages.delete(msg.id).catch(err => console.error("Error with deleting msg " + err)) , 60000);
          });
      }
      else {
        if (await isValidMusicCommand(client, interaction)) {
          queue.setVolume(volume.value as number);
          await interaction.followUp(`✅ | Volume set to **${volume.value}%**!`).then(msg => {
            setTimeout(() => interaction.channel?.messages.delete(msg.id).catch(err => console.error("Error with deleting msg " + err)) , 60000);
          });
        }
      }
    }
  },
};