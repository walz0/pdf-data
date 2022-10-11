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

/**
 * Walks through 'src' from 'startIndex' until given 'pattern' is found or end is reached
 * @param src Source buffer
 * @param pattern Search query
 * @param startIndex Starting index in src buffer
 * @param reverse Walk backward instead of forward
 * @returns 
 */
const findPattern = (src: Buffer, pattern: Buffer, startIndex: number, reverse?: boolean) : number => {
    if (reverse === true)
        for (let i = startIndex + 1; i > pattern.byteLength; i--)
            if (pattern.compare(src.slice(i-pattern.byteLength, i), 0, pattern.byteLength) === 0)
                return i;
    for (let i = startIndex; i < src.byteLength - pattern.byteLength; i++)
        if (pattern.compare(src.slice(i, i+pattern.byteLength), 0, pattern.byteLength) === 0)
            return i;
    return 0;
}

export {
    findByte,
    findPattern
}