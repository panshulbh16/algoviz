export function getSelectionSortAnimations(array)
{
    const animations = [];
    if (array.length <= 1)
        return array;
    const auxiliaryArray = array.slice();
    selectionSort(auxiliaryArray, animations)
    return [animations, array];
}

function selectionSort(auxiliaryArray, animations){
	const n = auxiliaryArray.length;
	for (let i = 0; i<n-1; i++){
		let minIndex = i;
		for (let j = i+1; j<n; j++){
			animations.push(["compare1", j, minIndex]);
			animations.push(["compare2", j, minIndex]);
			if (auxiliaryArray[minIndex] > auxiliaryArray[j]){
				minIndex = j;
			}
		}	
		animations.push(["swap", minIndex, auxiliaryArray[i]]);
		animations.push(["swap", i, auxiliaryArray[minIndex]]);
		let temp = auxiliaryArray[minIndex];
		auxiliaryArray[minIndex] = auxiliaryArray[i];
		auxiliaryArray[i] = temp; 
	}
}