import { model, models } from "mongoose";
import { userSchema } from "./User";

const User =
  models.User || model("User", userSchema);

 export {User}