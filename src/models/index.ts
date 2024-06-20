import { model, models } from "mongoose";
import { collectionSchema } from "./Collections";
import { inscriptionSchema } from "./Inscriptions";
const Collection = models.Collection || model("Collection", collectionSchema);
const Inscription =
  models.Inscription || model("Inscription", inscriptionSchema);
export { Collection, Inscription };
