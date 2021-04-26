export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1)
        return array;
    const auxiliaryArray = array.slice();
    bubbleSort(auxiliaryArray, animations)
    return animations;
}

function bubbleSort(auxiliaryArray, animations) {
    const n = auxiliaryArray.length;
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            animations.push([j, j + 1]);
            animations.push([j, j + 1]);
            animations.push([j, auxiliaryArray[j]]);
            if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
                swapped = true;
                animations.push([j, j + 1]);
                animations.push([j, j + 1]);
                animations.push([j, auxiliaryArray[j + 1]]);
                animations.push([j + 1, j]);
                animations.push([j + 1, j]);
                animations.push([j + 1, auxiliaryArray[j]]);
                let temp = auxiliaryArray[j];
                auxiliaryArray[j] = auxiliaryArray[j + 1];
                auxiliaryArray[j + 1] = temp;
            }
        }
        if (swapped === false) {
            break;
        }
        //  animations.putanimation(j,j+1,auxiliaryArray[j])
    }
}