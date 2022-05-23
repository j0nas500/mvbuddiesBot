// Checks if any Environment Variable is not set
export const validateEnv = async () => {
  if (!process.env.TOKEN)
  {
    console.warn("Missing Discord Bot Token in DotEnv");
    return false;
  }
  //if (!process.env.GUILD_ID)
  //{
  //  console.warn("Missing Guild ID of your DevServer in DotEnv");
  //  return false;
  //}
  // for later purpose
  //if (!process.env.MONGO_URI)
  //{
  //  console.warn("Missing MongoDB connection in DotEnv");
  //  return false;
  //}
};