var paneSize = 150;
var zDepth = paneSize / (2 * Math.tan(Math.PI/8));

var add = function() {
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

reset(degree, function(){})

var body = document.querySelector('body');

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(body);

// let the pan gesture support all directions.
// this will block the vertical scrolling on a touch-device while on the element
mc.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });

// listen to events...
mc.on("panleft panright panup pandown tap press", function(ev) {
    if (ev.type === 'panup') {
        degree += 5
        reset(degree, function(){})
    }
    if (ev.type === 'pandown') {
        degree -= 5
        reset(degree, function(){})
    }
});
