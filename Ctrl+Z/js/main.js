let photo = document.getElementById("photo");

let getOriginalState = () => {
    return {
        brightness: 100,
        contrast: 100,
        blur: 0
    };
}

let state = getOriginalState();

let controls = [];
controls.push(document.getElementById("brightness"));
controls.push(document.getElementById("contrast"));
controls.push(document.getElementById("blur"));

let updateState = (newState) => {
    state.brightness = newState.brightness;
    state.contrast = newState.contrast;
    state.blur = newState.blur;
    controls.forEach((control) => {
        control.value = state[control.id];
    })
    applyFilters(newState);
}

let applyFilters = (state) => {
    photo.style.filter = `brightness(${state.brightness}%) contrast(${state.contrast}%) blur(${state.blur}px)`;
}

controls.forEach((control) => {
    control.onchange = () => {
        let newState = JSON.parse(JSON.stringify(state));
        newState[control.id] = parseInt(control.value);
        updateState(newState);
    }
});

let saveButton = document.getElementById("saveButton");

let savedStates = [];
let redoStack = [];

saveButton.onclick = () => {
    savedStates.push(JSON.parse(JSON.stringify(state)));
}

savedStates.push(JSON.parse(JSON.stringify(state)));

let previousButton = document.getElementById("previousButton");

previousButton.onclick = () => {
    let previousState = savedStates.pop();

    if(previousState){
        redoStack.push(JSON.parse(JSON.stringify(state)));
        updateState(previousState);
    }
}

let redoButton = document.getElementById("redoButton");

redoButton.onclick = () => {
    let s = redoStack.pop();

    if(s){
        savedStates.push(JSON.parse(JSON.stringify(s)));
        updateState(s);
    }
}

let resetButton = document.getElementById("resetButton");

resetButton.onclick = () => {
    savedStates = [];
    let originalState = getOriginalState();
    savedStates.push(originalState);
    updateState(originalState);
}