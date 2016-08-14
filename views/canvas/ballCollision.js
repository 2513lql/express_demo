/**
 * Created by LQL on 2016/8/7.
 */

var balls = [];
var colors = ["#7FFF00","#6B8E23","#20B2AA","#E6E6FA","#ADFF2F","#FF00FF","#9400D3","#00FFFF","#FFEBCD","#7FFFD4"];


(function () {


    var canvas = document.getElementById("drawing");

    if (canvas.getContext) {
        var context = canvas.getContext("2d");
        getBalls();
        setInterval(function () {
            renderBall(context);
            update(context);
        }, 50);
    }


})();

function renderBall(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    for(var i = 0 ; i < balls.length;i++) {
        context.beginPath();
        context.fillStyle = balls[i].color;
        context.arc(balls[i].beginX, balls[i].beginY, balls[i].radius, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
    }
}

function update(context) {
    for(var i = 0 ; i < balls.length;i++) {
        balls[i].beginX = balls[i].beginX + balls[i].vX;
        balls[i].beginY = balls[i].beginY + balls[i].vY;
        balls[i].vY += balls[i].g;
        if (balls[i].beginY >= (context.canvas.height - balls[i].radius)) {
            balls[i].vY = -balls[i].vY;
        }
        if (balls[i].beginX >= (context.canvas.width - balls[i].radius)) {
            balls[i].vX = -balls[i].vX;
        }
        if (balls[i].beginX <= balls[i].radius) {
            balls[i].vX = -balls[i].vX;
        }
        if (balls[i].beginY <= balls[i].radius) {

            balls[i].vY = 2;
        }
    }
}

function getBalls() {
    for(var i = 0 ; i < 10;i++){
        var beginX = parseInt(Math.random() * 1000 + 200);
        var beginY = parseInt(Math.random() * 500 + 100);
        var radius = parseInt(Math.random() * 20 + 20);
        var color = parseInt(Math.random() * 10);
        var vX = parseInt(Math.random() * 16 - 8);
        var vY = parseInt(Math.random() * 16 - 8);
        var ball = {
            beginX: beginX,
            beginY: beginY,
            radius: radius,
            vX: vX,
            vY: vY,
            g: 0.5,
            color:colors[color],
        };
        balls.push(ball);
    }
}
