
window.addEventListener('load', setup);
let width = window.innerWidth;
let height = 1699;
var params = {
    speed: 25,
    stars: 500,
    starSize: 4
};
let app = new PIXI.Application({
    width: width,
    height: height,
    antialias: true,
    transparent: true
});
let stars = [];
function setup() {
    document.getElementById('sketch-holder').appendChild(app.view);
    let cont = new PIXI.Container();
    app.stage.addChild(cont);
    cont.x = width / 2;
    cont.y = height / 2;
    for (let i = 0; i < params.stars; i++) {
        stars[i] = new Star();
        cont.addChild(stars[i].graphic);
    }
    let drawStuff = () => {
        stars.forEach(star => {
            star.update();
            star.show();
        })
    };
    app.ticker.add(drawStuff);
}
function random() {
    if (arguments.length == 0) {
        return Math.random()
    }
    else if (arguments.length == 1) {
        return Math.random() * arguments[0]
    }
    else if (arguments.length == 2) {
        return arguments[0] + Math.random() * (arguments[1] - arguments[0])
    }
}

function map(a, l1, u1, l2, u2) {
    return l2 + (a - l1) / (u1 - l1) * (u2 - l2)
}

class Star {
    constructor() {
        this.x = random(-width, width);
        this.y = random(-height, height);
        this.z = random(width);

        this.pz = this.z;

        this.graphic = new PIXI.Graphics()
    }
    update() {
        this.z -= params.speed;
        if (this.z < 1) {
            this.x = random(-width, width);
            this.y = random(-height, height);
            this.z = random(1, width);
            //previous z
            this.pz = this.z;
        }
    }

    show() {
        this.graphic.clear();
        const sx = map(this.x / this.z, 0, 1, 0, width);
        const sy = map(this.y / this.z, 0, 1, 0, height);
        const r = map(this.z, 0, width, params.starSize, 0);
        this.graphic.lineStyle(0);
        this.graphic.beginFill(0xFFFFFF);
        this.graphic.drawCircle(sx, sy, r / 4);
        this.graphic.endFill();
        const px = map(this.x / this.pz, 0, 1, 0, width);
        const py = map(this.y / this.pz, 0, 1, 0, height);
        this.graphic.lineStyle(4, 0x42f4f1, 1);
        this.graphic.moveTo(px, py);
        this.graphic.lineTo(sx, sy);
        this.pz = this.z;
    }
}
//-----------------Tweenmax----------------

// var tl = new TimelineMax({repeat: -1, repeatDelay: 1});
// tl.add(TweenLite.to(document.getElementById('word'), 5, {opacity:0, yoyo:true}));
// tl.add(TweenLite.to(document.getElementById('word'), 5, {opacity:0, yoyo:true}));
// tl.addLabel('test-tl');
// tl.play('test-tl');

(function(){
    console.log('self-invoking function');  

    var sm_cont = new ScrollMagic.Controller();

    var firstPart = new TimelineMax()
    .to("#firstpart-greeting", 5, {opacity:1, yoyo:true});

    var scene_1 = new ScrollMagic.Scene({
        triggerElement: "#firstpart-greeting"
    })
    .setTween(firstPart)
    .addTo(sm_cont);
})();


