var numOfSquares;
var sizeOfSquare;
var minePercent;
var timeInterval;
var timer;

var startButton = document.getElementById('start');
var resetButton = document.getElementById('reset');
var selection = document.getElementById('drop');
var info = document.getElementById('info');
var clockInfo = document.getElementById('clockCounter');
var gameCounters = document.getElementById('counters');

var boardDiv = document.getElementById('board');

initEasy();
drawBoard();

function drawBoard(){
    boardDiv.innerHTML = "";
    var gaps = parseInt(sizeOfSquare/10);
    var boardSize = (numOfSquares * (sizeOfSquare + gaps)) - gaps;

    boardDiv.style.width = boardSize + "px";
    boardDiv.style.height = boardSize + "px";

    boardDiv.style.gridTemplateColumns = buildTemplate();
    boardDiv.style.gridTemplateRows = buildTemplate();
    boardDiv.style.gap = gaps + 'px';
    boardDiv.style.padding = gaps + 'px';

    for(var i = 0; i < numOfSquares; i++){
        for(var j = 0; j < numOfSquares; j++){
            var boardSquareDiv = document.createElement('div');
            boardSquareDiv.style.width = sizeOfSquare + 'px';
            boardSquareDiv.style.height = sizeOfSquare + 'px';
            boardSquareDiv.style.backgroundColor = 'rgb(83, 140, 70)';
            boardSquareDiv.style.fontSize = sizeOfSquare * 0.8 + 'px';
            boardSquareDiv.id = i + " " + j;
            boardSquareDiv.className = 'unit';
            boardDiv.appendChild(boardSquareDiv);
        }
    }
}

function prePlay(){
    switch(selection.value){
        case 'Easy':
            initEasy();
            break;
        case 'Medium':
            initMedium();
            break;
        case 'Hard':
            initHard();
            break;
    }

    drawBoard();
    play();
}

function initEasy(){
    numOfSquares = 10;
    sizeOfSquare = 48;
    minePercent = 10;
}

function initMedium(){
    numOfSquares = 16;
    sizeOfSquare = 30;
    minePercent = 15;
}

function initHard(){
    numOfSquares = 24;
    sizeOfSquare = 20;
    minePercent = 20;
}

function startCounter(){
    timer = 1;
    timeInterval = setInterval(function(){
        clockInfo.innerHTML = timer++;
    }, 1000);
}

function stopCounter(){
    clearInterval(timeInterval);
}

function play(){
    startButton.style.display = 'none';
    selection.style.display = 'none';
    resetButton.style.display = 'inline';
    clockInfo.innerHTML = '0';
    gameCounters.style.display = 'flex';

    var tableModel = [];
    var bombs;
    bombs = createTableModel(tableModel, numOfSquares);
    var opened  = 0;
    var max = numOfSquares*numOfSquares - bombs;

    startCounter();

    var squares = document.getElementsByClassName('unit');
    //go through them and add hover
    for(var i = 0; i < squares.length; i++){
        squares[i].onmouseover = function(){
            //change the color
            this.style.backgroundColor = 'rgb(44, 94, 52)';
        };
        squares[i].onmouseout = function(){
            //reset color
            this.style.backgroundColor = 'rgb(83, 140, 70)';
        };
        squares[i].onclick = function(){
            this.onclick = function(){};
            this.onmouseover = function(){};
            this.onmouseout = function(){};

            var position = this.id.match(/\d+/g);
            if(tableModel[position[0]][position[1]] == -1)
                lostGame(tableModel, squares);
            else{
                opened += reveal(tableModel, squares, position[0], position[1]);

                if(opened == max)
                    wonGame(tableModel, squares);
            }
        };
    }


}

//-------------------------------------------------------------------------------

function reveal(table, squares, row, col){
    if(table[row][col] != 0){
        squares[row*numOfSquares + parseInt(col)].innerHTML = table[row][col];
        table[row][col] = '.';
        disableSquare(squares[row*numOfSquares + parseInt(col)]);
        return 1;
    }
    else{
        return revealZeros(table, squares, row, col);
    }
}

function revealZeros(table, squares, row, col){
    row = parseInt(row);
    col = parseInt(col);
    var opened= 0;
    table[row][col] = '.';
    opened++;
    disableSquare(squares[row*numOfSquares + parseInt(col)]);

    if(row-1 >= 0 && table[row-1][col] != '.'){ //up
		if(table[row-1][col] == 0)
			opened += revealZeros(table, squares, row-1, col);
		else
            opened += reveal(table, squares, row-1, col);
	}

	if(col+1 < numOfSquares && table[row][col+1] != '.'){//right
		if(table[row][col+1] == 0)
			opened+= revealZeros(table, squares, row, col+1);
		else
        opened += reveal(table, squares, row, col + 1);
	}
	
	if(row+1 < numOfSquares && table[row+1][col] != '.')//down
	{
		if(table[row+1][col] == 0)
			opened+= revealZeros(table, squares, row+1, col);
		else
            opened += reveal(table, squares, row+1, col);
	}
	
	if(col-1 >= 0 && table[row][col-1] != '.')//left
	{
		if(table[row][col-1] == 0)
			opened += revealZeros(table, squares, row, col-1);
		else
            opened += reveal(table, squares, row, col - 1);
	}
    
    //the four diagonals
    if(row-1 >= 0 && col-1 >= 0 && table[row-1][col-1] != '.'){
        if(table[row-1][col-1] == 0)
		    opened+= revealZeros(table, squares, row-1, col-1);
		else
            opened += reveal(table, squares, row-1, col-1);
    }

    if(row-1 >= 0 && col+1 < numOfSquares && table[row-1][col+1] != '.'){
        if(table[row-1][col+1] == 0)
			opened += revealZeros(table, squares, row-1, col+1);
		else
            opened += reveal(table, squares, row-1, col+1);
    }

    if(row+1 < numOfSquares && col+1 < numOfSquares && table[row+1][col+1] != '.'){
        if(table[row+1][col+1] == 0)
			opened+= revealZeros(table, squares, row+1, col+1);
		else
            opened += reveal(table, squares, row+1, col+1);
    }

    if(row+1 < numOfSquares && col-1 >= 0 && table[row+1][col-1] != '.'){
        if(table[row+1][col-1] == 0)
			opened += revealZeros(table, squares, row+1, col-1);
		else
            opened += reveal(table, squares, row+1, col-1);
    }

	return opened;
}

