import fs from "fs";
import { getTable } from "./src/xref";
import { getAllObjects } from "./src/obj";

let data = fs.readFileSync("./media/Advanced usage.pdf");

const xref = getTable(data);
console.log(xref);