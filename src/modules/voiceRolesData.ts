import { TempChannelsModel } from "../database/models/tempChannelsModel";

export const getTempChannels = async () => {
    const tempChannels = await TempChannelsModel.find({});
    //const voiceRoles = await VoiceRoleModel.find({}, {voiceChannelId: 1, rolesId: 1 , _id: 0});
    return tempChannels;
}

export const getTempChannel = async (voiceChannelId: string) => {
    const tempChannel = await TempChannelsModel.findOne({ voiceChannelId: voiceChannelId });
    return tempChannel;
}

//export const updateTempChannel = async (channelId: string, rolesId: string) => {
//    const voiceRole = await TempChannelsModel.findOneAndUpdate({ voiceChannelId: channelId }, { rolesId: rolesId });    
//}

//export const createTempChannels = async (channelId: string, options: ParentChannelOptions) => {
 //   await TempChannelsModel.create({ voiceChannelId: channelId, options: options });    
//}