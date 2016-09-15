var questions = [{
    activity: '0 leicester hard cheese emmental. Cheese strings brie cream cheese st. agur blue cheese cottage cheese queso boursin bavarian bergkase. Cheese triangles smelly cheese fromage frais cheese on toast stinking bishop macaroni cheese babybel pecorino.',
    score: 1,
    colour: '#63D1F4',
    tag: 'red leicester'
}, {
    activity: '1 leicester hard cheese emmental. Cheese strings brie cream cheese st. agur blue cheese cottage cheese queso boursin bavarian bergkase. Cheese triangles smelly cheese fromage frais cheese on toast stinking bishop macaroni cheese babybel pecorino.',
    score: 1,
    colour: '#ef5350',
    tag: 'red leicester'
}, {
    activity: '2 leicester hard cheese emmental. Cheese strings brie cream cheese st. agur blue cheese cottage cheese queso boursin bavarian bergkase. Cheese triangles smelly cheese fromage frais cheese on toast stinking bishop macaroni cheese babybel pecorino.',
    score: 1,
    colour: '#9575cd',
    tag: 'red leicester'
}, {
    activity: '3 leicester hard cheese emmental. Cheese strings brie cream cheese st. agur blue cheese cottage cheese queso boursin bavarian bergkase. Cheese triangles smelly cheese fromage frais cheese on toast stinking bishop macaroni cheese babybel pecorino.',
    score: 1,
    colour: '#4db6ac',
    tag: 'red leicester'
}, {
    activity: '4 leicester hard cheese emmental. Cheese strings brie cream cheese st. agur blue cheese cottage cheese queso boursin bavarian bergkase. Cheese triangles smelly cheese fromage frais cheese on toast stinking bishop macaroni cheese babybel pecorino.',
    score: 1,
    colour: '#81c784',
    tag: 'red leicester'
}, {
    activity: '5 leicester hard cheese emmental. Cheese strings brie cream cheese st. agur blue cheese cottage cheese queso boursin bavarian bergkase. Cheese triangles smelly cheese fromage frais cheese on toast stinking bishop macaroni cheese babybel pecorino.',
    score: 1,
    colour: '#a1887f',
    tag: 'red leicester'
}, {
    activity: '6 leicester hard cheese emmental. Cheese strings brie cream cheese st. agur blue cheese cottage cheese queso boursin bavarian bergkase. Cheese triangles smelly cheese fromage frais cheese on toast stinking bishop macaroni cheese babybel pecorino.',
    score: 1,
    colour: '#fff176',
    tag: 'red leicester'
}, {
    activity: '7 leicester hard cheese emmental. Cheese strings brie cream cheese st. agur blue cheese cottage cheese queso boursin bavarian bergkase. Cheese triangles smelly cheese fromage frais cheese on toast stinking bishop macaroni cheese babybel pecorino.',
    score: 1,
    colour: '#ffb74d',
    tag: 'red leicester'
}, {
    activity: '8 leicester hard cheese emmental. Cheese strings brie cream cheese st. agur blue cheese cottage cheese queso boursin bavarian bergkase. Cheese triangles smelly cheese fromage frais cheese on toast stinking bishop macaroni cheese babybel pecorino.',
    score: 1,
    colour: '#bdbdbd',
    tag: 'red leicester'
}, {
    activity: '9 leicester hard cheese emmental. Cheese strings brie cream cheese st. agur blue cheese cottage cheese queso boursin bavarian bergkase. Cheese triangles smelly cheese fromage frais cheese on toast stinking bishop macaroni cheese babybel pecorino.',
    score: 1,
    colour: '#f06292',
    tag: 'red leicester'
}]

var index = 0;

document.getElementById('minus').style.display = 'none'
document.getElementById('questionText').innerHTML = questions[index].activity
document.getElementById('okay').style.display = 'none';

document.getElementById('plus').addEventListener('click', function () {
    if (questions[index].score < 5 && questions[index].score > 0) questions[index].score++
    clearArrows();
    clear();
    render();
})

document.getElementById('minus').addEventListener('click', function () {
    if (questions[index].score <= 5 && questions[index].score >= 2) questions[index].score--
    clearArrows();
    clear();
    render();
})

document.getElementById('rightArrow').addEventListener('click', function () {
    if (index === 9) {
        document.getElementById('okay').style.display = 'block';
        return true;
    }
    index ++
    document.getElementById('questionText').innerHTML = questions[index].activity
    clear();
    render();
    clearArrows();
})

document.getElementById('leftArrow').addEventListener('click', function () {
    if (index === 0) return true
    index --
    document.getElementById('questionText').innerHTML = questions[index].activity
    clear();
    render();
    clearArrows();
})

function clearArrows() {
    if (questions[index].score === 5) document.getElementById('plus').style.display = 'none'
    if (questions[index].score !== 1) document.getElementById('minus').style.display = 'block'
    if (questions[index].score === 1) document.getElementById('minus').style.display = 'none'
    if (questions[index].score !== 5) document.getElementById('plus').style.display = 'block'
}

// canvas

var canvas = document.getElementById('ballCanvas');
var context = canvas.getContext('2d');

canvas.width = window.screen.width
canvas.height = window.screen.height / 2

var centerX = canvas.width / 2;
var centerY = canvas.height / 2;

function render () {
    context.beginPath();
    context.arc(centerX, centerY, canvas.width / ((6 - questions[index].score) * 1.75 + 1.75), 0, 2 * Math.PI, false);
    context.fillStyle = questions[index].colour;
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = '#292f33';
    context.stroke();

    context.beginPath();
    context.arc((centerX - canvas.width / ((6 - questions[index].score) * 1.75 + 1.75) / 3.5) , (centerY - canvas.width / ((6 - questions[index].score) * 1.75 + 1.75) / 3.5), (canvas.width / ((6 - questions[index].score) * 1.75 + 1.75) / 5), 0, 2 * Math.PI, false);
    context.fillStyle = 'white';
    context.fill();
}

function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height)
}

render();
