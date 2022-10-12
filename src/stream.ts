import zlib from "zlib";

/**
    this should return a stream object containing the raw stream
    data as well as the inflated text string
*/
const getStreamData = (src: Buffer, offset: number) => {
    // const object = getObject(data, xref.entries[xref.entries.length - 1].offset);
    // const startIndex = findPattern(object, Buffer.from("stream"), 0, false);
    // const endIndex = findPattern(object, Buffer.from("endstream"), 0, false);

    // const stream = object.slice(startIndex + "stream".length + 1, endIndex - 1);
    // console.log(zlib.inflateSync(stream).toString());   
}