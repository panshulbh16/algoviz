// export function getBubbleSortAnimations(array)
// {
//     const animations = [];
//     if (array.length <= 1)
//         return array;
//     const auxiliaryArray = array.slice();
//     bubbleSort(auxiliaryArray, animations)
//     return animations;
// }

// function bubbleSort(auxiliaryArray, animations){
// 	const n = auxiliaryArray.length;
// 	let flag = false;
// 	for (let i = 0; i<n-1; i++){
// 		animations.push([i, i+1]);
// 		animations.push([i, i+1]);
// 		for (let j = 0; j<n-1; j++){
// 			if (auxiliaryArray[j] > auxiliaryArray[j+1]){
// 				flag = true;
// 				animations.push([j, auxiliaryArray[j+1]]);
// 				let temp = auxiliaryArray[i];
// 				auxiliaryArray[j] = auxiliaryArray[j+1];
// 				auxiliaryArray[j+1] = temp;
// 		}
// 	}
// 	if (flag === false){
// 		break;
// 		}

// 	}
// }