var h = window.innerHeight;
var w = window.innerWidth;
var nightsky_cg = new PIXI.Application(w, h, { antialias: true});

document.getElementById('meteor-container').appendChild(nightsky_cg.view);

var numberOfStars = 100;
var starRadius = 2;

for (let i = 0; i < numberOfStars; i++){
    var star = new PIXI.Graphics();
    star.beginFill(0xFFFFFF, Math.random().toFixed(2));
    star.drawCircle(0, 0, starRadius);
    star.endFill();
    star.position.x = randomizer(w)/2;
    star.position.y = randomizer(h)/2;
    nightsky_cg.stage.addChild(star);
}

var z = w;
nightsky_cg.ticker.speed = 1;
nightsky_cg.ticker.add(function(delta) {
    z = z - delta;
    nightsky_cg.stage.children.forEach(function(star){
        //console.log(star);
        var sx = map_range(star.position.x/z, 0, 1, 0, w);
        var sy = map_range(star.position.y/z, 0, 1, 0, w);
        star.position.set(sx,sy);
        // star.moveTo(500, 500);
        //star.position.y = map_range(star.position.y/z, 0, 1, 0, h);
        //star.position.x = map_range(star.position.x/z, 0, 1, 0, w);
        // console.log(star.position.y);
        //console.log(map_range(star.position.y/z, 0, 1, 0, h));
        // console.log('x' + map_range(star.position.x/z, 0, 1, 0, w));
        // console.log('y' + map_range(star.position.y/z, 0, 1, 0, h));
    })
});



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

function randomizer(end){
    return Math.floor((Math.random() * end) + 1);
}

function map(value, minA, maxA, minB, maxB) {
    return (1 - ((value - minA) / (maxA - minA))) * minB + ((value - minA) / (maxA - minA)) * maxB;
}
function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}