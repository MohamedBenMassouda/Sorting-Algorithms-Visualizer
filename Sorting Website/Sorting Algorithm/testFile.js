function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]){
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }

    return array;
}

function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        for (let j = i; j > 0; j--) {
            if (array[j - 1] > array[j]){
                let temp = array[j - 1];
                array[j - 1] = array[j];
                array[j] = temp;
            }
        }
    }
    return array;
}

function quickSort(array) {
    if (array.length === 0)
        return array;

    let left = [], right = [];
    let pivot = array[Math.floor(Math.random() * array.length)]
    for (let i = 0; i < array.length; i++) {
        if (array[i] > pivot){
            right.push(array[i]);
        } else {
            left.push(array[i]);
        }
    }

    quickSort(left);
    quickSort(right);

    return array;
}

let array = [1, 56, 20, 3, 7, 8]

console.log(quickSort(array))