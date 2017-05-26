var canvas = document.getElementById('game');
var c = canvas.getContext("2d");

var tileFront='rgb(153, 153, 153)'
var tileBack='rgb(204, 204, 204)'
var matchedTileColor = 'rgb(2, 204, 204)'
var fontColor = 'black';
var tileSize = 110;
var tileLocations = [];
var openTiles = [];
var tileValues = [1,2,1,2,3,4,3,4,5,6,5,6,7,8,7,8];

c.font = "28pt Tahoma";

function tilexy(x,y,clicked,matched){
  this.x = x;
  this.y = y;
  this.clicked=clicked;
  this.matched=matched;
}

window.addEventListener('mousedown',
function(event){
  //console.log(event);
  //flipTile(event.x, event.y);
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
  if(isGameOver()){
    c.fillStyle = 'green';
    c.fillText(" You won!", 100, 550);
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
          openTiles.push(i);
          flipTile(i);
          if(tileValues[openTiles[0]] == tileValues[openTiles[1]]){
            markMatchedTiles(openTiles);
          }

          if(openTiles.length > 2) {
            tileLocations[openTiles[0]].clicked = false;
            flipTile(openTiles[0]);
            tileLocations[openTiles[1]].clicked = false;
            flipTile(openTiles[1]);
            openTiles = [i]; //Set the openTiles to the "third" tile clicked
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

function isGameOver() {
  for(var i=0; i< tileLocations.length ; i++){
    console.log(tileLocations[i].matched)
    if(tileLocations[i].matched !== 'undefined'  && !tileLocations[i].matched){
      console.log('GO' + tileLocations[i].matched)
      return false;
    }
  }
  console.log(tileLocations)
  return true;
}

initBoard();
