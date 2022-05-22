const Discord = require("discord.js");
import { Player, QueryType } from "discord-player";
import { ChatInputApplicationCommandData, CommandInteraction, Interaction, VoiceChannel } from "discord.js";
import  { Client as SpotifyClient } from "spotify-api.js"
import { Client } from "discord.js";

//export function getSearchEngineE (argument: string): QueryType {


export const getSearchEngine = async (argument: string) : Promise<QueryType> => {
  const isYTUrlstart :boolean = argument.startsWith("https://www.youtu") || argument.startsWith("http://www.youtu") || argument.startsWith("https://youtu") || argument.startsWith("http://youtu");;
  const isYTUrlcontain :boolean = argument.includes("list=");
  const isSpUrlstart :boolean = argument.startsWith("https://open.spotify.com") || argument.startsWith("http://open.spotify.com");
  const isSpUrlcontainPlaylist :boolean = argument.includes("playlist");
  const isSpUrlcontainAlbum :boolean = argument.includes("album");
  if ((isYTUrlstart) && (isYTUrlcontain)) {
    console.log("QueryType.YOUTUBE_PLAYLIST");
    return QueryType.YOUTUBE_PLAYLIST;
  }
  if (isYTUrlstart) {
    console.log("QueryType.YOUTUBE_PLAYLIST");
    return QueryType.YOUTUBE_VIDEO;
  }    
  if (isSpUrlstart && isSpUrlcontainPlaylist){
    console.log("SPOTIFY_PLAYLIST");
    return QueryType.SPOTIFY_PLAYLIST;
  }
  if (isSpUrlstart && isSpUrlcontainAlbum){
    console.log("QueryType.SPOTIFY_ALBUM");
    return QueryType.SPOTIFY_ALBUM;
  }
  if (isSpUrlstart){
    console.log("QueryType.SPOTIFY_SONG");
    return QueryType.SPOTIFY_SONG;
  }else{
    console.log("QueryType.AUTO");
    return QueryType.AUTO;
  }
}