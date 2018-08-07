
var nightsky_cg = new PIXI.Application(window.innerWidth, window.innerHeight, { antialias: true , autoResize: true, resolution: devicePixelRatio});

document.getElementById('meteor-container').appendChild(nightsky_cg.view);

var circle = new PIXI.Graphics();
// set a fill and line style
circle.beginFill(0xFFFFFF, .5);
circle.lineStyle(4, 0xffd900, 1);
circle.drawCircle(470, 90,60);
circle.endFill();
nightsky_cg.stage.addChild(circle);
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

var tween = new TimelineMax()
    .add([
        TweenMax.to('#greenBox', 2, { y:500, ease: Linear.easeNone}),
        TweenMax.to('#redBox', 1, {y:500, ease: Linear.easeNone}),
        TweenMax.to('#blueBox', 4, {y:500, ease: Linear.easeNone}),
        TweenMax.to('#yellowBox', 5, {y:500, ease: Linear.easeNone})
    ]);

var scene = new ScrollMagic.Scene({
    triggerElement: "#demo", duration: 2000, offset: 450
}).setTween(tween).setPin('#demo').addTo(cont);

var nsHeight = 1699;
var nsWidth = screen.width;
var numberOfStars = 100;

var tl_2 = new TimelineMax({repeat:-1});

var aStars = [];

var Star = function(){
    this.x = randomizer(nsWidth);
    this.y = randomizer(nsHeight);
    this.z = randomizer(nsWidth);
    this.show = function() {

    }
};

for (let i = 0; i < numberOfStars; i++){
    aStars.push(new Star())
}

function randomizer(end){
    return Math.floor((Math.random() * end) + 1);
}