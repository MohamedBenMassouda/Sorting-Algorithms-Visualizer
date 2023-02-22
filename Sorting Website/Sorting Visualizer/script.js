const start = document.getElementById("start");
let algorithm = document.getElementById("algorithms");
let speedChosen = document.getElementById("speed");
let explanation = document.getElementById("explanation");
let array = []
const slow = 1000;
const medium = 500;
const fast = 100;

function generate(){
    for (let i = 0; i < 10; i++) {
        let value = document.getElementById(`values${i + 1}`);
        value.innerHTML = Math.floor(Math.random() * 100);
        array[i] = value.innerHTML;
    }
}

start.addEventListener("click", () => {
    let speed = slow;

    if (speedChosen.value === "Fast"){
        speed = fast;
    } else if (speedChosen.value === "Medium"){
        speed = medium;
    }

    if (algorithm.value === "BubbleSort"){
        array = bubbleSort(array, speed);
        explanation.innerHTML = "BubbleSort works by comparing each element by It's adjacent element <br>" +
        "If the element1 is greater than the other element2 they switch places and It keeps going like this."
    }else if (algorithm.value === "QuickSort"){
        array = quickSort(array);
        explanation.innerHTML = "QuickSort works by picking a random pivot number and shifting the elements less to the left and greater to the right and It keeps going till the array is sorted"   
    } else if (algorithm.value === "MergeSort"){
        mergeSort(array);
    }
})


async function bubbleSort(array, speed) {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            let element1 = document.getElementById(`values${j + 1}`);
            let element2 = document.getElementById(`values${j + 2}`);
            element1.style.backgroundColor = "red";
            element2.style.backgroundColor = "yellow";
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                updateHTML(j, array[j]);
                updateHTML(j + 1, array[j + 1]);
                await new Promise(resolve => setTimeout(resolve, speed));
            }
            element1.style.backgroundColor = "white";
            element2.style.backgroundColor = "white";
        }
    }
    return array;
}

function updateHTML(index, value) {
    let element = document.getElementById(`values${index + 1}`);
    element.innerHTML = value;
}

function quickSort(array) {
    if (array.length <= 1) return array;
    let pivotIndex = Math.floor(Math.random() * array.length);
    let pivot = array[pivotIndex];
    let left = [];
    let right = [];

    for (let i = 0; i < array.length; i++) {
        if (pivot >= array[i]) {
            left.push(array[i]);
            updateHTML(i, array[i]);
        } else if (pivot < array[i]) {
            right.push(array[i]);
            updateHTML(i, array[i]);
        }
    }
    
    return quickSort(left).concat(pivot, quickSort(right));
}


function mergeSort(array) {
    if (array.length === 1) return array;

    // Dividing the array to left and right
    let divide = Math.floor(array.length / 2);
    let left = array.slice(0, divide);
    let right = array.slice(divide);

    // Keep dividing till we get array.length == 1
    mergeSort(left);
    mergeSort(right);

    // i counter for left, j counter for right and k counter for array
    let i = j = k = 0;

    while (i < left.length && j < right.length) {
        // if the element of right inferior than lefts then we put it in array first
        // and the contrary is true
        if (left[i] >= right[j]) {
            array[k] = right[j];
            updateHTML(k, array[k]);
            j++;
        } else {
            array[k] = left[i];
            updateHTML(k, array[k]);
            i++;
        } 
        k++;
    }

    // Checking if is there any remaining elements in each array
    while (i < left.length) {
        array[k] = left[i];
        updateHTML(k, array[k]);
        i++;
        k++;
    }

    while (j < right.length) {
        array[k] = right[j];
        updateHTML(k, array[k]);
        j++;
        k++;
    }
    return array;
}
