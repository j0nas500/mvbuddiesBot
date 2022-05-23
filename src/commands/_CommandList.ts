import { play } from "./music/play";
import { Command } from "./_Command";
import { ping } from "./ping";
import { volume } from "./music/volume";
import { loop } from "./music/loop";
import { skip } from "./music/skip";
import { queue } from "./music/queue";
import { pause } from "./music/pause";
import { np } from "./music/np";
import { previos } from "./music/previos";
import { history } from "./music/history";
import { jump } from "./music/jump";
import { playnext } from "./music/playnext";
import { remove } from "./music/remove";
import { seek } from "./music/seek";
import { shuffle } from "./music/shuffle";
import { stop } from "./music/stop";
import { skipTo } from "./music/skipTo";
import { filter } from "./music/filter";

// Creates a Command List that stores Command objects
export const CommandList: Command[] = [
  play, playnext, np, volume, loop, skip, skipTo, previos, seek, pause, stop,
  queue, history, jump, remove, filter, ping, shuffle];