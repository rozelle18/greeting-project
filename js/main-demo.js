

$(document).ready(function(){

    // Audio part
    var audio_1 = document.createElement('audio');
    audio_1.setAttribute('src', 'assets/music/owl-city-meteor.mp3');     
    audio_1.setAttribute('autoplay',true);
    audio_1.setAttribute('loop',true);
    // End of Audio

    var sm_cont = new ScrollMagic.Controller();

    var params = {
        speed: 3,
        stars: 500,
        starSize: 16,
        speedScroller: true
    };

    let width = window.innerWidth;
    let height = 1699;
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
    setup();
//-----------------Tweenmax----------------

// var tl = new TimelineMax({repeat: -1, repeatDelay: 1});
// tl.add(TweenLite.to(document.getElementById('word'), 5, {opacity:0, yoyo:true}));
// tl.add(TweenLite.to(document.getElementById('word'), 5, {opacity:0, yoyo:true}));
// tl.addLabel('test-tl');
// tl.play('test-tl');
    // sm_cont.scrollTo(function(newpos){
    //     TweenMax.to(window, 0.5, {scrollTo: {y:newpos}});
    // });
    // TweenMax.to(".scrolldown-i", 1, {opacity: 0, yoyo: true, repeat: -1});
    (function(){
        window.ontouchmove = function(e) {
            //console.log(e);
            if(params.speedScroller){
                params.speed = sm_cont.scrollPos()/10;
            }
            if (firstPartTl.isActive() || thirdPartTl.isActive()){
                e.returnValue = false;
            }
        };
        console.log('self-invoking function');
        // const aGreeting = [
        //     "uhmm...",
        //     "Hi :) ",
        //     "Lorem ipsum dolor",
        //     " Proin ac aliquam odio ",
        //     "  id blandit libero placerat. In gravida nibh",
        //     "  Vivamus.",
        //     "Proin id viverra erat. "
        // ];
        const aGreeting = [
            'short greeting for testing'
        ];
        var firstPartTl = new TimelineMax();
        firstPartTl.add(
            TweenLite.to(window, 3,
                {
                    scrollTo:{ y : "#firstPartDiv" },
                    onStart(){
                        $('#scrollIndicator').fadeOut(1000);
                    }
                }
            ), 1
        );

        aGreeting.forEach(function(v,i){
            $('#firstpart-text-container').append('<div class="faded firstPartText_'+i+' stagger-text">'+v+'</div>');
            console.log(v.length/7);
            firstPartTl.add(
                TweenMax.to('.firstPartText_'+i, v.length/15, {
                    display: "block",
                    opacity: 1,
                    yoyo: true,
                    repeatDelay: 1,
                    repeat: 1
                })
            );
        });
        firstPartTl.call(function(){
            console.log('--slow starspeed--');
            params.speed = 5;
            $('#scrollIndicator').fadeIn(1000);
        });


        var scene_1 = new ScrollMagic.Scene({
            triggerElement: '#firstPartDiv',
            reverse: false
        })
        .setTween(firstPartTl)
        .addIndicators()
        .addTo(sm_cont);

        /* Start of second scene */
        var secondPartTl = new TimelineMax();
        secondPartTl.add(
            TweenLite.to(window, 3,
                {
                    onStart(){
                        console.log('secondpart');
                    }
                }
            ), 1
        );
        
        var scene_2 = new ScrollMagic.Scene({
            triggerElement: '#secondPartDiv',
            reverse: false
        })
        .setTween(TweenLite.to('#secondPartDiv', 1, {opacity:0}))
        .addIndicators()
        .addTo(sm_cont);

        var thirdPartTl = new TimelineMax();
        thirdPartTl.add(
            TweenLite.to(window, 3,
                {
                    onStart(){
                        console.log('thirdpart');
                        $('#scrollIndicator').fadeOut(1000);
                    }
                }
            )
        );
        thirdPartTl.call(function(){
            console.log('--slow starspeed--');
            params.speed = 5;
            $('#scrollIndicator').fadeIn(1000);
        });

        var scene_3 = new ScrollMagic.Scene({
            triggerElement: '#thirdPartDiv',
            reverse: false
        })
        .on('enter',slowDownStars)
        .setTween(thirdPartTl)
        .addIndicators()
        .addTo(sm_cont);

        function slowDownStars(e){
            console.log('slowdown');
            params.speedScroller = false;
            params.speed = 10;
        }

        var scene_4 = new ScrollMagic.Scene({
            triggerElement: '#fourthPartDiv',
            reverse: false
        })
        .setTween(TweenLite.to(window, 3,
            {
                scrollTo:{ y : "#fourthPartDiv" },
                onStart(){
                    console.log('fourthPart');
                    audio_1.setAttribute('src', 'assets/music/Kodaline-the-One.mp3');  
                    $('#scrollIndicator').fadeOut(1000);
                }
            }
        ))
        .addIndicators()
        .addTo(sm_cont);

        function slowDownStars(e){
            console.log('slowdown');
            params.speedScroller = false;
            params.speed = 10;
        }

 
    })();

});
//
// function preventDefault(e) {
//     e = e || window.event;
//     if (e.preventDefault)
//         e.preventDefault();
//     e.returnValue = false;
// }
//
// function disableScroll(){
//     if (window.addEventListener) // older FF
//         window.addEventListener('DOMMouseScroll', preventDefault, false);
//     window.onwheel = preventDefault; // modern standard
//     window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
//     window.ontouchmove  = preventDefault; // mobile
// }
// function enableScroll() {
//     if (window.removeEventListener)
//         window.removeEventListener('DOMMouseScroll', preventDefault, false);
//     window.onmousewheel = document.onmousewheel = null;
//     window.onwheel = null;
//     window.ontouchmove = null;
//     document.onkeydown = null;
// }

// var firstPart = new TimelineMax()
//     .to (".first-part", 3, {
//         onStart() {
//             console.log('test');
//             firstPartElement.html('<h1 id="firstpart-text">Test</h1>');
//             disableScroll();
//         }
//     })
//     .to(window, 2, {scrollTo:{y:$("div.first-part")}})
//     .to('#firstpart-text', 1, {
//         onStart(){
//             console.log('start of firstpart');
//             $('#firstpart-text').text('new text');
//         },
//         onComplete(){
//             console.log('end of first part');
//             enableScroll();
//         }
//     });
//  TweenLite.to(window, 2, {scrollTo:{y:$("div.first-part")}});
// .to("#firstpart-greeting", 2,{ opacity:0});
