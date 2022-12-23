let fromElement = document.getElementById("from");
let toElement = document.getElementById("to");
let swapButton = document.getElementById("swap");
swapButton.onclick = () => {
    swap();
    updateState();
};

fromElement.onchange = () => {
    from = fromElement.value;
}
toElement.onchange = () => {
    to = toElement.value;
}

function updateState(){
    fromElement.value = from;
    toElement.value = to;
}

function swap(){
    let c = from;
    from = to;
    to = c;
}

let from = fromElement.value;
let to = toElement.value;
