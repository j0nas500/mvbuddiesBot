import { Document, Schema, model} from "mongoose";

// @property discordId hold the ID of an user
// @property round hold the round...
//...
export interface TempChannelsDocument extends Document {
  voiceChannelId: string;
  //options: ParentChannelOptions;
}

export const tempChannelsSchema = new Schema({
  voiceChannelId: String,
  options: [],
})

export const TempChannelsModel = model<TempChannelsDocument>("tempchannel", tempChannelsSchema);