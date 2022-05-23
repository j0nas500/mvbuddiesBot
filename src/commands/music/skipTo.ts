import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { getCamperData } from "../../modules/getCamperData";
import { updateCamperData } from "../../modules/updateCamperData";
import { Command } from "../_Command";

export const skipTo: Command = {
  data: new SlashCommandBuilder()
    .setName("skipto")
    .setDescription("Jump to a specific track and remove other tracks on the way")
    .addIntegerOption((option) => 
      option
        .setName("tracks")
        .setDescription("The number of tracks to skip")
        .setMinValue(1)
        .setRequired(true)),

  run: async (client, interaction, player) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guild?.id as string);
    if (!queue || !queue.playing) {
      await interaction.followUp("❌ | No music is being played!").then(msg => {
        setTimeout(() => interaction.channel?.messages.delete(msg.id) , 60000);
      });
    }
    else {
      const trackIndex = interaction.options.getInteger("tracks", true) - 1;
      if (trackIndex >= queue.tracks.length ) {
        await interaction.followUp(`❌ | No track at Position ${trackIndex + 1} found!`).then(msg => {
          setTimeout(() => interaction.channel?.messages.delete(msg.id) , 60000);
        });        
      }
      else {
        const trackName = queue.tracks[trackIndex].title;
        queue.skipTo(trackIndex);
        await interaction.followUp({ content: `⏭ | **${trackName}** has jumped the queue and removed other tracks on the way!` }).then(msg => {
          setTimeout(() => interaction.channel?.messages.delete(msg.id) , 60000);
        });
      }       
    }
  },
};