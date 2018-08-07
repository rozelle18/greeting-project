var h = window.innerHeight;
var w = window.innerWidth;
var nightsky_cg = new PIXI.Application(w, h, { antialias: true});

document.getElementById('meteor-container').appendChild(nightsky_cg.view);

var numberOfStars = 150;
var starRadius = 2;

for (let i = 0; i < numberOfStars; i++){
    var star = new PIXI.Graphics();
    star.beginFill(0xFFFFFF, Math.random().toFixed(2));
    star.drawCircle(randomizer(w), randomizer(h), starRadius);
    star.endFill();
    nightsky_cg.stage.addChild(star);
}


// var circle = new PIXI.Graphics();
// // set a fill and line style
// circle.beginFill(0xFFFFFF, .5);
// circle.lineStyle(4, 0xffd900, 1);
// circle.drawCircle(470, 90,60);
// circle.endFill();
// nightsky_cg.stage.addChild(circle);
// app.ticker.add(function(delta) {
//     var speed = 0.5;
//     console.log(circle.x < (screen.width/3));
//     if(circle.x < (screen.width/3)){
//         speed = 2;
//     }
//     circle.x += speed * delta;
//     rect.y += 1 * delta;
// });

var cont = new ScrollMagic.Controller({vertical: true});

function randomizer(end){
    return Math.floor((Math.random() * end) + 1);
}