export function getBubbleSortAnimations(array)
{
    const animations = [];
    if (array.length <= 1)
        return array;
    const auxillaryArray = array.slice();
    bubbleSort(auxillaryArray, animations)
    return [animations, array];
}

function bubbleSort(auxillaryArray, animations){
	const n = auxillaryArray.length;
    for (let i = 0; i<n-1; i++){
        let swapped = false;
        for(let j = 0; j < n-1; j++) {
            animations.push(["compare1", j, j+1]);
            animations.push(["compare2", j, j+1]);
            if(auxillaryArray[j] > auxillaryArray[j + 1]) {
                swapped = true;
                animations.push(["swap", j, auxillaryArray[j+1]]);
                animations.push(["swap", j + 1, auxillaryArray[j]]);
                let temp = auxillaryArray[j];
                auxillaryArray[j] = auxillaryArray[j+1];
                auxillaryArray[j+1] = temp;
            }
        }
        if(swapped === false){
        	break;
        }
	}
}