/**
 * Converts a string to camelCase
 * @param {String} str String to make camel case
 */
export function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index == 0 ? match.toLowerCase() : match.toUpperCase();
    });
};

/**
 * Decamelizes a string with/without a custom separator (underscore by default).
 * 
 * @param str String in camelcase
 * @param separator Separator for the new decamelized string.
 */
export function decamelize(str, separator) {
    separator = typeof separator === 'undefined' ? ' ' : separator;

    return str
        .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
        .toLowerCase();
}
export function escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

/**
 * Checks if a string is JSON.
 * Only returns true if the JSON parses to an Object or an Array
 * @param {string} str the string to check if it is JSON
 * @returns {boolean}
 */
export function isJSON(str){
    if (typeof str !== 'string') return false;
    try {
        const result = JSON.parse(str);
        const type = Object.prototype.toString.call(result);
        return type === '[object Object]' 
            || type === '[object Array]';
    } catch (err) {
        return false;
    }
}