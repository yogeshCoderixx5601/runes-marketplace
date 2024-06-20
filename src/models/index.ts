

import { model, models } from "mongoose";
import { collectionSchema } from "./Collections";
const Collection = models.Collection || model("Collection", collectionSchema);

export {Collection,};