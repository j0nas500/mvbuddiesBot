import { Player } from "discord-player";
import { MessageEmbed, TextChannel, } from "discord.js"


export const onMusic = (player:Player): void => {
  player.on("error", (queue, error) => {
    console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
  });

  player.on("connectionError", (queue, error) => {
      console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
  });

  player.on("trackStart", (queue, track) => {

    if (queue.metadata instanceof TextChannel) {
      const song = queue.current;
      const progress = queue.createProgressBar();
      const perc = queue.getPlayerTimestamp();

      const embed = new MessageEmbed()
        .setAuthor({ name: "Now Playing", iconURL: queue.metadata.guild.iconURL() as string})
        .setDescription(`🎶 | **[${song.title}](${song.url})**! (${perc.progress}%)\n\n` + progress.replace(/ 0:00/g, ' ◉ LIVE'));

      queue.metadata.send({ embeds: [embed] }).then(msg => {           
        setTimeout(() => {
          if (queue.metadata instanceof TextChannel) {
            queue.metadata.messages.delete(msg.id).catch(err => console.error("Error with deleting msg " + err));
          }
        }, song.durationMS);
      });
    }
  });    

  /*
  player.on("trackAdd", (queue, track) => {
    if (queue.metadata instanceof TextChannel) {
      queue.metadata.send(`🎶 | Track **${track.title}** queued!`);
    }      
  });*/

  player.on("botDisconnect", (queue) => {
    if (queue.metadata instanceof TextChannel)
      queue.metadata.send("❌ | I was manually disconnected from the voice channel, clearing queue!").then(msg => {
        setTimeout(() => {
          if (queue.metadata instanceof TextChannel)
          queue.metadata.messages.delete(msg.id).catch(err => console.error("Error with deleting msg " + err));
        } , 600000)
      });
  });

  player.on("channelEmpty", (queue) => {
    if (queue.metadata instanceof TextChannel)
      queue.metadata.send("❌ | Nobody is in the voice channel, leaving...").then(msg => {
        setTimeout(() => {
          if (queue.metadata instanceof TextChannel)
          queue.metadata.messages.delete(msg.id).catch(err => console.error("Error with deleting msg " + err));
        } , 600000)
      });;
  });

  player.on("queueEnd", (queue) => {
    if (queue.metadata instanceof TextChannel)
      queue.metadata.send("✅ | Queue finished!")
      .then(msg => {
        setTimeout(() => {
          if (queue.metadata instanceof TextChannel)
          queue.metadata.messages.delete(msg.id).catch(err => console.error("Error with deleting msg " + err));
        } , 600000)
      });;
  });
}