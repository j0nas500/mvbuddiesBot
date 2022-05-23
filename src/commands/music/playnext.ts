const Discord = require("discord.js");
import { SlashCommandBuilder } from "@discordjs/builders";
import { QueryType } from "discord-player";
import { MessageEmbed } from "discord.js";
//import { getSearchEngine } from "../music/getSearchEngine";

import { Command } from "../_Command";

export const playnext: Command = {
  data: new SlashCommandBuilder()
    .setName("playnext")
    .setDescription("Add a song to the top of the queue")
    .addStringOption(option => 
      option
        .setName("query")
        .setDescription("search term, YouTube and Spotify URL")
        .setRequired(true)
    ),

  run: async (client, interaction, player) => {    
    
    await interaction.deferReply({ ephemeral: false });
    const userVoiceChannel = interaction.guild?.voiceStates.cache.get(interaction.member?.user.id as string)?.channel;
    const botVoiceChannel = interaction.guild?.voiceStates.cache.get(client.user?.id as string)?.channel;
    const permissions = userVoiceChannel?.permissionsFor(interaction.client.user?.id as string);

    if (!permissions?.has("CONNECT") || !permissions?.has("SPEAK"))
    {
      await interaction.followUp("I don't have the permission to join and speak in your voice channel!").then(msg => {
        setTimeout(() => interaction.channel?.messages.delete(msg.id) , 60000);
      });
    } 
    else if (!userVoiceChannel)
    {
      await interaction.followUp({ content: "Please join a voice channel first"}).then(msg => {
        setTimeout(() => interaction.channel?.messages.delete(msg.id) , 60000);
      });
    }
    else if (botVoiceChannel && userVoiceChannel != botVoiceChannel)
    {
      await interaction.followUp({ content: `I am already on a voice channel (${botVoiceChannel.name})`}).then(msg => {
        setTimeout(() => interaction.channel?.messages.delete(msg.id) , 60000);
      });      
    }
    // (!botVoiceChannel)
    // userVoiceChannel == botVoiceChannel
    else {
      const query = interaction.options.getString("query", true);
      const queue = !player.getQueue(interaction.guild.id) ? 
      await player.createQueue(interaction.guild, {
        ytdlOptions: {
          quality: 'highestaudio',
          filter: 'audioonly',
          highWaterMark: 1 << 60,
          dlChunkSize: 0
        },
        leaveOnEmptyCooldown: 60000,
        metadata: interaction.channel
      }) : 
      player.getQueue(interaction.guild.id);

      try {
        if (!queue.connection) await queue.connect(userVoiceChannel);
      } catch {
        void player.deleteQueue(interaction.guild.id);
        return void interaction.followUp({ content: "Could not join your voice channel!" }).then(msg => {
          setTimeout(() => interaction.channel?.messages.delete(msg.id) , 60000);
        });
      }

      const result = await player.search(query, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO
      });

      if (!result || !result.tracks.length) {
        await interaction.followUp("No results").then(msg => {
          setTimeout(() => interaction.channel?.messages.delete(msg.id) , 60000);
        });
      } else {
        const song = result.tracks[0];
        queue.insert(song);

        if (!queue.playing) queue.play();

        const embed = new MessageEmbed()
          .setAuthor({ name: "Adding Song to the top of the Queue", iconURL: interaction.guild.iconURL() as string })
          .setDescription(`**[${song.title}](${song.url})** has been added to the top of the Queue`)
          .setThumbnail(song.thumbnail as string)
          .setFooter( { text: `Duration: ${song.duration}`});
          
        await interaction.followUp({ embeds: [embed] }).then(msg => {
          setTimeout(() => interaction.channel?.messages.delete(msg.id) , 60000);
        });
      }      
    }
  },
};