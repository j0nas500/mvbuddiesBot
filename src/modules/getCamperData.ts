import { CamperModel } from "../database/models/CamperModel"

export const getCamperData = async (id: string) => {
    const camperData = 
      (await CamperModel.findOne({ discordId: id})) ||
      (await CamperModel.create({
        discordId: id,
        round: 1,
        day: 0,
        date: Date.now(),
      }));
    return camperData;
}