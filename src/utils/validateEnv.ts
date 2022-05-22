// Checks if any Environment Variable is not set
export const validateEnv = async () => {
  if (!process.env.TOKEN)
  {
    console.warn("Missing Discord Bot Token in DotEnv");
    return false;
  }
  if (!process.env.GUILD_ID)
  {
    console.warn("Missing Guild ID in DotEnv");
    return false;
  }
  if (!process.env.MONGO_URI)
  {
    console.warn("Missing MongoDB connection in DotEnv");
    return false;
  }
  if (!process.env.CLIENT_ID)
  {
    console.warn("Missing Spotify Client ID in DotEnv");
    return false;
  }
  if (!process.env.CLIENT_SECRET)
  {
    console.warn("Missing Spotify Client Secret in DotEnv");
    return false;
  }
  return true;
};