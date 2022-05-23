import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { Command } from "../_Command";

export const history: Command = {
  data: new SlashCommandBuilder()
    .setName("history")
    .setDescription("Show the history queue")
    .addIntegerOption((option) =>
      option
        .setName("page")
        .setDescription("Page number of the history queue")
        .setMinValue(1)
        .setRequired(false)
    ),

  run: async (client, interaction, player) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guild?.id as string);
    if (!queue || !queue.playing) {
      await interaction.followUp("❌ | No music is being played!").then(msg => {
        setTimeout(() => interaction.channel?.messages.delete(msg.id).catch(err => console.error("Error with deleting msg " + err)) , 60000);
      });
    }
    else {
      const totalPages = Math.ceil(queue.previousTracks.length / 10) || 1;
      const page = (interaction.options.getInteger("page") || 1) - 1;

      if (page + 1 > totalPages) {
        await interaction.followUp(`❌ | Invalid Page. There are only a total of ${totalPages} pages of songs`).then(msg => {
          setTimeout(() => interaction.channel?.messages.delete(msg.id).catch(err => console.error("Error with deleting msg " + err)) , 60000);
        });
      }
      else {
        const queueString = queue.previousTracks.slice(page * 10, page * 10 + 10).reverse().map((song, i) => {
          return `**${page * 10 + i + 1}.** \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}>`;
        }).join("\n");
        
        const currentTrack = queue.current;
        const embed = new MessageEmbed()
          .setAuthor({ name: "History Queue", iconURL: interaction.guild?.iconURL() as string})
          .setDescription(`**Currently Playing**\n` + 
          (currentTrack ? `\`[${currentTrack.duration}]\` ${currentTrack.title} -- <@${currentTrack.requestedBy.id}>` : "None") +
          `\n\n**History*\n${queueString}`
          )
          .setFooter({ text: `Page ${page + 1} of ${totalPages}` })
          .setThumbnail(currentTrack.thumbnail);

          await interaction.followUp({ embeds: [embed] }).then(msg => {
            setTimeout(() => interaction.channel?.messages.delete(msg.id).catch(err => console.error("Error with deleting msg " + err)) , 60000);
          });
      }
    }
  },
};