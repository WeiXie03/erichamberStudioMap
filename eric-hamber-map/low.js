var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0xFDDCA6});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

// create a texture from an image path
var texture = PIXI.Texture.fromImage('./floorplan/erichamberLevelLow.jpg');

// create a new Sprite using the texture
var levelLow = new PIXI.Sprite(texture);

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

levelLow.interactive = true;
levelLow.on('mousedown', onDown);
levelLow.on('touchstart', onDown);

var added = false;
function onDown (eventData) {
	if(!added){
		addRects(stage);
		added = true;
	}
	console.log((renderer.plugins.interaction.mouse.global.x-levelLow.position.x)/levelLow.width);
	console.log((renderer.plugins.interaction.mouse.global.y-levelLow.position.y)/levelLow.height);
	console.log(renderer.plugins.interaction.mouse.global.x);
	console.log(renderer.plugins.interaction.mouse.global.y);
}

levelLow.scale.x = 0.25;
levelLow.scale.y = 0.25;

// center the sprite's anchor point
levelLow.anchor.x = 0.5;
levelLow.anchor.y = 0.5;

// move the sprite to the center of the screen
levelLow.position.x = renderer.width/2;
levelLow.position.y = renderer.height/2;

stage.addChild(levelLow);
renderer.render(stage);

var buttons = [];
var rects = [];

var techTunnel = [-0.13095238095238096,-0.3075030750307503,0.5615079365079365,0.04428044280442804,'./rooms/techTunnel.jpeg',"All the rooms connected to this hallway are tech rooms."];
var room142 = [0.2361111111111111,-0.44526445264452646,0.19444444444444445,0.13776137761377613,"./rooms/room142.jpg","This electronics lab is located at the end of the 'Tech Tunnel', where the exit door is. Vex robotics club is located in this room."];
var roomL127 = [0.19246031746031747,-0.24600246002460024,0.23809523809523808,0.10824108241082411,,"This is the multipurpose room located at the end of the 'Tech Tunnel'"];
var room135 = [-0.4603174603174603,-0.3075030750307503,0.07142857142857142,0.13284132841328414,,"This classroom is located near the exit that leads to the outdoor sports areas."];
var room131 = [-0.4583333333333333,-0.07380073800738007,0.06944444444444445,0.13038130381303814,,"This classroom is located near one of the main staircases that connects all the floors."]
var room134 = [-0.4603174603174603,-0.44526445264452646,0.07539682539682539,0.09348093480934809,,"This classroom is directly next to an exit."];
var auditorium = [-0.3392857142857143,-0.30996309963099633,0.1488095238095238,0.2829028290282903,,"The auditorium is where formal announcements are held. It can be accessed through its side doors on the lower first floor and the auditorium 'lobby' halfway between the second and first floor of the middle two main staircases."];
var room147 = [-0.14087301587301587,-0.24600246002460024,0.16071428571428573,0.10824108241082411,,"This is the drafting room, which is filled with school computers, and where Mr. Halim teaches various courses, including Studio Tech and Innovation 8."];
var room140 = [-0.14087301587301587,-0.13776137761377613,0.06746031746031746,0.06150061500615006,,"Mr. Cho teaches in this room."];
var room139 = [-0.14087301587301587,-0.0024600246002460025,0.06746031746031746,0.05904059040590406,,"This classroom is located near a main staircase."];
var room139B = [-0.14087301587301587,-0.07134071340713408,0.06547619047619048,0.06642066420664207,,"This room is in between room 140 and 139."];
var newMusic = [0.017857142857142856,-0.02706027060270603,0.1746031746031746,0.08364083640836409,,"This 'mini-loby' leads to the band room that Mr. Francis teaches in, the choir room and the office for the two teachers."];
var room144 = [-0.14484126984126985,-0.44526445264452646,0.21428571428571427,0.13776137761377613,,"This is the woodworking room where Mr. Yu teaches students how to use wood to make things."];
var roomL120 = [0.057539682539682536,-0.13776137761377613,0.501984126984127,0.11316113161131611,,"This is the band room, where Mr. Francis teaches and conducts band."];

rects.push(newMusic,room144,techTunnel,room142,roomL127,auditorium,room147,room139,
room140,room134,room131,room135,roomL120)

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
					rect[0]*levelLow.width+levelLow.position.x, 
					rect[1]*levelLow.height+levelLow.position.y, 
					rect[2]*levelLow.width, 
					rect[3]*levelLow.height);
	graphics.hitArea = new PIXI.Rectangle(
					rect[0]*levelLow.width+levelLow.position.x, 
					rect[1]*levelLow.height+levelLow.position.y, 
					rect[2]*levelLow.width, 
					rect[3]*levelLow.height);
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