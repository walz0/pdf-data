class obj {
    public objNumber: number; // Object Number (positive integer)
    public revNumber: number; // Revision / Generation Number (non-negative integer)
    public ref: obj | null = null; // Object Reference
    constructor (objNumber: number, revNumber: number) {
        this.objNumber = objNumber;
        this.revNumber = revNumber;
    }
}

class obj_Name {
    value: string;
    constructor(value: string) {
        this.value = value;
    }
}

class obj_Dictionary {
    dict: Map<obj_Name, obj>;
    constructor(names: obj_Name[], objects: obj[]) {
        this.dict = new Map();
        const length = (names.length == objects.length) ? objects.length : null;
        if (length == null) {
            throw new Error("'names' and 'objects' provided are not the same length");
        }
        for (let i = 0; i < length; i++) {
            this.dict.set(names[i], objects[i]);
        }
    }
    public Add (name:obj_Name, obj: obj): void {
        this.dict.set(name, obj);
    }
    public Remove (name:obj_Name): void {
        this.dict.delete(name);
    }
    public Get (name:obj_Name): obj | undefined {
        return this.dict.get(name);
    }
}

// class obj_Array {}
// class obj_Number {}

class obj_StringObj {
    /*STRING_TABLE = {
        "\\n": "\n", // Line Feed (LF)
        "\\r": "\r", // Carriage Return (CR)
        "\\t": "\t", // Horizontal Tab (HT)
        "\\b": "\b", // Backspace (BS)
        "\\f": "\f", // FormFeed (FF)
        "\\(": "(", // Left Parenthesis
        "\\)": ")", // Right Parenthesis
        "\\\\": "\\", // Backslash
        "\\EOL": "\r\n", // Ignore
        "\\ddd": "", // character code ddd. One, two or three 0-7 digits with overflow ignored. If a digit follows, three octals digits are mandatory.
    }*/
    value: string
    
    constructor (value: string) {
        this.value = value;
    }
}

class obj_Stream {}

class obj_Boolean {}

class obj_NullObj {}

const parseRawObject = (data: Buffer): obj[] => {

    return [];
}

/**
 * Returns all objects in the PDF file
 */
const getAllObjects = (data: Buffer): obj[] => {
    const p_obj: Buffer = Buffer.from(" obj\n");
    const p_endobj: Buffer = Buffer.from("endobj\n");

    let temp: Buffer = Buffer.alloc(p_endobj.byteLength);
    let r = temp.byteLength;
    let [startPos, endPos]: number[][] = [[], []];
    let rawContent: Buffer[] = [];
    let objects: obj[] = [];

    // True when reading the contents of an object
    let reading = false;
    let readBuffer: Buffer = Buffer.alloc(0);

    for (var l = 0; r < data.byteLength + 1; l++) {
        // Check for pattern matches
        if (p_obj.compare(temp, 0, p_obj.byteLength) === 0) {
            reading = true;
            startPos.push(l);
        }
        if (p_endobj.compare(temp, 0, p_endobj.byteLength) === 0) {
            reading = false;
            // Push content of current object and clear buffer
            rawContent.push(readBuffer);
            readBuffer = Buffer.alloc(0);
            endPos.push(l);
        }
        // Read raw contents of object
        if (reading === true) {
            const newByte = Buffer.alloc(1);
            newByte.writeUInt8(data[l], 0);
            readBuffer = Buffer.concat([readBuffer, newByte]);
        }
        // Copy current window into temp
        data.copy(temp, 0, l, r);
        r++;
    }

    if (startPos.length !== endPos.length)
        throw new Error("Totals for obj and endobj tags do not match");

    const objCount = startPos.length;
    for (var i = 0; i < objCount; i++) {
        const objNumber = parseInt(String.fromCharCode(data[startPos[i] - 4]));
        const revNumber = parseInt(String.fromCharCode(data[startPos[i] - 2]));
        const content: Buffer = rawContent[i].slice(p_obj.byteLength - 1, rawContent[i].byteLength - 1);
        /**
         * Parse content into objects
         */

        objects.push(new obj(objNumber, revNumber));
    }

    return objects;
}

export { 
    obj,
    obj_Name,
    obj_Dictionary,
    obj_StringObj,
    obj_Stream,
    obj_Boolean,
    obj_NullObj,
    getAllObjects
}