

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
			//this. board[i][j] = new Cell(my_red, my_green, my_blue);
			//if (i < 49)  {this.board[i][j] = new Cell(255,0,0);}
			//else if (j < 49) {this.board[i][j] = new Cell(0,0,255);}
			//else {this.board[i][j] = new Cell(0, 255, 0);}	
		}
	}
}

ColorBoard.prototype.getCellByPosition = function(i, j) {
	// return Cell
}

Cell.prototype.isBoundary = function(board) {

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


Cell.prototype.isAlive = function() {

}

Cell.prototype.isDead = function() {

}

Cell.prototype.getNeighbors = function() {

}



ColorBoard.prototype.checkAlive = function(alive, i, j) {
	//Return True <-> Cell is alive in next stage
	var self = this;
	var alive_neighbors = 0; // So we don't count the cell in question as a neighbor!

	var is_alive = new Boolean();

	for (var x = -1; x < 2; x++){   // Warning: this counts the cell in question as a neighbor!
		for (var y = -1; y < 2; y++){
			//console.log(i+x);
			//console.log(j+y);
			if (self.board[i + x][j + y].alive == true)
				alive_neighbors++;
		}
	}

	//Check how many of the neighbors are alive
	
	//-------> neighbors.map(alive_getter).reduce(sum,)
	// for (var k = 0; k < neighbors.length; k++){
	// 			if (self.board[neighbors[k][0]][neighbors[k][1]].alive == true)
	// 				alive_neighbors++;
	// 		}
		    

	// If state == alive & alive_neighbors is in {2,3} => Alive; if state == dead & alive_neighbors = 3 => ALIVE! else dead
	//living test
	//debugger;
		    if ((alive_neighbors >= 3 && alive_neighbors <= 4) && alive == true){
		    	is_alive = true;
		    	
		    } 
		    else if (alive_neighbors == 3 && alive == false){
		    	is_alive = true;
		    }
		    return is_alive;
		    
	}

ColorBoard.prototype.iterate = function(k){
	var self = this;
	//var alive_neighbors = 0;
	//var red_count = 0;
	//var blue_count =0;
	//var green_count = 0;

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
			/*
			//debugger;
			var neighbors = self.getNeighbors(i, j);

		    //Color assignment test
		    if(self.board[i][j].alive == true) {

		    	//Count the number of red, green and blue neighbors
		    	for(var k = 0; k < neighbors.length; k++){
		    		if (self.board[neighbors[k][0]][neighbors[k][1]].red > 0 && self.board[neighbors[k][0]][neighbors[k][1]].blue == 0 && self.board[neighbors[k][0]][neighbors[k][1]].green == 0){
		    			red_count++;
		    		} else if (self.board[neighbors[k][0]][neighbors[k][1]].red == 0 && self.board[neighbors[k][0]][neighbors[k][1]].blue == 0 && self.board[neighbors[k][0]][neighbors[k][1]].green > 0){
		    			green_count++;
		    		} else {blue_count++;}
		    	}

		    	//Determine which color the current cell in the iteration should reflect
		   		 if(red_count > blue_count && red_count > green_count) {
		    		self.board[i][j].updateColors(255, 0, 0);
		  		  } else if (blue_count > green_count && blue_count > red_count) {
		    		self.board[i][j].updateColors(0,0,255);
		  		  } else {
		  		  	self.board[i][j].updateColors(0,255,0)
		  		  }

		  	self.updateCSS(i,j);
		  	}

			alive_neighbors = 0;

			//var new_red = Math.round(this.board[i-1][j].getRed() + this.board[i-1][j+1].getRed() + this.board[i-1][j-1].getRed())/3;
			//var new_green = Math.round(this.board[i-1][j-1].getGreen() + this.board[i+1][j-1].getGreen() + this.board[i][j-1].getGreen())/3;
			//var new_blue = Math.round(this.board[i][j+1].getBlue() + this.board[i-1][j+1].getBlue() + this.board[i+1][j+1].getBlue())/3;

			// checking each cell for neighbors that have a) active b) R, B, G (Note: we do not check the outermost border to avoid out-of-bounds errors)

			//determine what color cell should be (if dominant exists)

			//var new_red = (k*k*(Math.round(this.board[i][j-1].getRed() + this.board[i][j+1].getRed()+ this.board[i+1][j].getRed()+this.board[i-1][j].getRed() +this.board[i+1][j-1].getRed() + this.board[i-1][j-1].getRed() + this.board[i+1][j+1].getRed() + this.board[i-1][j+1].getRed())/8))%255;
			//var new_green = (k*(Math.round(this.board[i][j-1].getGreen() + this.board[i][j+1].getGreen() + this.board[i+1][j].getGreen()+this.board[i-1][j].getGreen() +this.board[i+1][j-1].getGreen() + this.board[i-1][j-1].getGreen() + this.board[i+1][j+1].getGreen() + this.board[i-1][j+1].getGreen())/8))%255;
			//var new_blue = (7*k*(Math.round(this.board[i][j-1].getBlue() + this.board[i][j+1].getBlue() + this.board[i+1][j].getBlue()+this.board[i-1][j].getBlue() + this.board[i+1][j-1].getBlue() + this.board[i-1][j-1].getBlue() + this.board[i+1][j+1].getBlue() + this.board[i-1][j+1].getBlue())/8))%255;
			//this.board[i][j].updateColors(new_red, new_green, new_blue);
			
			
		} // Inner For Loop
	} //Outer For Loop

*/



	//self.updateCSS(i,j);

	setTimeout(function(){self.iterate(k + 1)}, 50);
	console.log("Finished iterating");

}//Closes Iterate Func

ColorBoard.prototype.updateCSS = function(i,j){
	var self = this;
	$('div#' + i.toString() + "r" + j.toString()).css("background-color", "rgb(" + self.board[i][j].getRed() + "," +self.board[i][j].getGreen() + "," +self.board[i][j].getBlue() +")");

}
/*
ColorBoard.prototype.draw = function(){

	var left_offset = 400;
	var top_offset = 75;
	document.write("<div>");
	for (var i = 0; i < 10; i++){
		left_offset = 400;
		for (var j = 0; j < 10; j++){
			//debugger;
			document.write("<div style=\"background-color:rgb("+ this.board[i][j].getRed() + "," + 
				this.board[i][j].getBlue() + "," + this.board[i][j].getGreen() + "); top:"+
				top_offset +"px; left: " + left_offset + "px;\"></div>");
			left_offset += 50;
		}
		top_offset += 50;
	}
	document.write("</div>");
	console.log("Finished drawing");
}
*/

ColorBoard.prototype.draw = function(){
	//var divCount = 10;
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
			//divCount++;
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
				self.board[i][j].updateColors(0, 255, 0);
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

//setTimeout(function(){test.iterate(10);}, 1000);
//setTimeout(function(){test.draw()}, 3000);
//setTimeout(function(){test.iterate()}, 2000);
//setTimeout(function(){test.draw()}, 3000);


//setInterval(function(){test.iterate(); setTimeout(test.draw(), 2000);}, 4000)
//test.draw();


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

var foo = function() {

};


