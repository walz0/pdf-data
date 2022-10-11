import fs from "fs";
import zlib from "zlib";
import { getTable } from "./src/xref";
import { getObject, obj } from "./src/obj";
import { findPattern } from "./src/util";

// let data = fs.readFileSync("./media/Game Engine Black Book - DOOM.pdf");
let data = fs.readFileSync("./media/Advanced usage.pdf");

// zlib.inflateSync()

const xref = getTable(data);
console.log(xref);

// for (var i = 1; i < xref.entries.length; i++) {
//     const object = getObject(data, xref.entries[i].offset);
// }

const object = getObject(data, xref.entries[xref.entries.length - 1].offset);
const startIndex = findPattern(object, Buffer.from("stream"), 0, false);
const endIndex = findPattern(object, Buffer.from("endstream"), 0, false);

const stream = object.slice(startIndex + "stream".length + 1, endIndex - 1);
console.log(zlib.inflateSync(stream).toString());