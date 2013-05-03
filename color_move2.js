Cell = function(red, green, blue) {
	this.red = red; // 0-255
	this.green = green; // 0-255
	this.blue = blue; // 0-255
	this.alive = false;// all should be dead when board drawn
	this.new_alive = false;
}


Cell.prototype.updateColors = function(new_red, new_green, new_blue){
	this.red = new_red;
	this.green = new_green;
	this.blue = new_blue;
}

Cell.prototype.getRed = function(){
	return this.red;
}

Cell.prototype.getGreen = function(){
	return this.green;
}

Cell.prototype.getBlue = function(){
	return this.blue;
}

Cell.prototype.toggle = function() {
	// return a new Cell object
}

ColorBoard = function(){
	this.board = [];

	for (var i = 0; i < 60; i++){
		this.board[i] = [];
		for (var j = 0; j < 70; j++){
			this.board[i].push(new Cell(0, 0, 0));	
		}
	}
}

ColorBoard.prototype.getNeighbors = function(i,j){
	//Returns coordinates of all neighboring cells, in an array

	var neighbors = [];
	var adjacents = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];

	var addToIj = function(pair) {
		return [pair[0] + i, pair[1] + j];
	};

	///--------->neighbors = adjacents.map(addToIj);
	//console.log(neighbors);

	return adjacents.map(addToIj).map(getCellByPosition)
}

ColorBoard.prototype.checkAlive = function(alive, i, j) {
	//Return True <-> Cell is alive in next stage
	var self = this;
	var alive_neighbors = 0; // So we don't count the cell in question as a neighbor!

	var is_alive = new Boolean();

	for (var x = -1; x < 2; x++){   // Warning: this counts the cell in question as a neighbor!
		for (var y = -1; y < 2; y++){
			if (self.board[i + x][j + y].alive == true)
				alive_neighbors++;
		}
	}

	
	if ((alive_neighbors >= 3 && alive_neighbors <= 4) && alive == true){
		is_alive = true;
		    	
	} 
	else if (alive_neighbors == 3 && alive == false){
		is_alive = true;
	}
	return is_alive;
		    
	}

// returns a boolean - will this cell be alive?
ColorBoard.prototype.randomizedLife = function(fun,i,j){
	var alive = new Boolean()
}

ColorBoard.prototype.iterate = function(k){
	var self = this;
	
	for (var i = 1; i < 59; i++){
		for (var j = 1; j < 69; j++){
			if (self.checkAlive(self.board[i][j].alive, i, j) == true && self.board[i][j].alive == true){
				self.board[i][j].new_alive = true;
				self.board[i][j].updateColors(0, 255, 0);
			}
			else if (self.checkAlive(self.board[i][j].alive, i, j) == true && self.board[i][j].alive == false){
				self.board[i][j].updateColors(0, 0, 255);
				self.board[i][j].new_alive = true;
			}
			else if (self.board[i][j].alive == true){
				self.board[i][j].new_alive = false;
				self.board[i][j].updateColors(255, 0, 0);
			}
			else{
				;
			}
			
			self.updateCSS(i, j);
		}
	}

	//maintain a separate 'alive' status for the new configuration of the board.
	for (var i = 1; i < 59; i++){
		for (var j = 0; j < 69; j++){
			self.board[i][j].alive = self.board[i][j].new_alive;
		}
	}

	setTimeout(function(){self.iterate(k + 1)}, 50);
	console.log("Finished iterating");

}//Closes Iterate Func

ColorBoard.prototype.updateCSS = function(i,j){
	var self = this;
	$('div#' + i.toString() + "r" + j.toString()).css("background-color", "rgb(" + self.board[i][j].getRed() + "," +self.board[i][j].getGreen() + "," +self.board[i][j].getBlue() +")");

}

ColorBoard.prototype.draw = function(){
	var left_offset = 375;
	var top_offset = 75;
	document.write("<div id=\"main\">");
	
	for (var i = 0; i < 60; i++){
		left_offset = 375;
		for (var j = 0; j < 70; j++){
			document.write("<div id=\"" + i.toString() + "r" + j.toString() + "\" class=\"cell\" style=\"background-color:rgb(" + this.board[i][j].getRed() + "," + 
				this.board[i][j].getGreen() + "," + this.board[i][j].getBlue() + "); top:"+
				top_offset +"px; left: " + left_offset + "px;\"></div>");
			left_offset += 10;
		}
		top_offset += 10;
	}
	
	document.write("</div>");
	console.log("Finished drawing");
}

ColorBoard.prototype.addClickHandler = function(i, j){
	var self = this;
	$('div#' + i.toString() + "r" + j.toString()).click(function(){
				self.board[i][j].updateColors(0, 255, 0);
				console.log("you clicked a cell! " + i +" "+j)
				self.board[i][j].alive = true;
				console.log(self.board[i][j].alive)
				$('div#' + i.toString() + "r" + j.toString()).css("background-color", "rgb(" + self.board[i][j].getRed() + "," + self.board[i][j].getGreen() + "," + self.board[i][j].getBlue() +")");
			                    										});

}

ColorBoard.prototype.addDblClickHandler = function(i, j){
	var self = this;
	$('div#' + i.toString() + "r" + j.toString()).dblclick(function(){
				self.board[i][j].updateColors(0, 0, 0);
				self.board[i][j].alive = true;
				console.log("you clicked a cell! " + i +" "+j)
				console.log(self.board[i][j].alive)
				$('div#' + i.toString() + "r" + j.toString()).css("background-color", "rgb(" + self.board[i][j].getRed() + "," + self.board[i][j].getGreen() + "," + self.board[i][j].getBlue() +")");
			                    										});

}

ColorBoard.prototype.stateChange = function(){
	var self = this;
	for (var i = 0; i < 100; i++){
		for (var j = 0; j < 100; j++){
			self.addClickHandler(i, j);
			self.addDblClickHandler(i, j);
		}
	}
	console.log("stateChange finished executing")
}	
var test = new ColorBoard();
test.draw();
test.stateChange();

function counter() {
	var count = 0
	return {
		increment: function() {
			count++;
		},
		getCount: function() {
			return count;
		},
		setCount: function(value) {
			count = value;
		}
	}
}


