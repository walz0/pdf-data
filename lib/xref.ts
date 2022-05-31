class XREFTable {
    entries: Buffer[]
    constructor(entries: Buffer[]) {
        this.entries = entries
    }
}

class XREFObject {

}


const getTable = (buffer: Buffer): XREFTable => {
    let start = buffer.indexOf(xref) + 5 // start of xref table plus offset
    let lines: Buffer[] = []
    for (var i = start; i < buffer.length; i++) {
        // detect end of xref table
        if (i >= trailer.length) {
            let slice: Buffer = buffer.slice(i - trailer.length, i)
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
    return new XREFTable(lines)
}

export { getTable }
