

Cell = function(red, green, blue){
	this.red = red; // 0-255
	this.green = green; // 0-255
	this.blue = blue; // 0-255
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


ColorBoard = function(){
	this.board = [];

	for (var i = 0; i < 100; i++){
		this.board[i] = new Array();
		for (var j = 0; j < 100; j++){
			//this. board[i][j] = new Cell(255, 0, 0);
			if (j == 0) {this.board[i][j] = new Cell(255,0,0);}
			else { this.board[i][j] = new Cell(255, 255, 255);}	
		}
	}
}

ColorBoard.prototype.iterate = function(k, board){
	//var divCount = 10;
	for (var i = 0; i < 100; i++){
		for (var j = 99; j > 0; j--){
			var new_red = k + 5;
			var new_blue = k/5;
			var new_green = k/7;
			this.board[i][j].updateColors(this.board[i][j-1].getRed() -5, this.board[i][j-1].getGreen(),this.board[i][j-1].getBlue()+5);
			$('div#' + i.toString() + "r" + j.toString()).css("background-color", "rgb(" + this.board[i][j].getRed() + "," +this.board[i][j].getGreen() + "," +this.board[i][j].getBlue() +")");
			//divCount++;
		}
	}
	console.log(k);
	setTimeout(function(){board.iterate(k + 10, board)}, 5)

	//for (var p = 0; p < $('div.cell').length; p++){
		//$("div.cell")[p].css("background-color", "rgb(" +  + "," +  + "," +  + ")");
		//$('div.cell').css("background-color", "red");
	//}

	console.log("Finished iterating");
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
	var left_offset = 400;
	var top_offset = 75;
	document.write("<div>");
	for (var i = 0; i < 100; i++){
		left_offset = 400;
		for (var j = 0; j < 100; j++){
			document.write("<div id=\"" + i.toString() + "r" + j.toString() + "\" class=\"cell\" style=\"background-color:rgb("+ this.board[i][j].getRed() + "," + 
				this.board[i][j].getGreen() + "," + this.board[i][j].getBlue() + "); top:"+
				top_offset +"px; left: " + left_offset + "px;\"></div>");
			left_offset += 5;
			//divCount++;
		}
		top_offset += 5;
	}
	document.write("</div>");
	console.log("Finished drawing");
}

var test = new ColorBoard();
test.draw();
setTimeout(function(){test.iterate(10, test);}, 1000);
//setTimeout(function(){test.draw()}, 3000);
//setTimeout(function(){test.iterate()}, 2000);
//setTimeout(function(){test.draw()}, 3000);


//setInterval(function(){test.iterate(); setTimeout(test.draw(), 2000);}, 4000)
//test.draw();

