var canvas = document.getElementById('game');
var c = canvas.getContext("2d");

var tileFront='rgb(153, 153, 153)'
var tileBack='rgb(204, 204, 204)'
var matchedTileColor = 'rgb(2, 204, 204)'
var fontColor = 'black';
var tileSize = 110;
var tileLocations = [];
var openTiles = []; //Will contain currently open two tiles
var tileValues = [1,2,1,2,3,4,3,4,5,6,5,6,7,8,7,8]; //XXX Randomize this
var numberOfTilesMatched=0;

var starTime;
var endTime;





function tilexy(x,y,clicked,matched){
  this.x = x;
  this.y = y;
  this.clicked=clicked;
  this.matched=matched;
}

window.addEventListener('mousedown',
function(event){
  isButtonClicked(event.x, event.y);
  isTileClicked(event.x, event.y)
});

function initBoard() {
  c.fillStyle = tileFront;
  for(var j=0; j<4; j++){
    for(var i=0; i<4; i++){
      tileLocations.push(new tilexy(10 + (i*tileSize + i*10), 10 + (j*tileSize + j*10), false, false ) )
      c.fillRect(10 + (i*tileSize + i*10), 10 + (j*tileSize + j*10), tileSize ,tileSize);
    }
  }
  //console.log(tileLocations)
}

function flipTile(tileNumber) {
  // Don't flip already matched tiles
  if(tileLocations[tileNumber].matched == true) {
    return;
  }

  if(tileLocations[tileNumber].clicked == true) {
    c.fillStyle = tileBack;
  } else {
    c.fillStyle = tileFront;
  }
  c.fillRect(tileLocations[tileNumber].x,tileLocations[tileNumber].y,tileSize,tileSize);
  c.fillStyle = fontColor;
  if(tileLocations[tileNumber].clicked == true) {
    c.fillText(  tileValues[tileNumber], tileLocations[tileNumber].x + tileSize/2-10, tileLocations[tileNumber].y  + tileSize/2+10);
  }

}

function isTileClicked(px, py){
    for(var i=0; i < tileLocations.length; i++){
      if( (px > tileLocations[i].x  && px < tileLocations[i].x + tileSize) && (py>tileLocations[i].y && py < tileLocations[i].y + tileSize) ){
          //console.log("Tile "+i+" Clicked!")
          tileLocations[i].clicked = !tileLocations[i].clicked; //Toggle the clicked state
          if(openTiles.indexOf(i) > -1){
            return; // Check if tile was already open - if so, don't flip it.
          }
          openTiles.push(i);
          flipTile(i);
          if(tileValues[openTiles[0]] == tileValues[openTiles[1]]){
            numberOfTilesMatched++;
            markMatchedTiles(openTiles);
          }

          if(openTiles.length > 2) {
            tileLocations[openTiles[0]].clicked = false;
            flipTile(openTiles[0]);
            tileLocations[openTiles[1]].clicked = false;
            flipTile(openTiles[1]);
            openTiles = [i]; //Set the openTiles to the "third" tile clicked
          }
          if(numberOfTilesMatched==15){
            c.fillStyle = 'green';
            c.fillText(" You won!", 100, 550);
          }
      }
    }
}

function markMatchedTiles(openTiles) {
  for(var i=0; i< 2 ; i++){
    tileNumber = openTiles[i];
    c.fillStyle = matchedTileColor;
    tileLocations[tileNumber].matched=true;
    c.fillRect(tileLocations[tileNumber].x,tileLocations[tileNumber].y,tileSize,tileSize);
    c.fillStyle = fontColor;
    c.fillText(  tileValues[tileNumber], tileLocations[tileNumber].x + tileSize/2-10, tileLocations[tileNumber].y  + tileSize/2+10);

  }
}

function drawButton(){
  c.fillStyle = 'rgba(237, 153, 153, 0.3)';
  c.fillRect(500, 10, 100,40);
  c.fillStyle = fontColor;
  c.font = "12pt Tahoma";
  c.fillText ("Start", 510, 40);
  c.font = "28pt Tahoma";
}

function isButtonClicked(px, py){

}

initBoard();
drawButton();
