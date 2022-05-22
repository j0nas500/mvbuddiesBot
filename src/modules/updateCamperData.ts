import { CamperInt } from "../database/models/CamperModel";

export const updateCamperData = async (Camper: CamperInt) => {
  Camper.day++;
  if (Camper.day > 100) {
    Camper.day = 1;
    Camper.round++;
  }
  Camper.timestamp = Date.now();
  await Camper.save();
  return Camper;
}