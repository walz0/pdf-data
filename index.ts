import fs from "fs"
import { getTable } from "./lib/xref"

let data = fs.readFileSync("./media/Advanced usage.pdf")

getTable(data)