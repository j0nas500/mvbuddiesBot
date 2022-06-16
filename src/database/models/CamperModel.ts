import { Document, Schema, model} from "mongoose";

// @property discordId hold the ID of an user
// @property round hold the round...
//...
export interface CamperInt extends Document {
  discordId: string;
  round: number;
  day: number;
  timestamp: number;
}

export const Camper = new Schema({
  discordId: String,
  round: Number,
  day: Number,
  timestamp: Number
})

export const CamperModel = model<CamperInt>("camper", Camper);