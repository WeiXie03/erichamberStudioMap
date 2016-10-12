var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0xFDDCA6});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

// create a texture from an image path
var texture = PIXI.Texture.fromImage('./floorplan/erichamberLevelMain.jpg');

// create a new Sprite using the texture
var levelMain = new PIXI.Sprite(texture);

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

levelMain.interactive = true;
levelMain.on('mousedown', onDown);
levelMain.on('touchstart', onDown);

var added = false;
function onDown (eventData) {
	if(!added){
		addRects(stage);
		added = true;
	}
}

levelMain.scale.x = 0.25;
levelMain.scale.y = 0.25;

// center the sprite's anchor point
levelMain.anchor.x = 0.5;
levelMain.anchor.y = 0.5;

// move the sprite to the center of the screen
levelMain.position.x = renderer.width/2;
levelMain.position.y = renderer.height/2;

stage.addChild(levelMain);
renderer.render(stage);

var buttons = [];
var rects = [];

var room215 = [-0.3242258652094718,-0.06190476190476191,0.14389799635701275,0.04523809523809524, './rooms/room215', "This is the career centre."] //career centre
var mainGym = [-0.1785063752276867,0.23333333333333334,0.16029143897996356,0.22142857142857142, './rooms/gym1.jpg', "This is the main gym. The boy's gym and girl's gym are the same gym divided by a retractable wall."]
var scienceWing = [0.17486338797814208,-0.4738095238095238,0.0692167577413479,0.3238095238095238, './rooms/scienceWing', "The science wing is on the left of the East staircase if facing East."]
var room275 = [-0.39526411657559196,0.2357142857142857,0.03642987249544627,0.03214285714285714, './', "Studio Social Studies and Drama and Critical Thinking are taught in this room by Mr. Nicks."]
var office = [-0.18032786885245902,-0.0380952380952381,0.06375227686703097,0.16904761904761906, '', "When you enter from the main entrance, take the first right turn and the office wil be on the left. Outside the office are important updates, like the Student Bulletin."]
var smallGym = [-0.3861566484517304,0.3142857142857143,0.14754098360655737,0.13095238095238096, '', "Coming in from the main entrance, the small gym is on the left of the drama studio. "]
var resourceCen = [-0.3879781420765027,0.15714285714285714,0.1493624772313297,0.0761904761904762, '']
var room223 = [-0.424408014571949,-0.06190476190476191,0.04918032786885246,0.04523809523809524, '']
var room221 = [-0.37340619307832423,-0.06190476190476191,0.04735883424408015,0.04523809523809524, '']
var room220 = [-0.4098360655737705,-0.14285714285714285,0.04553734061930783,0.04285714285714286, '']
var staffLounge = [-0.36065573770491804,-0.14285714285714285,0.14389799635701275,0.04285714285714286, '']
var room202to204 = [-0.060109289617486336,-0.14523809523809525,0.2040072859744991,0.04285714285714286, '']
var room201to209 = [-0.04007285974499089,-0.06190476190476191,0.23132969034608378,0.04285714285714286, '']
var dramaStudio = [-0.3588342440801457,0.24285714285714285,0.11293260473588343,0.04285714285714286, '']
var room272to273 = [-0.4444444444444444,0.1761904761904762,0.025500910746812388,0.16666666666666666, '']
var room173 = [-0.4790528233151184,0.22142857142857142,0.03460837887067395,0.11904761904761904, '']
var room211toCopy = [-0.08925318761384335,-0.06190476190476191,0.04918032786885246,0.19285714285714287, '']
var room200 = [0.1657559198542805,-0.15,0.04735883424408015,0.04523809523809524, ''] //chinese classroom

rects.push(smallGym,room221,resourceCen,room223,room202to204,
			room201to209,dramaStudio,room220,room215,mainGym,scienceWing,
			office,
			room272to273,room173,staffLounge,room211toCopy,room200, room275)

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
					rect[0]*levelMain.width+levelMain.position.x, 
					rect[1]*levelMain.height+levelMain.position.y, 
					rect[2]*levelMain.width, 
					rect[3]*levelMain.height);
	graphics.hitArea = new PIXI.Rectangle(
					rect[0]*levelMain.width+levelMain.position.x, 
					rect[1]*levelMain.height+levelMain.position.y, 
					rect[2]*levelMain.width, 
					rect[3]*levelMain.height);
	graphics.alpha = 0.3;
	
	// added a new path variable to the rectangles to identify the image path
	// gets used in onButtonClick
	graphics.mypath = rect[4];
	graphics.mytext = rect[5];
}

function onButtonOver()
{
	console.log(onButtonOver);
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