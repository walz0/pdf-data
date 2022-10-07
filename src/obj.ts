class obj { }

class obj_IndirectRef {
    objNumber: Number; // Object Number (positive integer)
    revNumber: Number; // Revision / Generation Number (non-negative integer)
    ref: obj; // Object Reference
    constructor (objNumber: Number, revNumber: Number, ref: Object) {
        this.objNumber = objNumber;
        this.revNumber = revNumber;
        this.ref = ref;
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

/**
 * Returns all Objects in the given file
 */
const getAllObjects = (data: Buffer): obj[] => {
    // Find start positions of all obj tags
    const pattern: Buffer = Buffer.from("obj\n");
    let temp: Buffer = Buffer.alloc(pattern.byteLength);
    let r = pattern.byteLength;
    let pos: Number[] = [];
    for (var l = 0; r < data.byteLength + 1; l++) {
        // If 'obj' pattern matched
        if (pattern.equals(temp)) {
            pos.push(l);
        }
        data.copy(temp, 0, l, r);
        r++;
    }
    
    return [new obj];
}

export { 
    obj,
    obj_IndirectRef,
    obj_Name,
    obj_Dictionary,
    obj_StringObj,
    obj_Stream,
    obj_Boolean,
    obj_NullObj,
    getAllObjects
}