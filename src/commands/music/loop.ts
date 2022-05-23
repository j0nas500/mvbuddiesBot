import { SlashCommandBuilder } from "@discordjs/builders";
import { QueueRepeatMode } from "discord-player";
import { Command } from "../_Command";

export const loop: Command = {
  data: new SlashCommandBuilder()
    .setName("loop")
    .setDescription("Sets loop mode")
    .addIntegerOption((option) => 
      option
        .setName("mode")
        .setDescription("Loop type")
        .setRequired(true)
        .addChoices(...[
          {
            name: 'Off',
            value: QueueRepeatMode.OFF
          },
          {
            name: 'Track',
            value: QueueRepeatMode.TRACK
          },
          {
            name: 'Queue',
            value: QueueRepeatMode.QUEUE
          },
          {
            name: 'Autoplay',
            value: QueueRepeatMode.AUTOPLAY
          }
        ]
      )
    ),

  run: async (client, interaction, player) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guild?.id as string);
    if (!queue || !queue.playing) {
      await interaction.followUp("❌ | No music is being played!").then(msg => {
        setTimeout(() => interaction.channel?.messages.delete(msg.id) , 60000);
      });
    }
    else {
      const loopMode = interaction.options.get("mode", true).value;
      if (queue.setRepeatMode(loopMode as QueueRepeatMode)) {
        const mode = loopMode === QueueRepeatMode.TRACK ? "🔂" : loopMode === QueueRepeatMode.QUEUE ? "🔁" : "▶";
        await interaction.followUp(`${mode} | Updated loop mode!`).then(msg => {
          setTimeout(() => interaction.channel?.messages.delete(msg.id) , 60000);
        });
      }
      else {
        await interaction.followUp("❌ | Could not update loop mode!").then(msg => {
          setTimeout(() => interaction.channel?.messages.delete(msg.id) , 60000);
        });
      }
    }
  },
};