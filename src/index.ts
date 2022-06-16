import { Client, GuildMember } from "discord.js";
import { IntentOptions } from "./config/IntentOptions";
//import { connectDatabase } from "./database/connectDatabase";
import { onInteractionCreate } from "./listeners/onInteractionCreate";
import { onReady } from "./listeners/onReady";
import { validateEnv } from "./utils/validateEnv";
import { Player } from "discord-player";
import { onMusic } from "./listeners/onMusic";
import { onVoiceStateUpdate } from "./listeners/onVoiceStateUpdate";
import { connectDatabase } from "./database/connectDatabase";

(async () => {
  // Check if all DotEnv Variables are set
  if (!validateEnv()) return;

  //get database connection
  //await connectDatabase();
  //const createData = await createTempChannels("978294383138967603", options)

  // Client Bot (our discord Bot) receive Guild events
  const BOT = new Client({intents: IntentOptions});

  // instantiate the player
  const player = new Player(BOT);

  // triggered if the BOT is connected to the gateway and is ready to process events
  onReady(BOT);

  // triggers if any Interaction (Slash Command, Buttons and Select Menus) is used
  // currently Slash Commands only
  onInteractionCreate(BOT, player);

  onVoiceStateUpdate(BOT, player);

  // trigger Events for Music
  onMusic(player);

  


  /*const data = await getTempChannels();
  data.forEach(element => {
    console.log("element: " + element.voiceChannelId + element.options)
  });
  console.log("data : " + data);*/

  // login as the Bot
  await BOT.login(process.env.TOKEN);
})();