import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { getCamperData } from "../../modules/getCamperData";
import { updateCamperData } from "../../modules/updateCamperData";
import { Command } from "../_Command";

export const seek: Command = {
  data: new SlashCommandBuilder()
    .setName("seek")
    .setDescription("Seek to the given time")
    .addIntegerOption((option) => 
      option
        .setName("time")
        .setDescription("The time to seek to (in seconds)")
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
      const time = interaction.options.getInteger("time", true) * 1000;
      if (time >= queue.current.durationMS ) {
        await interaction.followUp(`❌ | Value too high (${time/1000}sec). The song only goes for ${queue.current.durationMS/1000}sec`).then(msg => {
          setTimeout(() => interaction.channel?.messages.delete(msg.id) , 60000);
        });        
      }
      else {
        queue.seek(time);
        await interaction.followUp({ content: `✅ | Seeked to ${time / 1000} seconds` }).then(msg => {
          setTimeout(() => interaction.channel?.messages.delete(msg.id) , 60000);
        });
      }       
    }
  },
};