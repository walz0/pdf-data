/**
 * Walks through 'src' from 'startIndex' until given 'byte' is found or end is reached
 * @param src Source buffer
 * @param byte Search query
 * @param startIndex Starting index in src buffer
 * @returns 
 */
const findByte = (src: Buffer, byte: number, startIndex: number) : number => {
    for (let i = startIndex; i < src.byteLength; i++) {
        if (src[i] == byte) {
            return i;
        }
    }
    return 0;
}

export { findByte }