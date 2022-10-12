import fs from "fs";
import zlib from "zlib";
import { getTable } from "./src/xref";
import { getObject, obj, obj_Stream } from "./src/obj";
import { findPattern } from "./src/util";
import { getMetadata } from "./src/metadata";

// let data = fs.readFileSync("./media/Game Engine Black Book - DOOM.pdf");
// let data = fs.readFileSync("./media/Cracking the Coding Interview.pdf");
let data = fs.readFileSync("./media/Advanced usage.pdf");

const metadata = getMetadata(data);
console.log(metadata);

const xref = getTable(data);
// console.log(xref);

// for (var i = 1; i < xref.entries.length; i++) {
//     const object = getObject(data, xref.entries[i].offset);
// }

const object = getObject(data, xref.entries[xref.entries.length - 1].offset);
const startIndex = findPattern(object, Buffer.from("stream"), 0, false);
const endIndex = findPattern(object, Buffer.from("endstream"), 0, false);

const stream = new obj_Stream(object.slice(startIndex + "stream".length + 1, endIndex - 1));
console.log(stream.inflate());
// console.log(zlib.inflateSync(stream.data).toString());
