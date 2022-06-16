import { Client } from "discord.js";

export const onVoiceStateUpdate = (client:Client): void => {
  client.on("presenceUpdate", async (oldPresence, newPresence) => {
    const superAutoPetsRole = oldPresence!.guild!.roles.cache.get("978271996645371946");
    console.log(newPresence!.member!.user.username)
    console.log(newPresence.activities.every)
    console.log(oldPresence!.member!.user.username)
    console.log(oldPresence!.activities.every)

    if (newPresence.activities.find(activity => {
      activity.name === "Super Auto Pets"
    })) {
      newPresence.member!.roles.add(superAutoPetsRole!);
    }
  });
}