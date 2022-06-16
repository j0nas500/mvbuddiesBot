import { SlashCommandBuilder } from "@discordjs/builders";
import { QueueFilters, QueueRepeatMode } from "discord-player";
import { isValidMusicCommand } from "../../utils/isValidMusicCommand";
import { Command } from "../_Command";

export const filter: Command = {
  data: new SlashCommandBuilder()
    .setName("filter")
    .setDescription("Toggle the filter")
    .addStringOption((option) => 
      option
        .setName("filter")
        .setDescription("Toggle filter")
        .setRequired(true)
        .addChoices(...[
          {
            name: 'bassboost',
            value: 'bassboost'
          },
          {
            name: '8D',
            value: '8D'
          },
          {
            name: 'vaporwave',
            value: 'vaporwave'
          },
          {
            name: 'nightcore',
            value: 'nightcore'
          },
          {
            name: 'phaser',
            value: 'phaser'
          },
          {
            name: 'tremolo',
            value: 'tremolo'
          },
          {
            name: 'vibrato',
            value: 'vibrato'
          },
          {
            name: 'reverse',
            value: 'reverse'
          },
          {
            name: 'treble',
            value: 'treble'
          },
          {
            name: 'earrape',
            value: 'earrape'
          }
        ]
      )
    ),

  run: async (client, interaction, player) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guild?.id as string);
    if (!queue || !queue.playing) {
      await interaction.followUp("❌ | No music is being played!").then(msg => {
        setTimeout(() => interaction.channel?.messages.delete(msg.id).catch(err => console.error("Error with deleting msg " + err)) , 60000);
      });
    }
    else {
      const filter = interaction.options.getString("filter", true);
      
      if (filter === null){
        const enabledFilter = queue.getFiltersEnabled().join(', ');
        await interaction.followUp(`Enabled filters: ${enabledFilter}`).then(msg => {
          setTimeout(() => {
            interaction.channel?.messages.delete(msg.id).catch(err => console.error("Error with deleting msg " + err));
          }, 60000)
        });
      }
      else {
        if (await isValidMusicCommand(client, interaction)) {
          switch (filter) {
            case 'bassboost':
              queue.setFilters({
                bassboost: !queue.getFiltersEnabled().includes('bassboost'),
                normalizer2: !queue.getFiltersEnabled().includes('bassboost')
              })
              break;
            case '8D':
              queue.setFilters({
                '8D': !queue.getFiltersEnabled().includes('8D'),
                normalizer2: !queue.getFiltersEnabled().includes('8D')
              })
              break;
            case 'vaporwave':
              queue.setFilters({
                vaporwave: !queue.getFiltersEnabled().includes('vaporwave'),
                normalizer2: !queue.getFiltersEnabled().includes('vaporwave')
              })
              break;
            case 'nightcore':
              queue.setFilters({
                nightcore: !queue.getFiltersEnabled().includes('nightcore'),
                normalizer2: !queue.getFiltersEnabled().includes('nightcore')
              })
              break;
  
            case 'phaser':
              queue.setFilters({
                phaser: !queue.getFiltersEnabled().includes('phaser'),
                normalizer2: !queue.getFiltersEnabled().includes('phaser')
              })
              break;
  
            case 'tremolo':
              queue.setFilters({
                tremolo: !queue.getFiltersEnabled().includes('tremolo'),
                normalizer2: !queue.getFiltersEnabled().includes('tremolo')
              })
              break;
  
            case 'nightcore':
              queue.setFilters({
                nightcore: !queue.getFiltersEnabled().includes('nightcore'),
                normalizer2: !queue.getFiltersEnabled().includes('nightcore')
              })
              break;
  
            case 'vibrato':
              queue.setFilters({
                vibrato: !queue.getFiltersEnabled().includes('vibrato'),
                normalizer2: !queue.getFiltersEnabled().includes('vibrato')
              })
              break;
  
            case 'reverse':
              queue.setFilters({
                reverse: !queue.getFiltersEnabled().includes('reverse'),
                normalizer2: !queue.getFiltersEnabled().includes('reverse')
              })
              break;
  
            case 'treble':
              queue.setFilters({
                vibrato: !queue.getFiltersEnabled().includes('treble'),
                normalizer2: !queue.getFiltersEnabled().includes('treble')
              })
              break;
  
            case 'earrape':
              queue.setFilters({
                earrape: !queue.getFiltersEnabled().includes('earrape'),
                normalizer2: !queue.getFiltersEnabled().includes('earrape')
              })
              break;
          
            default:
              break;
          }
          setTimeout(async () => {
            await interaction.followUp({ content: `🎵 | ${filter} ${queue.getFiltersEnabled().includes(filter as keyof QueueFilters) ? 'Enabled' : 'Disabled'}!` }).then(msg => {
              setTimeout(() => {
                interaction.channel?.messages.delete(msg.id).catch(err => console.error("Error with deleting msg " + err));
              }, 60000)
            });
            }, queue.options.bufferingTimeout);

        }
        
        };        
      }
    }
  }