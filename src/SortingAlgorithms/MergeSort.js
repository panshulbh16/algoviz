
export function getMergeSortAnimations(array)
{
    const animations = [];
    if (array.length <= 1)
        return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    if (startIdx === endIdx)
        return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
    let k = startIdx, i = startIdx, j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        animations.push(["compare1", i, j]);
        animations.push(["compare2", i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            animations.push(["swap", k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        }
        else {
            animations.push(["swap", k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        animations.push(["compare1", i, i]);
        animations.push(["comapre2", i, i]);
        animations.push(["swap", k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        animations.push(["compare1", j, j]);
        animations.push(["comapre2", j, j]);
        animations.push(["swap", k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }

}
