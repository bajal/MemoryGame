var canvas = document.getElementById('game');
var c = canvas.getContext("2d");

var tileFront='rgb(153, 153, 153)'
var tileBack='rgb(204, 204, 204)'
var fontColor = 'black';
var tileSize = 95;
var tileLocations = [];
c.font = "28pt Tahoma";

function tilexy(x,y){
  this.x = x;
  this.y = y;
  clicked=false;

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
      tileLocations.push(new tilexy(10 + (i*tileSize + i*10), 10 + (j*tileSize + j*10)))
      c.fillRect(10 + (i*tileSize + i*10), 10 + (j*tileSize + j*10), tileSize ,tileSize);
    }
  }
  //console.log(tileLocations)
}

function flipTile(tileNumber) {
  if(tileLocations[tileNumber].clicked == true) {
    c.fillStyle = tileBack;
  } else {
    c.fillStyle = tileFront;
  }
  c.fillRect(tileLocations[tileNumber].x,tileLocations[tileNumber].y,tileSize,tileSize);
  c.fillStyle = fontColor;
  if(tileLocations[tileNumber].clicked == true) {
    c.fillText(  tileNumber, tileLocations[tileNumber].x + tileSize/2-10, tileLocations[tileNumber].y  + tileSize/2+10);
  }
}

function isTileClicked(px, py){
    for(var i=0; i < tileLocations.length; i++){
      if( (px > tileLocations[i].x  && px < tileLocations[i].x + tileSize) && (py>tileLocations[i].y && py < tileLocations[i].y + tileSize) ){
          //console.log("Tile "+i+" Clicked!")
          tileLocations[i].clicked = !tileLocations[i].clicked; //Toggle the clicked state
          flipTile(i);
      }
    }
}








initBoard();
