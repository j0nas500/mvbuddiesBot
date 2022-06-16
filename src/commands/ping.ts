import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { Command } from "./_Command";

export const ping: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Shows bot latency"),

  run: async (client, interaction, player) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guild?.id as string);
    const embed = new MessageEmbed()
      .setTitle("⏱️ | Latency")
      .addField("Bot Latency", `${Math.round(client.ws.ping)}ms`)
      .addField("Voice Latency", !queue ? "N/A" : `${queue.connection.voiceConnection.ping.udp ?? "N/A"}ms`)
      .setColor(0xFFFFFF);

    await interaction.followUp({ embeds: [embed] });
  },
};