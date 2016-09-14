var paneSize = 220;
var zDepth = paneSize / (2 * Math.tan(Math.PI/8));
var degree = 0;
var lastDirection = '';
var maxV = 0;

reset(degree)

function reset(deg) {
    var panes = [].slice.call(document.getElementsByTagName('LI'))
    panes.forEach(function(el, index) {
        if (degree < 0) degree = 360 + degree;
        var depth = zDepth;
        var xAngle = ((45 * index) + deg) % 360;
        if (xAngle < 70 || xAngle > 280) {
            panes[index].style.display = "block";
            panes[index].style.webkitTransform = "rotateX("+ xAngle +"deg) translateZ("+ depth +"px)";
        } else {
            panes[index].style.display = "none";
        }
    })
}


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
    if (velocity <= 3) {
        clearTimeout(tout)
        var tout = setTimeout(function(){snapMove(direction)}, 50)
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

function snapMove(direction) {
    if (direction === 'pandown') {
        degree -= 3
    }
    if (direction === 'panup') {
        degree += 3
    }
    reset(degree)
    if (degree % 45 > 3) {
        setTimeout(function() {snapMove(direction)}, 30);
    } else {
        return degree;
    }
}
