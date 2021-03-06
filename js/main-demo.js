Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function(){
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
})
$(document).ready(function(){
    // Audio part 
    // audio_1.setAttribute('src','assets/music/owl-city-meteor.mp3');
    // audio_1.setAttribute('autoplay', true);
    // audio_1.setAttribute('loop', true);
    // End of Audio
// checks if element is playing right now
        // Do anything you want to
    
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
    (function(){
    
        window.onscroll = function(e) {
            if(params.speedScroller && !letsStart.isActive()){
                params.speed = sm_cont.scrollPos()/10;
            }
            if (letsStart.isActive()||firstPartTl.isActive()||thirdPartTl.isActive()||fourthPartTl.isActive()){
                e.returnValue = false;  
                console.log('scrolling');
            }
        };

        var letsStart = new TimelineMax();
        var firstPartTl = new TimelineMax();
        //Intro

        const introGreeting = [
            "    uhmm...",
            "  Hi Crush!",
            "It's me , your most loyal admirer ",
            " ZOR ",
            "  aka ",
            " Winzor Joseph M. Paelmo",
            "Haba noh",
            "kaya nga Zor na lang",
            "pero hndi lang pangalan ko",
            "ang mahaba saken",
            " ;) wink ",
            "pati Pasensya, hahahhhaha",
            "let's start! Scroll down when you see the indicator ha "
        ];
        var letsStart = new TimelineMax();
        letsStart.add(
            TweenLite.to(window, 3,
                {
                    onStart(){
                        $('#scrollIndicator').fadeOut(200);
                    }
                }
            ), 1
        );
        introGreeting.forEach(function(v,i){
            $('.space-div').append('<div class="faded space-div'+i+' stagger-text">'+v+'</div>');
            letsStart.add(
                TweenMax.to('.space-div'+i, v.length/17, {
                    x:Math.floor((Math.random() * 5) +1),
                    y:Math.floor((Math.random() * 60) +1),
                    display: "block",
                    opacity: 1,
                    yoyo: true,
                    repeatDelay: 1,
                    repeat: 1
                })
            );
        });
        letsStart.call(function(){
            $('#scrollIndicator').fadeIn(1000);
        });
if(document.getElementById('music').playing){ 
        letsStart.play();
} else {
    alert('RELOADING. FAILED TO LOAD RESOURCES.');
    setInterval(function(){
        if(!document.getElementById('music').playing)
            location.reload();
    },4000)

}       
        //End of Intro

        //start of first part
        
        const aGreeting = [
            'wondering what this is?',
            'eto na yung bagong version ko ng loveletter',
            'I mean',
            'Birthday greeting card pala',
            'haha',
            'honestly,',
            'naisip ko isulat nung una',
            'but as you know...',
            'pangit nga pla handwriting ko hahaha',
            'So yeah, I simply',
            'Opted to this :)',
            'I hope you like it.'
        ];

        firstPartTl.add(
            TweenLite.to(window, 3,
                {
                    scrollTo:{ y : "#firstPartDiv" , autoKill:false},
                    onStart(){
                        $('#scrollIndicator').fadeOut(1000);
                    }
                }
            ), 1
        );

        aGreeting.forEach(function(v,i){
            $('#firstpart-text-container').append('<div class="faded firstPartText_'+i+' stagger-text">'+v+'</div>');
            firstPartTl.add(
                TweenMax.to('.firstPartText_'+i, v.length/22, {
                    display: "block",
                    opacity: 1,
                    scale: 0.75,
                    yoyo: true,
                    repeatDelay: 1,
                    repeat: 1
                })
            );
        });
        firstPartTl.call(function(){
            params.speed = 5;
            $('#scrollIndicator').fadeIn(1000);
        });

        var scene_1 = new ScrollMagic.Scene({
            triggerElement: '#firstPartDiv',
            reverse: false
        })
        .setTween(firstPartTl)
//        .addIndicators()
        .addTo(sm_cont);
        
        /* Start of second scene */
        var secondPartTl = new TimelineMax();
        
        (function(){
        //start of sugarcubs images show

            var aRandomizerForImg = [
                200,
                250,
                100,
                50
            ]
            $('.sp_img_container').each(function(i){
                var ci = i+1;
                let trElem = '.sp_img_'+ci;
                if(ci == 0){
                    trElem = '#secondpart-text-container';
                }
                new ScrollMagic.Scene({
                    triggerElement: trElem,
                    duration: 100
                })
                .on('enter',function(){
                    TweenMax.to('.secondPartImage_'+ci,1,{
                        scale: 1,
                        x: aRandomizerForImg[(Math.floor(Math.random()*aRandomizerForImg.length))],
                        opacity: 1,
                        display: 'block'
                    })
                })
                .on('leave',function(){
                    TweenMax.to('.secondPartImage_'+ci, 1,{
                        opacity: 0,
                        scale: 0.2,
                        display: 'none'
                    })
                })
 //               .addIndicators({name: 'secondPartImage_'+ci})
                .addTo(sm_cont);
                
            });
        })(); 

       //Third Part
       const thirdPartGreeting = [
           'To dearest ElleBelles',
           'Mrs. Bantot',
           'Hon',
           '&',
           'the prettiest debutant I know'
        ];
        var thirdPartTl = new TimelineMax();
        
        thirdPartTl.call(function(){
           
            params.speed = 5;
        });
        
        thirdPartTl.add(
            TweenLite.to(window, 3,
                {
                    scrollTo:{ y : "#thirdPartDiv", autoKill:false },
                    onStart(){
                        $('#scrollIndicator').fadeOut(1000);
                    }
                }
            )
        );
        var aRotationRandomizer = [
            360,
            0,
            0
        ]
        thirdPartGreeting.forEach(function(v,i){
            $('#thirdpart-text-container').append('<div class="faded thirdPartText_'+i+' stagger-text">'+v+'</div>');
            thirdPartTl.add(
                TweenMax.to('.thirdPartText_'+ i, v.length/22, {
                    display: "block",
                    opacity: 1,
                    x:Math.floor((Math.random() * 5) +1),
                    y:Math.floor((Math.random() * 60) +1), 
                    yoyo: true,
                    rotation:  aRotationRandomizer[(Math.floor(Math.random()*aRotationRandomizer.length))],
                    repeatDelay: 1,
                    repeat: 1
                })
            );
        });

        const aElleImages = [
            'elle_1.jpg',
            'elle_2.jpg',
            'elle_3.jpg',
            'elle_4.png'
        ];
        aElleImagesText = [
            '',
            '',
            'Taeng Tae hahaha',
            'Dear Papi, Jisas. . .'
        ];

        aElleImages.forEach(function(v,i){

            $('#thirdpart-text-container').append(
                `<div class="faded thirdPartImages_`+i+`">
                    <img class="tp_images" src='assets\\`+v+`'/>
                </div>`);
            thirdPartTl.add(
                TweenMax.to('.thirdPartImages_'+ i, 2, {
                    display: "block",
                    opacity: 1, 
                    zIndex: 2,
                    yoyo: true,
                    repeatDelay: 1,
                    repeat: 1
                })
            );
            if(i==2){
                $('#thirdpart-text-container').append(
                    '<div class="faded tpText_'+i+'">'+aElleImagesText[i]+'</div>');
                thirdPartTl.add(
                    TweenMax.to('.tpText_'+ i, 1, {
                        display: "block",
                        opacity: 1, 
                        y: 150,
                        yoyo: true,
                        repeatDelay: 1,
                        repeat: 1
                    })
                );
            }
            if(i==3){
                $('#thirdpart-text-container').append(
                    '<div class="faded tpText_'+i+'">'+aElleImagesText[i]+'</div>');
                thirdPartTl.add(
                    TweenMax.to('.tpText_'+ i, 2.5, {
                        display: "block",
                        opacity: 1, 
                        x:10,
                        rotation: 720,
                        yoyo: true,
                        repeatDelay: 1,
                        repeat: 1
                    })
                );
            }
        });
        thirdPartTl.call(function(){
            $('#scrollIndicator').fadeIn(1000);
        });
        var scene_3 = new ScrollMagic.Scene({
            triggerElement: '#thirdPartDiv',
            reverse: false
        })
        .on('enter',slowDownStars)
        .setTween(thirdPartTl)
 //       .addIndicators()
        .addTo(sm_cont);
        
        function slowDownStars(e){

            params.speedScroller = false;
            params.speed = 10;
        }

        //Finale 
        const fourthPartGreeting = [
            'How should I begin this ending... ',
            'maybe I should start with',
            'how crazy our first meeting was',
            'bale,',
            'the concept is',
            ' ako ung blue particle',
            'then ikaw ung green.',
            'and the pink gravity balls',
            'are the events that happened in our lives',
            'which eventually ...',
            'lead to us meeting',
            'click anywhere. You\'ll see :) '
        ];

        var fourthPartTl = new TimelineMax();
        
        
        fourthPartTl.add(
            TweenLite.to(window, 3,
                {
                    scrollTo:{ y : "#fourthPartDiv", autoKill:false },
                    onStart(){
                        console.log('fourthPart');
                        $('#music').attr('src','https://rozelle18.github.io/greeting-project/assets/music/Kodaline-the-One.mp3');
                        // audio_1.setAttribute('src', 'assets/music/Kodaline-the-One.mp3');  
                        $('#sketch-holder').remove();
                        $('#scrollIndicator').fadeOut(1000);
                    }
                }
            )
        );

        fourthPartGreeting.forEach(function(v,i){
            $('#fourthpart-text-container').append('<div class="fp_fixed faded fpText_'+i+' stagger-text">'+v+'</div>');
            console.log(v.length/7);
            fourthPartTl.add(
                TweenMax.to('.fpText_'+i, v.length/17, {
                    display: "block",
                    opacity: 1,
                    scale: 0.75,
                    yoyo: true,
                    repeatDelay: 1,
                    repeat: 1
                })
            );
        });

        
        var scene_4 = new ScrollMagic.Scene({
            triggerElement: '#fourthPartDiv',
            reverse: false
        })
        .setTween(fourthPartTl)
//        .addIndicators()
        .addTo(sm_cont);
    })();


    // } else {
//     setInterval(function(){
//         if(!document.getElementById('music').playing)
//             location.reload();
//     },4000)

// }
});

