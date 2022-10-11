import fs from "fs";
import { getTable } from "./src/xref";
import { getObject } from "./src/obj";

let data = fs.readFileSync("./media/Game Engine Black Book - DOOM.pdf");
// let data = fs.readFileSync("./media/Advanced usage.pdf");

const xref = getTable(data);
console.log(xref);

for (var i = 1; i < xref.entries.length; i++) {
    const object = getObject(data, xref.entries[i].offset);
}