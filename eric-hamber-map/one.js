var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0xFDDCA6});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

// create a texture from an image path
var texture = PIXI.Texture.fromImage('./floorplan/erichamberlevel1.jpg');

// create a new Sprite using the texture
var level1 = new PIXI.Sprite(texture);

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

level1.interactive = true;
level1.on('mousedown', onDown);
level1.on('touchstart', onDown);

var added = false;
function onDown (eventData) {
	if(!added){
		addRects(stage);
		added = true;
	}
	console.log((renderer.plugins.interaction.mouse.global.x-level1.position.x)/level1.width);
	console.log((renderer.plugins.interaction.mouse.global.y-level1.position.y)/level1.height);
	console.log(renderer.plugins.interaction.mouse.global.x);
	console.log(renderer.plugins.interaction.mouse.global.y);
}

level1.scale.x = 0.25;
level1.scale.y = 0.25;

// center the sprite's anchor point
level1.anchor.x = 0.5;
level1.anchor.y = 0.5;

// move the sprite to the center of the screen
level1.position.x = renderer.width/2;
level1.position.y = renderer.height/2;

stage.addChild(level1);
renderer.render(stage);

var buttons = [];
var rects = [];

var library = [-0.4250681198910082,-0.025821596244131457,0.10717529518619437,0.4460093896713615,"./rooms/library.jpg","The library is a great place to find great books and a quiet space to work in. The library can be accessed through a staircase next to the drama studio or the through the courtyard."];
var room121and119 = [-0.3178928247048138,-0.028169014084507043,0.16893732970027248,0.056338028169014086,,"These classrooms are next to a staircase."];
var cafeteria = [-0.14895549500454133,0.07746478873239436,0.18710263396911897,0.14084507042253522,"http://s3.amazonaws.com/VisionNet/vancouver/location/4036/102377_l.jpg","The cafeteria is where students eat and sometimes events are held in the cafeteria."];
var room120 = [-0.31607629427792916,-0.12441314553990611,0.061762034514078114,0.05868544600938967,,"This classroom and lab is located beside a staircase. The teacher for this room is Mr. Geisler."];
var room167 = [0.06902815622161672,0.18544600938967137,0.043596730245231606,0.07511737089201878,,"This classroom is located in a short hallway connects the school to the parking lot."];
var room103and105B = [0.06721162579473206,-0.028169014084507043,0.20708446866485014,0.06338028169014084,,"These classrooms are located a staircase and opposite of the first floor science wing."];
var room102to106 = [0.03814713896457766,-0.12441314553990611,0.2161671207992734,0.05868544600938967,,"These classrooms are directly next to the entrance to the lower science wing."];
var lowSciWing = [0.254314259763851,-0.4460093896713615,0.09445958219800181,0.31690140845070425,"./rooms/lowsciwing.jpg","The lower 'science' wing contains a French classroom and a business classroom. The lower 'science' wing overlooks the atrium."];
var atriumOverlook = [0.12534059945504086,-0.22300469483568075,0.12897366030881016,0.046948356807511735,,"These rooms are over the atrium and the atrium can be seen from here."];

rects.push(library,room121and119,cafeteria,room120,room167,lowSciWing,room103and105B,
room102to106,atriumOverlook)

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
					rect[0]*level1.width+level1.position.x, 
					rect[1]*level1.height+level1.position.y, 
					rect[2]*level1.width, 
					rect[3]*level1.height);
	graphics.hitArea = new PIXI.Rectangle(
					rect[0]*level1.width+level1.position.x, 
					rect[1]*level1.height+level1.position.y, 
					rect[2]*level1.width, 
					rect[3]*level1.height);
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