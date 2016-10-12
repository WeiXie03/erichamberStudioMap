var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0xFDDCA6});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

// create a texture from an image path
var texture = PIXI.Texture.fromImage('./floorplan/erichamberLevelMain.jpg');

// create a new Sprite using the texture
var levelMain = new PIXI.Sprite(texture);

levelMain.interactive = true;
levelMain.on('mousedown', onDown);
levelMain.on('touchstart', onDown);

function onDown (eventData) {
	var eventD = eventData;
    console.log((renderer.plugins.interaction.mouse.global.x-levelMain.position.x)/levelMain.width);
	console.log((renderer.plugins.interaction.mouse.global.y-levelMain.position.y)/levelMain.height);
	console.log("");
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

var buttons = [];
var rects = [[0.2,0.2,0.3,0.3]]
addRects(stage);
function addRects(contain){
	var graphics = new PIXI.Graphics();
	drawButton(graphics,rects[0]);
	contain.addChild(graphics);
	graphics.interactive = true;
	graphics.on('mouseover', onButtonOver).on('mouseout', onButtonOut);
	buttons.push(graphics);
}
function drawButton(graphic, rect){
	graphic.lineStyle(2, 0x0070FF, 0.95);
	graphic.drawRect(
					rect[0]*levelMain.width+levelMain.position.x, 
					rect[1]*levelMain.heigt+levelMain.position.y, 
					(rect[2]-rect[0])*levelMain.width, 
					(rect[3]-rect[1])*levelMain.height);
	graphic.hitArea = new PIXI.Rectangle(
					rect[0]*levelMain.width+levelMain.position.x, 
					rect[1]*levelMain.heigt+levelMain.position.y, 
					(rect[2]-rect[0])*levelMain.width, 
					(rect[3]-rect[1])*levelMain.height);
	graphic.alpha = 0.2;
}
function onButtonOver()
{
    this.isOver = true;
    this.alpha = 1;
}

function onButtonOut()
{
    this.isOver = false;
    this.alpha = 0.2;
}

// start animating
animate();
function animate() {
    requestAnimationFrame(animate);

    // just for fun, let's rotate mr rabbit a little
    //levelMain.rotation += 0.1;

    // render the container
    renderer.render(stage);
}