/**
 * Created by LQL on 2016/8/7.
 */

var radius = 9;

var CANVAS_WIDTH = 1440;
var CANVAS_HEIGHT = 960;

var MARGIN_TOP = 100;
var MARGIN_LEFT = 100;

var endDate = new Date(2016,7,10,15,35,28);
var diffSeconds = 0;
var colors = ["#7FFF00","#6B8E23","#20B2AA","#E6E6FA","#ADFF2F","#FF00FF","#9400D3","#00FFFF","#FFEBCD","#7FFFD4"];
var balls = [];

(function () {
    var canvas = document.getElementById("drawing");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    if (canvas.getContext) {
        var context = canvas.getContext("2d");
        diffSeconds = currentTime();
        setInterval(function(){
            render(context);
            update();
        },100);
    }
})();


function addBalls( x , y , num){
    for(var i = 0 ; i < digits[num].length;i++)
        for(var j = 0 ; j < digits[num][i].length;j++){
            if(digits[num][i][j] == 1){
                var beginX = x + 2 * j * (radius + 1) + (radius + 1);
                var beginY = y + 2 * i * (radius + 1) + (radius + 1);
                var vX = Math.pow(-1 , parseInt(Math.random() * 100)) * 4;
                var color = colors[parseInt(Math.random() * 10)];
                var ball = {
                    beginX:beginX,
                    beginY:beginY,
                    vX:vX,
                    vY:2,
                    g:1.5 + Math.random(),
                    color:color
                }
                balls.push(ball);
            }
        }
}


function currentTime(){
    var currentDate = new Date();
    var end = endDate.getTime();
    var current = currentDate.getTime();
    var tmp = parseInt((end - current) / 1000);
    return tmp >=0 ? tmp : 0;
}



function update(){
    var nextTime = currentTime();
    var nextHour = parseInt(nextTime / 3600);
    var tmp = nextTime % 3600;
    var nextMinute = parseInt(tmp / 60);
    var nextSecond = parseInt(tmp % 60);


    var curHour = parseInt(diffSeconds / 3600);
    tmp = diffSeconds % 3600;
    var curMinute = parseInt(tmp / 60);
    var curSecond = parseInt(tmp % 60);

    if(curSecond != nextSecond){
        if(parseInt(nextHour / 10) != parseInt(curHour / 10)){
            addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(curHour / 10));
        }
        if(nextHour % 10 != curHour % 10){
            addBalls(MARGIN_LEFT + 150,MARGIN_TOP,curHour % 10);
        }
        if(parseInt(nextMinute / 10) != parseInt(curMinute / 10)){
            addBalls(MARGIN_LEFT + 370,MARGIN_TOP ,parseInt(curMinute / 10));
        }
        if(nextMinute % 10 != curMinute % 10){
            addBalls(MARGIN_LEFT + 520,MARGIN_TOP ,curMinute % 10);
        }
        if(parseInt(nextSecond / 10) != parseInt(curSecond / 10)){
            addBalls(MARGIN_LEFT + 740 , MARGIN_TOP , parseInt(curSecond / 10));
        }
        if(nextSecond % 10 != curSecond % 10){
            addBalls(MARGIN_LEFT + 890 , MARGIN_TOP , curSecond % 10);
        }
        diffSeconds = nextTime;
    }
    updateBalls();
}

function updateBalls(){
    for(var i = 0 ; i < balls.length ;i++){
        balls[i].beginX += balls[i].vX;
        balls[i].beginY += balls[i].vY;
        balls.vY += balls[i].g;
        if(balls[i].beginY >= (CANVAS_HEIGHT - radius)){
            balls[i].beginY = (CANVAS_HEIGHT - radius);
            balls[i].vY = -balls[i].vY * 0.75;
        }
    }
}



function render(context){

    context.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    for(var i = 0 ; i < balls.length ;i++){

        context.fillStyle = balls[i].color;
        context.beginPath();
        context.arc(balls[i].beginX,balls[i].beginY,radius,0 , 2 * Math.PI);
        context.closePath();

        context.fill();
    }

    var hour = parseInt(diffSeconds / 3600);
    var tmp = diffSeconds % 3600;
    var minute = parseInt(tmp / 60);
    var second = tmp % 60;
    context.fillStyle = "#0072E3";
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hour / 10), context);
    renderDigit(MARGIN_LEFT + 150,MARGIN_TOP,hour % 10,context);
    renderDigit(MARGIN_LEFT + 290,MARGIN_TOP,10,context);

    context.fillStyle = "#DC143C";
    renderDigit(MARGIN_LEFT + 370, MARGIN_TOP, parseInt(minute / 10), context);
    renderDigit(MARGIN_LEFT + 520,MARGIN_TOP,minute % 10,context);
    renderDigit(MARGIN_LEFT + 660,MARGIN_TOP,10,context);

    context.fillStyle = "#7FFF00";
    renderDigit(MARGIN_LEFT + 740, MARGIN_TOP, parseInt(second / 10), context);
    renderDigit(MARGIN_LEFT + 890,MARGIN_TOP,second % 10,context);


}

function renderDigit(x , y , index ,context){
    var digit = digits[index];

    for(var i = 0 ; i < digit.length;i++){
        for(var j = 0 ; j < digit[i].length;j++){
            if(digit[i][j] == 1){
                context.beginPath();
                context.arc(x + 2 * j * (radius + 1) +(radius + 1),y + 2 * i * (radius + 1) + (radius + 1),radius , 0 , 2 * Math.PI);
                context.closePath();
                context.fill();

            }
        }
    }
}