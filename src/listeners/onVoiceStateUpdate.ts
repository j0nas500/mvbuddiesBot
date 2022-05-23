import { REST } from "@discordjs/rest";
import { Player } from "discord-player";
import { Client } from "discord.js"
import { Routes } from "discord.js/node_modules/discord-api-types/v10";
import { CommandList } from "../commands/_CommandList";

export const onVoiceStateUpdate = (client:Client, player: Player): void => {
  client.on("voiceStateUpdate", async (oldState, newState) => {
    
    if (newState.channelId === null && oldState.member?.id == client.user?.id) {
      // if queue is not really destroyed (channeld deleted, bot disconnected) try to destroy it
      try {
        player.getQueue(oldState.channel?.guild.id as string).destroy();
      } catch (error) {
        // catch error: "error" also if the bot has before succesfully destroyed the queue
        console.error("Error with destroying queue at disconnect " + error);
      }
            
    }
    /*else if (oldState.channelId === null) {
      console.log("Member joins: " + newState);
    }
    else {
      console.log("Member moved " +oldState");*/
  })
}