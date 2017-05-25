var canvas = document.getElementById('game');
var c = canvas.getContext("2d");

c.fillStyle = 'rgba(255, 0 , 0 ,0.3)';

for(var j=0; j<4; j++){
  for(var i=0; i<4; i++){
    c.fillRect(10 + (i*95 + i*10), 10 + (j*95 + j*10), 95,95);
  }
}

console.log("Hey")
