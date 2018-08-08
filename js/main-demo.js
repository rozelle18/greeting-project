//
//
// var h = window.innerHeight;
// var w = window.innerWidth;
// var nightsky_cg = new PIXI.Application(w, h, { antialias: true});
// document.getElementById('meteor-container').appendChild(nightsky_cg.view);
// var numberOfStars = 400;
// var starRadius = 8;
//
// for (let i = 0; i < numberOfStars; i++){
//     var star = new PIXI.Graphics();
//     star.beginFill(0xFFFFFF, Math.random().toFixed(2));
//     star.drawCircle(0, 0, starRadius);
//     star.endFill();
//     star.position.x = getRandomInt(-w, w);
//     star.position.y = getRandomInt(-h, h);
//     star.z = getRandomInt(1, w);
//     nightsky_cg.stage.addChild(star);
// }
//
// nightsky_cg.ticker.speed = .01;
// nightsky_cg.ticker.add(function(delta) {
//     nightsky_cg.stage.children.forEach(function(star){
//         //console.log(star)
//         star.z -= 1;
//         if (star.z < 1) {
//             star.z = w;
//             star.position.x = getRandomInt(-w, w);
//             star.position.y = getRandomInt(-h, h);
//         }
//         var sx = map_range(star.position.x / star.z, 0, 1, 0, w);
//         var sy = map_range(star.position.y / star.z, 0, 1, 0, w);
//         star.position.set(sx, sy);
//         // star.moveTo(500, 500);
//         //star.position.y = map_range(star.position.y/z, 0, 1, 0, h);
//         //star.position.x = map_range(star.position.x/z, 0, 1, 0, w);
//         // console.log(star.position.y);
//         //console.log(map_range(star.position.y/z, 0, 1, 0, h));
//         // console.log('x' + map_range(star.position.x/z, 0, 1, 0, w));
//         // console.log('y' + map_range(star.position.y/z, 0, 1, 0, h));
//     })
// });
//
//
//
// // var circle = new PIXI.Graphics();
// // // set a fill and line style
// // circle.beginFill(0xFFFFFF, .5);
// // circle.lineStyle(4, 0xffd900, 1);
// // circle.drawCircle(470, 90,60);
// // circle.endFill();
// // nightsky_cg.stage.addChild(circle);
// // app.ticker.add(function(delta) {
// //     var speed = 0.5;
// //     console.log(circle.x < (screen.width/3));
// //     if(circle.x < (screen.width/3)){
// //         speed = 2;
// //     }
// //     circle.x += speed * delta;
// //     rect.y += 1 * delta;
// // });
//
// // function randomizer(end){
// //     return Math.floor((Math.random() * end) + 1);
// // }
//
// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }
// function map_range(value, low1, high1, low2, high2) {
//     return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
// }

//--------------------------
window.addEventListener('load', setup);
let width = window.innerWidth;
let height = window.innerHeight;
// let width = 256
// let height = 256

var params = {
    speed: 10,
}
let app = new PIXI.Application({
    width: width,
    height: height,
    antialias: true
})

let stars = [];

function setup() {
    document.getElementById('sketch-holder').appendChild(app.view);

    let cont = new PIXI.Container();
    app.stage.addChild(cont);
    cont.x = width / 2;
    cont.y = height / 2;
    for (let i = 0; i < 150; i++) {
        stars[i] = new Star();
        cont.addChild(stars[i].graphic);
    }
    let drawStuff = () => {
        stars.forEach(s => {
            s.update();
            s.show();
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
            this.pz = this.z;
        }
    }

    show() {

        this.graphic.clear()

        const sx = map(this.x / this.z, 0, 1, 0, width);
        const sy = map(this.y / this.z, 0, 1, 0, height);


        const r = map(this.z, 0, width, 16, 0);

        this.graphic.lineStyle(0);
        this.graphic.beginFill(0xFFFFFF);
        this.graphic.drawCircle(sx, sy, r / 4);
        this.graphic.endFill();

        const px = map(this.x / this.pz, 0, 1, 0, width);
        const py = map(this.y / this.pz, 0, 1, 0, height);

        this.graphic.lineStyle(4, 0xffffff, 1)
        this.graphic.moveTo(px, py)
        this.graphic.lineTo(sx, sy)

        this.pz = this.z;
    }
}
