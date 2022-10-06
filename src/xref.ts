const XREF = Buffer.from("xref\n", "utf8")
const TRAILER = Buffer.from("trailer\n", "utf8")

class XREFTable {
    entries: Reference[]
    constructor(entries: Reference[]) {
        this.entries = entries
    }
}

class Reference { 
    data: Buffer
    constructor(data: Buffer) {
        this.data = data
    }
}

const getTable = function (buffer: Buffer): XREFTable {
    let start = buffer.indexOf(XREF) + XREF.length // start of xref table
    console.debug("xref table start", start)
    let lines: Buffer[] = []
    for (var i = start; i < buffer.length; i++) {
        // detect end of xref table
        if (i >= TRAILER.length) {
            let slice: Buffer = buffer.slice(i - TRAILER.length, i)
            if (Buffer.compare(slice, TRAILER) == 0) {
                console.log("xref table end", i)
                break
            }
        }
        // detecting the end of each section label
        if (buffer[i] == 0x0a) {
            lines.push(buffer.slice(start, i))
            start = i
        }
    }
    return new XREFTable([])
}

export { getTable, XREFTable, Reference }