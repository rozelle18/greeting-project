var h = window.innerHeight;
var w = window.innerWidth;
var nightsky_cg = new PIXI.Application(w, h, { antialias: true});

document.getElementById('meteor-container').appendChild(nightsky_cg.view);

var numberOfStars = 150;
var starRadius = 8;
for (let i = 0; i < numberOfStars; i++){
    var star = new PIXI.Graphics();
    star.beginFill(0xFFFFFF, Math.random().toFixed(2));
    star.drawCircle(0, 0, starRadius);
    star.endFill();
    star.x = randomizer(w);
    star.y = randomizer(h);
    nightsky_cg.stage.addChild(star);
}
var z = w;
nightsky_cg.ticker.add(function(delta) {
    z -= 1;
    //console.log(parseInt(nightsky_cg.stage.getChildAt(0).x)/z);
    //console.log(nightsky_cg.stage.getChildAt(0).position);
    //nightsky_cg.stage.getChildAt(0).setTransform(z,z);
    nightsky_cg.stage.children.forEach(function(star){
        star.x += map(star.x / z , 0, 1, 0, w) ;
        star.y += map(star.y / z, 0, 1, 0, h);
    });
    //console.log(z);
});

function map(value, minA, maxA, minB, maxB) {
    return (1 - ((value - minA) / (maxA - minA))) * minB + ((value - minA) / (maxA - minA)) * maxB;
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