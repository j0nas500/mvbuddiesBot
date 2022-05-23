import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { Command } from "../_Command";

export const np: Command = {
  data: new SlashCommandBuilder()
    .setName("np")
    .setDescription("Shows the current playing Track"),

  run: async (client, interaction, player) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guild?.id as string);
    if (!queue || !queue.playing) {
      await interaction.followUp("❌ | No music is being played!").then(msg => {
        setTimeout(() => interaction.channel?.messages.delete(msg.id).catch(err => console.error("Error with deleting msg " + err)) , 60000);
      });
    }
    else {
      const song = queue.current;
      const progress = queue.createProgressBar();
      const perc = queue.getPlayerTimestamp();
      const embed = new MessageEmbed()
        .setAuthor({ name: "Now Playing", iconURL: interaction.guild?.iconURL() as string})
        .setDescription(`🎶 | **[${song.title}](${song.url})**! (${perc.progress}%)\n\n` + progress.replace(/ 0:00/g, ' ◉ LIVE'));

      await interaction.followUp({ embeds: [embed] }).then(msg => {
        setTimeout(() => interaction.channel?.messages.delete(msg.id).catch(err => console.error("Error with deleting msg " + err)) , 300000);
      });
    }
  },
};