const fs = require("fs")

const xref = Buffer.from("xref\n", "utf8")
const trailer = Buffer.from("trailer\n", "utf8")

let data = fs.readFileSync("../Advanced usage.pdf")

function getXREF(buffer) {
    start = buffer.indexOf(xref) + 5 // start of xref table plus offset
    lines = []
    for (i = start; i < buffer.length; i++) {
        // detect end of xref table
        if (i >= trailer.length) {
            slice = buffer.slice(i - trailer.length, i)
            if (Buffer.compare(slice, trailer) == 0) {
                console.log("fuck")
                break
            }
        }
        // detecting the end of each section label
        if (buffer[i] == 0x0a) {
            lines.push(buffer.slice(start, i))
            start = i
        }

    }
}

getXREF(data)