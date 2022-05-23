import { Client } from "discord.js";
import { IntentOptions } from "./config/IntentOptions";
//import { connectDatabase } from "./database/connectDatabase";
import { onInteractionCreate } from "./listeners/onInteractionCreate";
import { onReady } from "./listeners/onReady";
import { validateEnv } from "./utils/validateEnv";
import { Player } from "discord-player";
import { onMusic } from "./listeners/onMusic";
import { onVoiceStateUpdate } from "./listeners/onVoiceStateUpdate";

(async () => {
  // Check if all DotEnv Variables are set
  if (!validateEnv()) return;

  // Client Bot (our discord Bot) receive Guild events
  const BOT = new Client({intents: IntentOptions});

  // instantiate the player
  const player = new Player(BOT);

  // trigger Events for Music
  onMusic(player);

  // triggered if the BOT is connected to the gateway and is ready to process events
  onReady(BOT);

  // triggers if any Interaction (Slash Command, Buttons and Select Menus) is used
  // currently Slash Commands only
  onInteractionCreate(BOT, player);

  onVoiceStateUpdate(BOT, player);

  // get database connection
  //await connectDatabase();

  // login as the Bot
  await BOT.login(process.env.TOKEN);
})();