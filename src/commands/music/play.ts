const Discord = require("discord.js");
import { EmbedBuilder, SlashCommandBuilder } from "@discordjs/builders";
import { createAudioPlayer, createAudioResource, DiscordGatewayAdapterCreator, getVoiceConnection, joinVoiceChannel, NoSubscriberBehavior, StreamType } from "@discordjs/voice";
import { Player, QueryType, Queue } from "discord-player";
import { Interaction, MessageEmbed, VoiceChannel } from "discord.js";
import { getSearchEngine } from "../../utils/getSearchEngine";
//import { getSearchEngine } from "../music/getSearchEngine";

import { Command } from "../_Command";

export const play: Command = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays a song")
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


      

      //const queryType = await getSearchEngine(query);

      //console.log(queryType);
      const result = await player.search(query, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO
      });

      if (!result || !result.tracks.length) {
        await interaction.followUp("No results");
      } else {
        const song = result.tracks[0];
        const playlist = result.playlist;
        await result.playlist ? queue.addTracks(result.tracks) : queue.addTrack(song);

        if (!queue.playing) queue.play();

        const embed = new MessageEmbed()
          .setAuthor({ name: result.playlist ? "Adding Playlist to the Queue" : "Adding Song to the Queue", iconURL: interaction.guild.iconURL() as string })
          .setDescription(result.playlist ? `${result.tracks.length} songs from [${playlist?.title}](${playlist?.url}) have been added to the Quee` : `**[${song.title}](${song.url})** has been added to the Queue`)
          .setThumbnail(result.playlist ? playlist?.thumbnail as string : song.thumbnail as string)
          .setFooter(result.playlist ? { text: `Author: ${playlist?.author.name}`} : { text: `Duration: ${song.duration}`});
          
        await interaction.followUp({ embeds: [embed] }).then(msg => {
          setTimeout(() => interaction.channel?.messages.delete(msg.id) , 60000);
        });
      }      
    }
  },
};