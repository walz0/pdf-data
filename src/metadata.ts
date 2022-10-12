import {findByte} from "./util";

class Metadata {
    version: number | undefined = undefined;
    constructor(version: number | undefined) {
        this.version = version
    }
}

const getVersion = (file: Buffer): number | undefined => {
    const start = findByte(file, "-".charCodeAt(0), 0);
    const end = findByte(file, "%".charCodeAt(0), start);
    return parseFloat(file.slice(start+1, end-1).toString());
}

const getMetadata = (file: Buffer): Metadata => {
    const version: number | undefined = getVersion(file);
    return new Metadata(version);
}

export {
    getMetadata,
    getVersion
}