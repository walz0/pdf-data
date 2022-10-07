import fs from "fs";
import { getTable } from "./src/xref";
import { getAllObjects } from "./src/obj";

let data = fs.readFileSync("./media/Game Engine Black Book - DOOM.pdf");

console.log(getAllObjects(data));

// getTable(data);