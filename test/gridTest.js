var assert = require('assert');
var Grid = require('../src/grid.js');

describe('grid',function(){
	
	describe('next generation',function(){
		
		it('should return next generation for a 1*1 grid',function(){
			var grid = new Grid(1,1);
			grid.setCellAsAlive(0,0);

			var tableOfGrid = grid.nextGeneration();
			var expectedGrid = new Grid(1,1);

			assert.deepEqual(expectedGrid, grid);
		});

		it('should return next generation for a 2*2 grid',function(){
			var grid = new Grid(2,2);
			grid.setCellAsAlive(0,1);
			grid.setCellAsAlive(1,1);

			var tableOfGrid = grid.nextGeneration();
			var expectedGrid = new Grid(2,2);

			assert.deepEqual(expectedGrid, grid);
		});

		describe('generate a 3*3 grid',function(){
			//Setup==================================
			var grid = new Grid(3,3);
			grid.setCellAsAlive(0,1);
			grid.setCellAsAlive(1,1);
			grid.setCellAsAlive(2,1);

			//Tests===================================

			it('should return next generation',function(){
				grid.nextGeneration();

				var expectedGrid = new Grid(3,3);
				expectedGrid.setCellAsAlive(1,0);
				expectedGrid.setCellAsAlive(1,1);
				expectedGrid.setCellAsAlive(1,2);

				assert.deepEqual(expectedGrid, grid);
			});

			it('third generation of grid should be same as initial',function(){
				grid.nextGeneration();

				var expectedGrid = new Grid(3,3);
				expectedGrid.setCellAsAlive(0,1);
				expectedGrid.setCellAsAlive(1,1);
				expectedGrid.setCellAsAlive(2,1);

				assert.deepEqual(expectedGrid, grid);
			});
		});

		describe('generate a 4*4 grid',function(){
			var grid;
			beforeEach(function(){
				grid = new Grid(4,4);

				grid.setCellAsAlive(1,1);
				grid.setCellAsAlive(1,2);
				grid.setCellAsAlive(2,0);
				grid.setCellAsAlive(2,1);
				grid.setCellAsAlive(2,2);
				grid.setCellAsAlive(3,2);
			});
			

			it('should return first generation of given grid',function(){
				grid.nextGeneration();

				var expectedGrid = new Grid(4,4);
				expectedGrid.setCellAsAlive(1,0);
				expectedGrid.setCellAsAlive(1,2);
				expectedGrid.setCellAsAlive(2,0);
				expectedGrid.setCellAsAlive(2,3);
				expectedGrid.setCellAsAlive(3,2); 

				assert.deepEqual(expectedGrid,grid);
			});

			it('should return second generation for given grid',function(){
				var generation = grid.nextGeneration();
				var newGen = generation.nextGeneration();

				var expectedGrid = new Grid(4,4);
				expectedGrid.setCellAsAlive(1,1);
				expectedGrid.setCellAsAlive(2,2);
				expectedGrid.setCellAsAlive(2,3);

				assert.deepEqual(expectedGrid, grid);
			});

			it('All cells should be dead in eight th generation',function(){
				var grid = new Grid(4,4);

				for (var i = 0; i < 8; i++) {
					grid = grid.nextGeneration();
				}

				var expectedGrid = new Grid(4,4);

				assert.deepEqual(expectedGrid,grid);
			});
		});
	});

	describe('rule',function(){
		it('should set all A to D for a 1*1 grid',function(){
			var grid = new Grid(1,1);
			grid.setCellAsAlive(0,0);

			var newTable = [['D']];
			grid.rule(0,0,newTable);
		});
	});
});