/*import { channel } from "diagnostics_channel";
import { Client, VoiceChannel, VoiceState } from "discord.js";

export const onVoiceStateUpdate = (client: Client): void => {
  client.on("voiceStateUpdate", async (oldState: VoiceState, newState: VoiceState) => {
    const user = newState.member?.user;
    
     if (newState.channelId == undefined)
     {
       console.log(`${user?.username}#${user?.discriminator} left channel ${oldState.channel?.name}`);
     }
     else if (oldState.channelId == undefined)
     {
       console.log(`${user?.username}#${user?.discriminator} joined channel ${newState.channel?.name}`);
     }
     else {
      console.log(`${user?.username}#${user?.discriminator} moved from ${oldState.channel?.name} to ${newState.channel?.name}`);
     }
  })
}*/

