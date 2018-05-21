//as soon as the window loads,
//run the init() function to start everything

window.onload = init();

function init()
{
	c = document.getElementById('grid');
	ctx = c.getContext('2d');

	var tilesize = 50; //dimension of square tile
	//these arrays will be useful for creating randomy placed objects
	var arrayX = [0,1,2,3,4,5,6,7,8,9];
	var arrayY = [0,1,2,3,4,5,6,7,8,9];

	//set the size of the grid
	c.width=tilesize*arrayX.length + 1;
	c.height=tilesize*arrayY.length + 1;

	//set the speed of the game
	var time = 50;
	var x=5, y=5; //Player start position
	var doorHit = false; //player has not escaped

	//for key presses
	var Lpress = false;
	var Rpress = false;
	var Upress = false;
	var Dpress = false;
	//Handle keyboard controls

	var keysDown ={};

	addEventListener("keydown", function (e){
		keysDown[e.keyCode] = true;
	}, false);

	addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
		Lpress = false;
		Rpress = false;
		Upress = false;
		Dpress = false;
	}, false);

	//load tile images
	/*var grassReady = false;
	var grassImage = new Image();
	grassImage.onload = function()
	{
		grassReady = true;
	};
	grassImage.src = "pix/grass.png";*/

	//write functions to draw all the different tiles (and the player)
	function wall(x3,y3)//1 wall
	{
		ctx.fillStyle = "#6495ED";
		ctx.fillRect(x3*tilesize, y3*tilesize, tilesize, tilesize);
	}
	
	function door(x3,y3)//2 door
	{
		ctx.fillStyle = "#7FFFD4";
		ctx.fillRect(x3*tilesize, y3*tilesize, tilesize, tilesize);
	}
	
	function block(x1,y1)//0 grass
	{
		ctx.fillStyle = "#ADD8E6";
		ctx.fillRect(x1*tilesize, y1*tilesize, tilesize, tilesize);
	}
	
	function player1(x2,y2)//blue ball
	{
		ctx.fillStyle = "	#00FFFF";
		ctx.fillRect(x2*tilesize, y2*tilesize, tilesize, tilesize);
	}
	
	function coin(x,y2)//blue ball
	{
		ctx.fillStyle = "blue";
		ctx.fillRect(x2*tilesize, y2*tilesize, tilesize, tilesize);
	}
	

	//create a pre-defined level using a double array,
	//where numbers represent different tiles
	var gridArray = [

		[1,1,1,1,1,1,1,1,1,1],
		[1,1,0,0,0,1,1,1,1,1],
		[1,1,0,1,0,1,0,0,0,1],
		[1,0,0,1,0,0,0,1,0,1],
		[1,0,1,1,1,1,1,1,0,1],
		[1,0,0,0,1,0,0,0,0,1],
		[1,0,1,0,1,1,1,0,1,1],
		[1,0,1,0,0,1,0,0,0,1],
		[1,0,0,1,0,1,1,0,1,1],
		[1,1,1,1,2,1,1,1,1,1]
		
	];



	//draw box over everything
	function clear()
	{
		ctx.clearRect(0, 0, c.width, c.height);
	}

	//Loop through the grid array and check the value of each element
	//Depending on value, put correct tile
	function drawGrid()
	{
		for(j=0; j<=arrayX.length-1; j++)
		{
			for(k=0; k<=arrayY.length-1; k++)
			{
				if(gridArray[j][k] == 0)//grass
				{
					block(j, k);
				}
				else if (gridArray[j][k] == 1)// wall
				{
					wall(j, k);
				}
				else if (gridArray[j][k] == 2)//doorHit
				{
					door(j, k);
				}
			}
		}
	}
	
	function drawPlayer()
	{
		player1(x, y);
	}
	
	//draw all the objects to the canvas
	function drawStuff()
	{
		drawGrid();
		drawPlayer();
		
		ctx.fillStyle = "blue";
		ctx.font = "30px Helvetica";
		if(doorHit)
		{
			ctx.fillText("You excaped!", 50, 40);
		}
	}
	
	function checkHit()
	{
		if(gridArray[x][y] == 2)
		{
			//player has arrived at the door
			doorHit = true;
		}
		else 
		{
			doorHit = false;
		}
	}
	
	function updateStuff()
	{
		if(37 in keysDown && gridArray[x-1][y] != 1)
		{
			x -= 1;
		}
		if(39 in keysDown && gridArray[x+1][y] != 1)
		{
			x += 1; 
		}
		if(38 in keysDown && gridArray[x][y-1] != 1)
		{
			y -= 1;
		}
		if(40 in keysDown && gridArray[x][y+1] != 1)
		{
			y += 1;
		}
		checkHit();
		
		
	}
	
	//this makes everything happen over time
	function GameLoop()
	{
		clear();
		updateStuff();
		drawStuff();
		setTimeout(GameLoop, time);
	}
	
	drawGrid();
	GameLoop();
	
};