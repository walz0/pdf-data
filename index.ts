import fs from "fs"
import { getTable } from "./lib/xref"

let data = fs.readFileSync("../Documents/books/bluetooth/Alternatives.pdf")

getTable(data)