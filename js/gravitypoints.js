$(document).ready(function(){
    console.log('gravity points ready');




    function startCollapsedShow(){
        $('#gravitypoint-sketch-holder').fadeOut(2000,function(){
            console.log('Final Timeline');
            let aGreeting = [
                'final greeting for testing',
                'henlo'
            ];
            var firstPartTl = new TimelineMax();
            firstPartTl.add(
                TweenLite.to(window, 1,
                    {
                        scrollTo:{ y : "#fourthPartDiv" }
                    }
                ), 1
            );
    
            aGreeting.forEach(function(v,i){
                $('#fourthPartDiv').append('<div class="faded fourthPartText_'+i+' stagger-text">'+v+'</div>');
                console.log(v.length/7);
                firstPartTl.add(
                    TweenMax.to('.fourthPartText_'+i, v.length/15, {
                        display: "block",
                        opacity: 1,
                        yoyo: true,
                        repeatDelay: 1,
                        repeat: 1
                    })
                );
            });
    
        })
    }





    /**
     * requestAnimationFrame
     */
    window.requestAnimationFrame = (function(){
        return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();


    /**
     * Vector
     */
    function Vector(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    Vector.add = function(a, b) {
        return new Vector(a.x + b.x, a.y + b.y);
    };

    Vector.sub = function(a, b) {
        return new Vector(a.x - b.x, a.y - b.y);
    };

    Vector.scale = function(v, s) {
        return v.clone().scale(s);
    };

    Vector.random = function() {
        return new Vector(
            Math.random() * 2 - 1,
            Math.random() * 2 - 1
        );
    };

    Vector.prototype = {
        set: function(x, y) {
            if (typeof x === 'object') {
                y = x.y;
                x = x.x;
            }
            this.x = x || 0;
            this.y = y || 0;
            return this;
        },

        add: function(v) {
            this.x += v.x;
            this.y += v.y;
            return this;
        },

        sub: function(v) {
            this.x -= v.x;
            this.y -= v.y;
            return this;
        },

        scale: function(s) {
            this.x *= s;
            this.y *= s;
            return this;
        },

        length: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },

        lengthSq: function() {
            return this.x * this.x + this.y * this.y;
        },

        normalize: function() {
            var m = Math.sqrt(this.x * this.x + this.y * this.y);
            if (m) {
                this.x /= m;
                this.y /= m;
            }
            return this;
        },

        angle: function() {
            return Math.atan2(this.y, this.x);
        },

        angleTo: function(v) {
            var dx = v.x - this.x,
                dy = v.y - this.y;
            return Math.atan2(dy, dx);
        },

        distanceTo: function(v) {
            var dx = v.x - this.x,
                dy = v.y - this.y;
            return Math.sqrt(dx * dx + dy * dy);
        },

        distanceToSq: function(v) {
            var dx = v.x - this.x,
                dy = v.y - this.y;
            return dx * dx + dy * dy;
        },

        lerp: function(v, t) {
            this.x += (v.x - this.x) * t;
            this.y += (v.y - this.y) * t;
            return this;
        },

        clone: function() {
            return new Vector(this.x, this.y);
        },

        toString: function() {
            return '(x:' + this.x + ', y:' + this.y + ')';
        }
    };


    /**
     * GravityPoint
     */
    function GravityPoint(x, y, radius, targets) {
        Vector.call(this, x, y);
        this.radius = radius;
        this.currentRadius = radius * 0.5;

        this._targets = {
            particles: targets.particles || [],
            gravities: targets.gravities || []
        };
        this._speed = new Vector();
    }

    GravityPoint.RADIUS_LIMIT = 10;
    GravityPoint.interferenceToPoint = true;
    GP_COLLAPSED = false;
    GravityPoint.prototype = (function(o) {
        var s = new Vector(0, 0), p;
        for (p in o) s[p] = o[p];
        return s;
    })({
        gravity:       0.05,
        isMouseOver:   false,
        dragging:      false,
        destroyed:     false,
        _easeRadius:   0,
        _dragDistance: null,
        _collapsing:   false,
        hitTest: function(p) {
            return this.distanceTo(p) < this.radius;
        },

        startDrag: function(dragStartPoint) {
            this._dragDistance = Vector.sub(dragStartPoint, this);
            this.dragging = true;
        },

        drag: function(dragToPoint) {
            this.x = dragToPoint.x - this._dragDistance.x;
            this.y = dragToPoint.y - this._dragDistance.y;
        },

        endDrag: function() {
            this._dragDistance = null;
            this.dragging = false;
        },

        addSpeed: function(d) {
            this._speed = this._speed.add(d);
        },

        collapse: function(e) {
            this.currentRadius *= 1.75;
            this._collapsing = true;
            if(!GP_COLLAPSED){
                startCollapsedShow();
                GP_COLLAPSED = true;
            }
        },

        render: function(ctx) {
            if (this.destroyed) return;

            var particles = this._targets.particles,
                i, len;

            for (i = 0, len = particles.length; i < len; i++) {
                particles[i].addSpeed(Vector.sub(this, particles[i]).normalize().scale(this.gravity));
            }

            this._easeRadius = (this._easeRadius + (this.radius - this.currentRadius) * 0.07) * 0.95;
            this.currentRadius += this._easeRadius;
            if (this.currentRadius < 0) this.currentRadius = 0;

            if (this._collapsing) {
                this.radius *= 0.75;
                if (this.currentRadius < 1) {
                    this.destroyed = true;    
                    console.log('collapsing giant star');

                }
                this._draw(ctx);
                
                return;
            }

            var gravities = this._targets.gravities,
                g, absorp,
                area = this.radius * this.radius * Math.PI, garea;

            for (i = 0, len = gravities.length; i < len; i++) {
                g = gravities[i];

                if (g === this || g.destroyed) continue;

                if (
                    (this.currentRadius >= g.radius || this.dragging) &&
                    this.distanceTo(g) < (this.currentRadius + g.radius) * 0.85
                ) {
                    g.destroyed = true;
                    this.gravity += g.gravity;

                    absorp = Vector.sub(g, this).scale(g.radius / this.radius * 0.5);
                    this.addSpeed(absorp);

                    garea = g.radius * g.radius * Math.PI;
                    this.currentRadius = Math.sqrt((area + garea * 3) / Math.PI);
                    this.radius = Math.sqrt((area + garea) / Math.PI);
                }

                g.addSpeed(Vector.sub(this, g).normalize().scale(this.gravity));
            }

            if (GravityPoint.interferenceToPoint && !this.dragging)
                this.add(this._speed);

            this._speed = new Vector();

            if (this.currentRadius > GravityPoint.RADIUS_LIMIT) this.collapse();

            this._draw(ctx);
        },

        _draw: function(ctx) {
            var grd, r;

            ctx.save();

            grd = ctx.createRadialGradient(this.x, this.y, this.radius, this.x, this.y, this.radius * 5);
            grd.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
            grd.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 5, 0, Math.PI * 2, false);
            ctx.fillStyle = grd;
            ctx.fill();

            r = Math.random() * this.currentRadius * 0.7 + this.currentRadius * 0.3;
            grd = ctx.createRadialGradient(this.x, this.y, r, this.x, this.y, this.currentRadius);
            //gravity ball
            grd.addColorStop(0, 'rgba(255,150,255, .6)');
            grd.addColorStop(1, Math.random() < 0.2 ? 'rgba(255, 0, 0, 0.5)' : 'rgba(255, 100, 0, 0.75)');
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2, false);
            ctx.fillStyle = grd;
            ctx.fill();
            ctx.restore();
        }
    });


    /**
     * Particle
     */
    function Particle(x, y, radius) {
        Vector.call(this, x, y);
        this.radius = radius;
        this._latest = new Vector();
        this._speed  = new Vector();
    }

    Particle.prototype = (function(o) {
        var s = new Vector(0, 0), p;
        for (p in o) s[p] = o[p];
        return s;
    })({
        addSpeed: function(d) {
            this._speed.add(d);
        },

        update: function() {
            if (this._speed.length() > 12) this._speed.normalize().scale(12);

            this._latest.set(this);
            this.add(this._speed);
        }

        // render: function(ctx) {
        //     if (this._speed.length() > 12) this._speed.normalize().scale(12);

        //     this._latest.set(this);
        //     this.add(this._speed);

        //     ctx.save();
        //     ctx.fillStyle = ctx.strokeStyle = '#fff';
        //     ctx.lineCap = ctx.lineJoin = 'round';
        //     ctx.lineWidth = this.radius * 2;
        //     ctx.beginPath();
        //     ctx.moveTo(this.x, this.y);
        //     ctx.lineTo(this._latest.x, this._latest.y);
        //     ctx.stroke();
        //     ctx.beginPath();
        //     ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        //     ctx.fill();
        //     ctx.restore();
        // }
    });



// Initialize

    (function() {

        // Configs

        var BACKGROUND_COLOR      = 'rgba(0, 0, 0, .1)',
            PARTICLE_RADIUS       = 1,
            G_POINT_RADIUS        = 10,
            G_POINT_RADIUS_LIMITS = 50,
            ELLE_PARTICLE         = 'rgba(0, 255, 0, 1)';
            ZOR_PARTICLE          = 'rgba(51, 204, 255, 1)';


        // Vars

        var canvas, context,
            bufferCvs, bufferCtx,
            screenWidth, screenHeight,
            mouse = new Vector(),
            gravities = [],
            particles = [],
            grad,
            control;
            //gui


        // Event Listeners

        function resize(e) {
            screenWidth  = canvas.width  = window.innerWidth;
            screenHeight = canvas.height = window.innerHeight;
            bufferCvs.width  = screenWidth;
            bufferCvs.height = screenHeight;
            context   = canvas.getContext('2d');
            bufferCtx = bufferCvs.getContext('2d');

            var cx = canvas.width * 0.5,
                cy = canvas.height * 0.5;

            grad = context.createRadialGradient(cx, cy, 0, cx, cy, Math.sqrt(cx * cx + cy * cy));
            grad.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
            grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }

        function mouseMove(e) {
            mouse.set(e.clientX, e.clientY);

            var i, g, hit = false;
            for (i = gravities.length - 1; i >= 0; i--) {
                g = gravities[i];
                if ((!hit && g.hitTest(mouse)) || g.dragging)
                    g.isMouseOver = hit = true;
                else
                    g.isMouseOver = false;
            }

            canvas.style.cursor = hit ? 'pointer' : 'default';
        }

        function mouseDown(e) {
            for (var i = gravities.length - 1; i >= 0; i--) {
                if (gravities[i].isMouseOver) {
                    gravities[i].startDrag(mouse);
                    return;
                }
            }
            gravities.push(new GravityPoint(e.clientX, e.clientY, G_POINT_RADIUS, {
                particles: particles,
                gravities: gravities
            }));
        }

        function mouseUp(e) {
            for (var i = 0, len = gravities.length; i < len; i++) {
                if (gravities[i].dragging) {
                    gravities[i].endDrag();
                    break;
                }
            }
        }

        function doubleClick(e) {
            for (var i = gravities.length - 1; i >= 0; i--) {
                if (gravities[i].isMouseOver) {
                    gravities[i].collapse();
                    break;
                }
            }
        }


        // Functions

        function addParticle(num) {
            var i, p;
            for (i = 0; i < num; i++) {
                p = new Particle(
                    Math.floor(Math.random() * screenWidth - PARTICLE_RADIUS * 2) + 1 + PARTICLE_RADIUS,
                    Math.floor(Math.random() * screenHeight - PARTICLE_RADIUS * 2) + 1 + PARTICLE_RADIUS,
                    PARTICLE_RADIUS
                );
                p.addSpeed(Vector.random());
                particles.push(p);
            }
        }


        // GUI Control

        control = {
            particleNum: 2
        };


        // Init

        canvas  = document.getElementById('gravitypoint-sketch-holder');
        bufferCvs = document.createElement('canvas');

        window.addEventListener('resize', resize, false);
        resize(null);

        addParticle(control.particleNum);

        canvas.addEventListener('mousemove', mouseMove, false);
        canvas.addEventListener('mousedown', mouseDown, false);
        canvas.addEventListener('mouseup', mouseUp, false);
        canvas.addEventListener('dblclick', doubleClick, false);


        // GUI
        //
        // gui = new dat.GUI();
        // gui.add(control, 'particleNum', 0, 500).step(1).name('Particle Num').onChange(function() {
        //     var n = (control.particleNum | 0) - particles.length;
        //     if (n > 0)
        //         addParticle(n);
        //     else if (n < 0)
        //         removeParticle(-n);
        // });
        // gui.add(GravityPoint, 'interferenceToPoint').name('Interference Between Point');
        // gui.close();


        // Start Update
                
        // Gradient canvas
        var hs_w = screenWidth/2,
        hs_h = screenHeight/2;
        var grd2 = context.createRadialGradient(
            hs_w,hs_h,screenWidth/5,
            hs_w,hs_h,screenHeight/6
        );
        grd2.addColorStop(0.5,"black");
        grd2.addColorStop(.7,"white");
        //
        var loop = function() {
            var i, len, g, p;

            context.save();
            //Apply Gradient canvas
            context.fillStyle = grd2;
            context.fillRect(0, 0, screenWidth, screenHeight);
            context.fillStyle = grad;
            context.fillRect(0, 0, screenWidth, screenHeight);
            //
            context.restore();

            for (i = 0, len = gravities.length; i < len; i++) {
                g = gravities[i];
                if (g.dragging) g.drag(mouse);
                g.render(context);
                if (g.destroyed) {
                    gravities.splice(i, 1);
                    len--;
                    i--;
                }
            }

            bufferCtx.save();
            bufferCtx.globalCompositeOperation = 'destination-out';
            bufferCtx.globalAlpha = 0.35;
            bufferCtx.fillRect(0, 0, screenWidth, screenHeight);
            bufferCtx.restore();

            // パーティクルをバッファに描画
            // for (i = 0, len = particles.length; i < len; i++) {
            //     particles[i].render(bufferCtx);
            // }
            len = particles.length;
            bufferCtx.save();
            //particle color
            bufferCtx.fillStyle = 'rgba(255,255,255,.4)';
            bufferCtx.lineCap = bufferCtx.lineJoin = 'round';
            bufferCtx.lineWidth = PARTICLE_RADIUS * 2;
            bufferCtx.beginPath();
            for (i = 0; i < len; i++) {
                p = particles[i];
                p.update();
                if(i==0){
                    bufferCtx.strokeStyle = ELLE_PARTICLE;
                } else if (i==1){
                    bufferCtx.strokeStyle = ZOR_PARTICLE;
                }
                bufferCtx.moveTo(p.x, p.y);
                bufferCtx.lineTo(p._latest.x, p._latest.y);
                bufferCtx.stroke();
                bufferCtx.beginPath();   
            }
            for (i = 0; i < len; i++) {
                p = particles[i];
                bufferCtx.moveTo(p.x, p.y);
                bufferCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
            }
            bufferCtx.fill();
            bufferCtx.restore();

            context.drawImage(bufferCvs, 0, 0);

            requestAnimationFrame(loop);
        };
        loop();

    })();

});