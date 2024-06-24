import { model, models } from "mongoose";
import { userSchema } from "./User";
// import { utxoSchema } from "./Runes";

const User =
  models.User || model("User", userSchema);
  // const Utxos =
  // models.Utxos || model("Utxos", utxoSchema);

 export {User}