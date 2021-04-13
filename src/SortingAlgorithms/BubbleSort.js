export function getBubbleSortAnimations(array)
{
    const animations = [];
    if (array.length <= 1)
        return array;
    const auxiliaryArray = array.slice();
    bubbleSort(auxiliaryArray, animations)
    return animations;
}

function bubbleSort(auxiliaryArray, animations){
	const n = auxiliaryArray.length;
	let flag = false;
	for (let i = 0; i<n-1; i++){
		for (let j = 0; j<n-1-i; j++){
			animations.push(["compare1", j, j+1]);
			animations.push(["compare2", j, j+1]);
			if (auxiliaryArray[j] > auxiliaryArray[j+1]){
				flag = true;
				animations.push(["swap", j, auxiliaryArray[j+1]]);
				animations.push(["swap", j+1, auxiliaryArray[j]]);
				let temp = auxiliaryArray[j];
				auxiliaryArray[j] = auxiliaryArray[j+1];
				auxiliaryArray[j+1] = temp;
		}
	}
	if (flag === false){
		break;
		}

	}
}