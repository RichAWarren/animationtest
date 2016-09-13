var paneSize = 150;
var zDepth = paneSize / (2 * Math.tan(Math.PI/8));

function add() {
    degree = degree + 1;
}

function reset(deg, cb) {
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
    cb();
};

var degree = 0;
var lastDirection = '';

reset(degree, function(){})

var body = document.querySelector('body');

// create a simple instance
// by default, it only adds horizontal recognizers
// var mc = new Hammer(body);
var hammertime = new Hammer(body, options);

// let the pan gesture support all directions.
// this will block the vertical scrolling on a touch-device while on the element
hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });

// listen to events...
var options = {
    preventDefault: true
};
hammertime.on("swipeup swipedown", function(ev){
    console.log('swipe');
    if (ev.type === 'swipeup') {
        console.log(ev.velocityY);
        degree = degree + ev.velocityY * 100;
        reset(degree, function(){})
        lastDirection = 'panup';
    }
    if (ev.type === 'swipedown') {
        reset(degree, function(){})
        lastDirection = 'pandown';
    }
    // if (ev.type === 'panend') {
    //     if (lastDirection === 'panup') {
    //
    //     } else {
    //
    //     }
    // }
});

function momentum(direction) {

}
