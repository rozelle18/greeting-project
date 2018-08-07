
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

var cv1 = document.getElementById('canvas_one');
var ctx= cv1.getContext('2d');
ctx.beginPath();
ctx.arc(250, 75, 1.5, 0, 2*Math.PI);
ctx.stroke();
ctx.fillStyle = 'white';
ctx.fill();