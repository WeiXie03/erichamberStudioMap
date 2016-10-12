var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0xFDDCA6});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

// create a texture from an image path
var texture = PIXI.Texture.fromImage('./floorplan/erichamberLevel3.jpg');

// create a new Sprite using the texture
var level3 = new PIXI.Sprite(texture);

// the image where we show them the rooms
var roomImage = document.getElementById("imagepreview");
var roomModal = document.getElementById("myModal")

//text for each modal
var roomText = document.getElementById("textpreview");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    roomModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == roomModal) {
        roomModal.style.display = "none";
    }
}

level3.interactive = true;
level3.on('mousedown', onDown);
level3.on('touchstart', onDown);

var added = false;
function onDown (eventData) {
	if(!added){
		addRects(stage);
		added = true;
	}
}

level3.scale.x = 0.25;
level3.scale.y = 0.25;

// center the sprite's anchor point
level3.anchor.x = 0.5;
level3.anchor.y = 0.5;

// move the sprite to the center of the screen
level3.position.x = renderer.width/2;
level3.position.y = renderer.height/2;

stage.addChild(level3);
renderer.render(stage);

var buttons = [];
var rects = [];

var room323 = [-0.33882783882783885,-0.2889733840304182,0.06043956043956044,0.053231939163498096,,"This is Mr. Vatta's classroom. It is directly beside a staircase."];
var room351 = [-0.3772893772893773,-0.2332065906210393,0.0989010989010989,0.06590621039290241,,'This lab, along with room 352, are on the lower 3rd floor, which is half-way between second and third floor.'];
var room352 = [-0.3772893772893773,-0.16730038022813687,0.0989010989010989,0.07351077313054499,,'This lab, along with room 351, are on the lower 3rd floor, which is half-way between second and third floor.'];
var room321to303 = [-0.2783882783882784,-0.2889733840304182,0.6501831501831502,0.053231939163498096,,"These classrooms are next to Mr. Vatta's classroom, which is directly beside a staircase."];
var room320to316 = [-0.30036630036630035,-0.4131812420785805,0.19047619047619047,0.05576679340937896,,'These classrooms are located near 2 staircases and the girls washroom.'];
var room300 = [0.36996336996337,-0.4157160963244613,0.06776556776556776,0.058301647655259824,,"This classroom is located directly next to the staircase opposite of the one that is directly beside Mr. Vatta's classroom."];
var room371 = [-0.3772893772893773,-0.0076045627376425855,0.04212454212454213,0.14955640050697086,,"This is the guidance room. It is located in a staircase section directly next to the consellors."];
var counsellors = [-0.4358974358974359,-0.032953105196451206,0.040293040293040296,0.27122940430925224,,"This is where all the counselling is. This room faces the lower third floor hall."];
var room308to302 = [0.13736263736263737,-0.4157160963244613,0.0641025641025641,0.060836501901140684,,"These classrooms are located near two staircases and the boys washroom."];
var room301 = [0.3717948717948718,-0.29404309252217997,0.0641025641025641,0.05576679340937896,,"This classroom is directly next to the staircase opposite of the staircase that is directly next to Mr. Vatta's classroom."];

rects.push(room323,room351,room352,room321to303,room320to316,room300,room371,counsellors,room308to302,room301)

function addRects(contain){
	for(i = 0; i < rects.length; i++){
		var graphics = new PIXI.Graphics();
		drawButton(graphics,rects[i]);
//drawButton(graphics,rects[0]);
		contain.addChild(graphics);
		graphics.interactive = true;
		graphics.on('mouseover', onButtonOver)
				.on('mouseout', onButtonOut)
				.on('click', onButtonClick);
		buttons.push(graphics);
	}
}
function drawButton(graphics, rect){
	graphics.lineStyle(2, 0x0070FF, 0.95);
	graphics.drawRect(
					rect[0]*level3.width+level3.position.x, 
					rect[1]*level3.height+level3.position.y, 
					rect[2]*level3.width, 
					rect[3]*level3.height);
	graphics.hitArea = new PIXI.Rectangle(
					rect[0]*level3.width+level3.position.x, 
					rect[1]*level3.height+level3.position.y, 
					rect[2]*level3.width, 
					rect[3]*level3.height);
	graphics.alpha = 0.3;
	
	// added a new path variable to the rectangles to identify the image path
	// gets used in onButtonClick
	graphics.mypath = rect[4];
	graphics.mytext = rect[5];
}

function onButtonOver()
{
    this.isOver = true;
    this.alpha = 1;
}

function onButtonOut()
{
    this.isOver = false;
    this.alpha = 0.3;
}

function onButtonClick()
{
	roomModal.style.display = "block"
	roomImage.src = this.mypath;
	roomText.innerHTML = this.mytext;
}

// start animating
animate();
var drew = false;
function animate() {
    requestAnimationFrame(animate);

    // just for fun, let's rotate mr rabbit a little

    // render the container
    renderer.render(stage);
	
}