const range = document.getElementById("numOfVal");
const val = document.getElementById("val");
const sort = document.getElementById("sort");
const generate = document.getElementById("generate");
const container = document.getElementById("container");
const colors = ["lightgrey", "grey", "darkgrey"]
const algorithm = document.getElementById("algorithms");
const speeds = document.getElementById("speed");

let numOfRect = range.value;

let valArray = [];

generate.addEventListener("click", () => {
    valArray = generateArray();
    drawRect();
})

sort.addEventListener("click", () => {
    speed = choosenSpeed();
    choosenAlgo();
})

function choosenSpeed() {
    if (speeds.value === "Slow"){
        speed = 200;
    }
    if ((range.value >= 50 && speeds.value === "Slow") || speeds.value === "Medium"){
        speed = 120;
    }
    if ((range.value >= 50 && speeds.value === "Medium") || speeds.value === "Fast") {
        speed = 30;
    }
    if ((range.value >= 50 && speeds.value === "Fast")){
        speed = 10;
    }

    return speed;
}

function choosenAlgo() {
    if (algorithm.value === "BubbleSort"){
        bubbleSort();
    } else if (algorithm.value === "InsertionSort"){
        insertionSort();
    }
}

function changeVal(newVal) {
    val.innerHTML = newVal;
    numOfRect = newVal;
}

function createRect(colorValue) {
    const div = document.createElement("div");
    div.className = "rect";
    div.id = `rect-${colorValue}`;
    div.style.height = `${valArray[colorValue] * 5}px`;
    div.style.backgroundColor = colors[colorValue % 3];
    container.appendChild(div)
}

function generateArray() {
    let array = [];
    for (let i = 0; i < numOfRect; i++) {
        array.push(Math.floor(Math.random() * 100));
    }

    return array;
}

function updateRect(index) {
    const div = document.getElementById(`rect-${index}`)
    div.style.height = `${valArray[index] * 5}px`;
}

function drawRect(){
    for (let i = 0; i < numOfRect; i++) {
        createRect(i);
    }
}

async function bubbleSort() {
    for (let i = 0; i < valArray.length; i++) {
        for (let j = 0; j < valArray.length - i - 1; j++) {
            let value1 = document.getElementById(`rect-${j}`)
            value1.style.backgroundColor = "green";
            let value2 = document.getElementById(`rect-${j + 1}`)
            value2.style.backgroundColor = "red";
            if (valArray[j] > valArray[j + 1]) {
                let temp = valArray[j];
                valArray[j] = valArray[j + 1];
                valArray[j + 1] = temp;
                updateRect(j);
                updateRect(j + 1);
                await new Promise(resolve => setTimeout(resolve, speed));
            }
            value1.style.backgroundColor = colors[j % 3];
            value2.style.backgroundColor = colors[(j + 1) % 3];
        }
    }

    return valArray;
}

async function insertionSort() {
    for (let i = 1; i < valArray.length; i++) {
        for (let j = i; j > 0; j--) {
            let value1 = document.getElementById(`rect-${j}`)
            value1.style.backgroundColor = "green";
            let value2 = document.getElementById(`rect-${j - 1}`);
            value2.style.backgroundColor = "red";
            if (valArray[j - 1] > valArray[j]){
                let temp = valArray[j - 1];
                valArray[j - 1] = valArray[j];
                valArray[j] = temp;
                updateRect(j);
                updateRect(j - 1);
                await new Promise(resolve => setTimeout(resolve, speed));
            }

            value1.style.backgroundColor = colors[j % 3];
            value2.style.backgroundColor = colors[(j - 1) % 3];
        }
    }
    return valArray;
}