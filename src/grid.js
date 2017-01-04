var adjacentAliveCells = require('./adjacentAliveCells');

var createTable = function(rows, columns){
	var table = [];
	for (var i = 0; i < rows; i++) {
		table[i] = [];
		for (var j = 0; j < columns; j++) {	
			table[i][j] = 'D';	
		}
	}
	return table;
}

var Grid = function(rows, columns){
	this.rows = rows;
	this.columns = columns;
	this.table = createTable(this.rows, this.columns);
}

Grid.prototype = {
	setCellAsAlive:function(rowId, columnId){
		this.table[rowId][columnId] = 'A';
	},

	rule:function(row,column,aliveCells, newTable){
		if(aliveCells==2 || aliveCells==3){
			if(aliveCells == 3 && this.table[row][column] == 'D'){
				newTable[row][column] ='A';
			}
			else
				newTable[row][column] = this.table[row][column];	
		}
	},

	getTable:function(){
		return this.table;
	},

	nextGeneration:function(){
		var newTable = createTable(this.rows, this.columns);
		for (var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.columns; j++) {
				var count = adjacentAliveCells(this.table, i,j).length;
				this.rule(i,j,count, newTable);
			}
		}
		this.table = newTable;
		return this;
	}
};

module.exports = Grid;