//-------------------------------------------------------------------------------

function disableSquare(element){
    element.onclick = function(){};
    element.onmouseover = function(){};
    element.onmouseout = function(){};
    element.style.backgroundColor = 'rgb(44, 94, 52)';
}

function wonGame(table, squares){
    stopCounter();
    for(var i = 0; i < numOfSquares*numOfSquares; i++){
        var position = squares[i].id.match(/\d+/g);
        squares[i].style.backgroundColor = 'rgb(44, 94, 52)';
        if(table[position[0]][position[1]] == -1){
            squares[i].onclick = function(){};
            squares[i].onmouseover = function(){};
            squares[i].onmouseout = function(){};
            squares[i].style.backgroundImage = 'url(../assets/star.png)';
        }
        else{
            squares[i].onclick = function(){};
            squares[i].onmouseover = function(){};
            squares[i].onmouseout = function(){};
            squares[i].innerHTML = '';
        }
    }
    info.innerHTML = 'You Won!';
    startConfetti(2000, 500, 500);
}

function lostGame(table, squares){
    stopCounter();
    for(var i = 0; i < numOfSquares*numOfSquares; i++){
        var position = squares[i].id.match(/\d+/g);

        squares[i].style.backgroundColor = 'rgb(44, 94, 52)';
        if(table[position[0]][position[1]] == -1){
            squares[i].onclick = function(){};
            squares[i].onmouseover = function(){};
            squares[i].onmouseout = function(){};
            squares[i].style.backgroundImage = 'url(../assets/bomb.png)';
        }
        else{
            squares[i].onclick = function(){};
            squares[i].onmouseover = function(){};
            squares[i].onmouseout = function(){};
            squares[i].innerHTML = '';
            info.innerHTML = 'You Lost!';
        }
    }
}

function createTableModel(table, boardSize){
    var taken = 0;
    for(var row = 0; row < boardSize; row++)
    {
        table[row] = [];
        for(var col = 0; col < boardSize; col++)
        {
            table[row][col] = 0;
        }
    }

    for(var row = 0; row < boardSize; row++)
    {
        for(var col = 0; col < boardSize; col++)
        {
            if(Math.random()*100 <= minePercent)
            {
                table[row][col] = -1;
                incrementSurroundingSquares(table, row, col);
                taken++;
            }
        }
    }

    gameCounters.querySelector("#bombCounter").innerHTML = taken;
    return taken;
}

function incrementSurroundingSquares(arr, row, col){
    var left, right;
	left = (col - 1 >= 0);
	if(left && arr[row][col-1] >= 0){arr[row][col-1]++;}
				
	right = (col + 1 < arr[row].length);
	if(right && arr[row][col+1] >= 0){arr[row][col+1]++;}
				
	if(row-1 >= 0)
	{
		if(arr[row-1][col] >= 0){arr[row-1][col]++;}
					
		if(left && arr[row-1][col-1] >= 0)
		{
			arr[row-1][col-1]++;
		}
					
		if(right && arr[row-1][col+1] >= 0)
		{
			arr[row-1][col+1]++;
		}
	}
				
	if(row+1 < arr.length)
	{
		if(arr[row+1][col] >= 0){arr[row+1][col]++;}
					
		if(left && arr[row+1][col-1] >= 0)
		{
			arr[row+1][col-1]++;
		}
					
		if(right && arr[row+1][col+1] >= 0)
		{
			arr[row+1][col+1]++;
		}
	}
}

function buildTemplate(){
    var s = "";
    for(var i = 0; i < numOfSquares - 1; i++){
        s += (sizeOfSquare + "px ");
    }
    s += (sizeOfSquare + "px");
    return s;
}

function reset(){
    //puts the buttons back in place
    //removes the reset button
    resetButton.style.display = 'none';
    gameCounters.style.display = 'none';
    startButton.style.display = 'inline';
    selection.style.display = 'inline';
    stopCounter();

    //cleans the log
    info.innerHTML = '';

    //cleans the table
    boardDiv.innerHTML = '';
    
    //selection = document.getElementById('drop');
    console.log(selection.value);
    switch(selection.value){
        case 'Easy':
            initEasy();
            break;
        case 'Medium':
            initMedium();
            break;
        case 'Hard':
            initHard();
            break;
    }
    drawBoard();
}







