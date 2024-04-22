function replaceSpacesAndCommas(inputString) {
    let processedString = inputString.replace(/ /g, '+');
    processedString = processedString.replace(/,/g, '_');
    return processedString;
}

function revertReplacements(inputString) {
    let processedString = inputString.replace(/\+/g, ' ');
    processedString = processedString.replace(/_/g, ',');
    return processedString;
}

export const convert = {
    toUrl: replaceSpacesAndCommas,
    toString: revertReplacements,
};
