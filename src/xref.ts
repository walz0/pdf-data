import { findByte } from "./util";

const EOF = Buffer.from("%%EOF");
const XREF = Buffer.from("xref");
const TRAILER = Buffer.from("trailer\n");

class XREFTable {
    entries: Reference[];
    constructor(entries: Reference[]) {
        this.entries = entries;
    }
}

class Reference { 
    offset: number;
    revNumber: number;
    free: boolean;
    constructor(offset: number, revNumber: number, free: boolean) {
        this.offset = offset;
        this.revNumber = revNumber;
        this.free = free;
    }
}

/**
 * Returns the XREF table of a given PDF file 
 * @param data Source buffer
 * @returns 
 */
const getTable = function (data: Buffer): XREFTable {
    // Get offset for end of xref offset value
    const endOffset = (data.byteLength - 1) - EOF.byteLength - 1;
    let offsetString: string = "";
    for (var i = endOffset; i > 0; i--) {
        // Check for LF (beginning of offset number)
        if (data[i] == 0x0a) {
            break;
        }
        offsetString += parseInt(String.fromCharCode(data[i]));
    }
    // Offset to the start the xref table
    const offset: number = parseInt(offsetString.split("").reverse().join("")) + XREF.byteLength + 1;
    // Offset to the start of obj data
    const tableStart: number = findByte(data, 0x0a, offset) + 1;
    // Number of objects in XREF table
    const tableLength: number = parseInt(
        data.slice(offset, tableStart - 1).toString().split(" ")[1]
        );
    // Length of XREF entry in bytes
    const LINE_LENGTH = 20;
    // Parse table entries into Reference objects
    let entries: Reference[] = [];
    for (var i = 0; i < tableLength; i++) {
        const items = data.slice(
                tableStart+(LINE_LENGTH * i),
                (tableStart + (LINE_LENGTH*i) + LINE_LENGTH) - 2 // -2 for 0a and 20
            ).toString().split(" ");
        const idx = parseInt(items[0]); // Offset
        const rev = parseInt(items[1]); // Revision number
        const free = (items[2] == "f") ? true : false; // Free / I(n) use
        entries.push(new Reference(idx, rev, free));
    }

    return new XREFTable(entries);
}

export { getTable, XREFTable, Reference }