

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
			//this.board[i][j] = new Cell(255, 255, 255);
			//var my_red = Math.random()*256;
			//var my_blue = Math.random()*256;
			//var my_green = Math.random()*256;
			//this. board[i][j] = new Cell(my_red, my_green, my_blue);
			if (i < 49)  {this.board[i][j] = new Cell(255,0,0);}
			else if (j < 49) {this.board[i][j] = new Cell(0,0,255);}
			else {this.board[i][j] = new Cell(0, 255, 0);}	
		}
	}
}

ColorBoard.prototype.iterate = function(k){
	//var divCount = 10;
	var self = this;
	for (var i = 1; i < 99; i++){
		for (var j = 98; j > 1; j--){
			
			//	debugger;
			var new_red = Math.round(this.board[i-1][j].getRed() + this.board[i-1][j+1].getRed() + this.board[i-1][j-1].getRed())/3;
			var new_green = Math.round(this.board[i-1][j-1].getGreen() + this.board[i+1][j-1].getGreen() + this.board[i][j-1].getGreen())/3;
			var new_blue = Math.round(this.board[i][j+1].getBlue() + this.board[i-1][j+1].getBlue() + this.board[i+1][j+1].getBlue())/3;
			//var new_red = (k*k*(Math.round(this.board[i][j-1].getRed() + this.board[i][j+1].getRed()+ this.board[i+1][j].getRed()+this.board[i-1][j].getRed() +this.board[i+1][j-1].getRed() + this.board[i-1][j-1].getRed() + this.board[i+1][j+1].getRed() + this.board[i-1][j+1].getRed())/8))%255;
			//var new_green = (k*(Math.round(this.board[i][j-1].getGreen() + this.board[i][j+1].getGreen() + this.board[i+1][j].getGreen()+this.board[i-1][j].getGreen() +this.board[i+1][j-1].getGreen() + this.board[i-1][j-1].getGreen() + this.board[i+1][j+1].getGreen() + this.board[i-1][j+1].getGreen())/8))%255;
			//var new_blue = (7*k*(Math.round(this.board[i][j-1].getBlue() + this.board[i][j+1].getBlue() + this.board[i+1][j].getBlue()+this.board[i-1][j].getBlue() + this.board[i+1][j-1].getBlue() + this.board[i-1][j-1].getBlue() + this.board[i+1][j+1].getBlue() + this.board[i-1][j+1].getBlue())/8))%255;
			this.board[i][j].updateColors(new_red, new_green, new_blue);
			$('div#' + i.toString() + "r" + j.toString()).css("background-color", "rgb(" + this.board[i][j].getRed() + "," +this.board[i][j].getGreen() + "," +this.board[i][j].getBlue() +")");
			//divCount++;
		}
	}
	setTimeout(function(){self.iterate(k + 1)}, 5);

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
	document.write("<div id=\"main\">");
	
	for (var i = 0; i < 100; i++){
		left_offset = 400;
		for (var j = 0; j < 100; j++){
			document.write("<div id=\"" + i.toString() + "r" + j.toString() + "\" class=\"cell\" style=\"background-color:rgb(" + this.board[i][j].getRed() + "," + 
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

ColorBoard.prototype.addClickHandler = function(i, j){
	var self = this;
	$('div#' + i.toString() + "r" + j.toString()).click(function(){
				self.board[i][j].updateColors(0, 0, 255);
				console.log("you clicked a cell! " + i +" "+j)
				$('div#' + i.toString() + "r" + j.toString()).css("background-color", "rgb(" + self.board[i][j].getRed() + "," + self.board[i][j].getGreen() + "," + self.board[i][j].getBlue() +")");
			                    										});

}

ColorBoard.prototype.addDblClickHandler = function(i, j){
	var self = this;
	$('div#' + i.toString() + "r" + j.toString()).dblclick(function(){
				self.board[i][j].updateColors(0, 255, 0);
				console.log("you clicked a cell! " + i +" "+j)
				$('div#' + i.toString() + "r" + j.toString()).css("background-color", "rgb(" + self.board[i][j].getRed() + "," + self.board[i][j].getGreen() + "," + self.board[i][j].getBlue() +")");
			                    										});

}

ColorBoard.prototype.stateChange = function(){
	var self = this;
	for (var i = 0; i < 99; i++){
		for (var j = 0; j < 99; j++){
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

