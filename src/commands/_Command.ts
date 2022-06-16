import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "@discordjs/builders";
import { Player } from "discord-player";
import { Client, CommandInteraction } from "discord.js";

// Interface define the structure of an object
// @property data hold the command data to send to Discord
// @property run hold the callback function and command logic
export interface Command {
  data: | Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand"> | SlashCommandSubcommandsOnlyBuilder;
  run: (client: Client, interaction: CommandInteraction, player: Player) => Promise<void>;
}