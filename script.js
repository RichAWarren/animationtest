var paneSize = 150;
var zDepth = paneSize / (2 * Math.tan(Math.PI/8));

function add() {
    degree = degree + 1;
}

function reset(deg) {
    $(".slot-machine").each(function(){
        var $panes = $("li", this);
        $panes.each(function(index){
            var depth = zDepth;
            var xAngle = ((45 * index) + deg) % 360;
            if (xAngle < 80 || xAngle > 280) {
                $(this).attr("style", "-webkit-transform: rotateX("+ xAngle +"deg) translateZ("+ depth +"px);");
            } else {
                $(this).css("display", "none")
            }
        });
    });
};

var degree = 0;
var lastDirection = '';
var maxV = 0;

reset(degree)

var body = document.querySelector('body');

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(body);

// let the pan gesture support all directions.
// this will block the vertical scrolling on a touch-device while on the element
mc.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });

// listen to events...
mc.on("panup pandown panend tap press", function(ev) {
    if (ev.type === 'panup') {
        degree += 3
        reset(degree)
        lastDirection = 'panup';
        if (ev.velocityY < maxV) {
            maxV = ev.velocityY;
        };
    }
    if (ev.type === 'pandown') {
        degree -= 3
        reset(degree)
        lastDirection = 'pandown';
        if (ev.velocityY > maxV) {
            maxV = ev.velocityY;
        };
    }
    if (ev.type === 'panend') {
        console.log(maxV)
        if (maxV < 0) {
            maxV = maxV * -1;
        }
        if (lastDirection === 'panup') {
            momentum('panup', maxV)
        } else {
            momentum('pandown', maxV)
        }
        maxV = 0;
    }
});

function momentum(direction, velocity) {
    if (velocity <= 0) {
        snap()
        return velocity;
    }
    var newVel = velocity - 0.3;
    if (direction === 'panup') {
        degree += (4 * newVel)
    }
    if (direction === 'pandown') {
        degree -= (4 * newVel)
    }
    reset(degree);
    setTimeout(function() {momentum(direction, newVel)}, 30);
}

function snap() {
    var diff = degree % 45
    if (diff < 22.5) {
        snapMove('down')
    } else {
        snapMove('up')
    }

}

function snapMove(direction) {
    if (direction === 'down') {
        degree -= 3
    }
    if (direction === 'up') {
        degree += 3
    }
    reset(degree)
    if (degree % 45 > 3) {
        setTimeout(function() {snapMove(degree)}, 30);
    } else {
        return degree;
    }
}
