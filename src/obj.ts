const STRING_TABLE = {
    "\\n": "\n", // Line Feed (LF)
    "\\r": "\r", // Carriage Return (CR)
    "\\t": "\t", // Horizontal Tab (HT)
    "\\b": "\b", // Backspace (BS)
    "\\f": "\f", // FormFeed (FF)
    "\\(": "(", // Left Parenthesis
    "\\)": ")", // Right Parenthesis
    "\\\\": "\\", // Backslash
    "\\EOL": "", // Ignore
    "\\ddd": "", // character code ddd. One, two or three 0-7 digits with overflow ignored. If a digit follows, three octals digits are mandatory.
}

class Object { }

class obj_Number {
    value: Number;
    constructor(value: Number) {
        this.value = value;
    }
}

class obj_IndirectRef {
    objNumber: Number; // Object Number (positive integer)
    revNumber: Number; // Revision / Generation Number (non-negative integer)
    ref: Object; 
    constructor (objNumber: Number, revNumber: Number) {
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
    dict: Map<obj_Name, Object>;
    constructor(names: obj_Name[], objects: Object[]) {
        const length = (names.length == objects.length) ? objects.length : null;
        if (length == null) {
            throw new Error("'names' and 'objects' provided are not the same length");
        }
        for (let i = 0; i < length; i++) {
            this.dict.set(names[i], objects[i]);
        }
    }
    public Add (name:obj_Name, obj: Object): void {
        this.dict.set(name, obj);
    }
    public Remove (name:obj_Name): void {
        this.dict.delete(name);
    }
    public Get (name:obj_Name): Object | undefined {
        return this.dict.get(name);
    }
}

class obj_Array {}

class obj_StringObj {}

class obj_Stream {}

class obj_Boolean {}

class obj_NullObj {}

export { 
    obj_Number,
    obj_IndirectRef,
    obj_Name,
    obj_Dictionary,
    obj_Array,
    obj_StringObj,
    obj_Stream,
    obj_Boolean,
    obj_NullObj
}