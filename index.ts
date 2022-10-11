import fs from "fs";
import { getTable } from "./src/xref";
import { getObject } from "./src/obj";

let data = fs.readFileSync("./media/Advanced usage.pdf");

const xref = getTable(data);

for (var i = 0; i < xref.entries.length; i++) {
    console.log(xref.entries[i].offset);
    const object = getObject(data, xref.entries[i].offset);
}