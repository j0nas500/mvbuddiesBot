import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { getCamperData } from "../modules/getCamperData";
import { updateCamperData } from "../modules/updateCamperData";
import { Command } from "./_Command";

export const oneHundred: Command = {
  data: new SlashCommandBuilder()
    .setName("100")
    .setDescription("Check in for the 100 Days of Code challenge.")
    .addStringOption(option => option
      .setName("message")
      .setDescription("The message to go in your 100 Days of Code update.")
      .setRequired(true)
    ),

  run: async (client, interaction) => {
    const { user } = interaction;
    const text = interaction.options.getString("message", true);

    const targetCamper = await getCamperData(user.id);
    const updatedCamper = await updateCamperData(targetCamper);

    const oneHundredEmbed = new MessageEmbed()
      .setTitle("100 Days of Code")
      .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
      .setDescription(text)
      .addField("Round", updatedCamper.round.toString(), true)
      .addField("Day", updatedCamper.day.toString(), true)
      .setFooter({
        text: `Day completed: ${new Date(updatedCamper.timestamp).toLocaleDateString()}`
      });

    await interaction.followUp({ embeds: [oneHundredEmbed] });
  },
};