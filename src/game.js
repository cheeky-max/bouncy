var svgns = "http://www.w3.org/2000/svg";

var mouse_x = 0;
var mouse_y = 0;

var ball_pos_x = 0;
var ball_pos_y = 0;

var ball_vel_x = 0;
var ball_vel_y = 0;

var best_score = 0;
var current_score = 0;

function init()
{
    var width = window.innerWidth;
    var height = window.innerHeight;

    var svg = document.getElementById("gameSvg");
    svg.setAttribute("width", width + "px");
    svg.setAttribute("height", height + "px");

    var circle = document.createElementNS(svgns, 'circle');
    circle.setAttributeNS(null, 'cx', ball_pos_x = width / 2);
    circle.setAttributeNS(null, 'cy',ball_pos_y =    100);
    circle.setAttributeNS(null, 'r', 50);
    circle.setAttributeNS(null, 'style', 'fill: lightgrey; stroke: darkgrey; stroke-width: 5px;' );
    svg.appendChild(circle);

    var paddle = document.createElementNS(svgns, 'rect');
    paddle.setAttributeNS(null, 'x', (width / 2) - 50);
    paddle.setAttributeNS(null, 'y', height - 30);
    paddle.setAttributeNS(null, 'width', 100);
    paddle.setAttributeNS(null, 'height', 20);
    paddle.setAttributeNS(null, 'style', 'fill: darkred; stroke: lightred; stroke-width: 5px;' );
    svg.appendChild(paddle);

    var top_score = document.createElementNS(svgns, 'text');
    top_score.setAttributeNS(null, 'x', 5);
    top_score.setAttributeNS(null, 'y', 30);
    top_score.setAttributeNS(null, 'style', 'fill: green');
    top_score.innerHTML = "TOP SCORE: 0";
    svg.appendChild(top_score);

    var score = document.createElementNS(svgns, 'text');
    score.setAttributeNS(null, 'x', 5);
    score.setAttributeNS(null, 'y', 60);
    score.setAttributeNS(null, 'style', 'fill: green');
    score.innerHTML = "SCORE: 0";
    svg.appendChild(score);

    setInterval(() => tick(svg, width, height, circle, paddle, score, top_score), 10);

    svg.onmousemove = mouse;
}

function tick(svg, width, height, circle, paddle, score, top_score)
{
    paddle.setAttributeNS(null, 'x', mouse_x - 50);

    var ball_acc_x = 0;
    var ball_acc_y = 0.05;

    ball_vel_x += ball_acc_x;
    ball_vel_y += ball_acc_y;

    ball_pos_x += ball_vel_x;
    ball_pos_y += ball_vel_y;

    circle.setAttributeNS(null, "cx", ball_pos_x);
    circle.setAttributeNS(null, "cy", ball_pos_y);

    if (ball_pos_x - 50 <= 0 || ball_pos_x + 50 >= width)
    {
        // Sides
        ball_vel_x *= -1.0;
    }
    if (ball_pos_y - 50 <= 0)
    {
        // Top
        ball_vel_y *= -1.0;
    }

    if (ball_pos_y + 50 >= height -30 && Math.abs(mouse_x - ball_pos_x) <= 100)
    {
        // Bounce
        ball_vel_y *= -1.01;

        var delta = ball_pos_x - mouse_x;
        ball_vel_x = 0.001 * Math.pow(delta, 2) * Math.sign(delta);

        current_score++;
    }
    else if (ball_pos_y + 50 > height)
    {
        // Drop
        ball_pos_x = width / 2;
        ball_pos_y = 100;

        ball_vel_x = 0;
        ball_vel_y = 0;
        
        if (current_score > best_score)
        {
            best_score = current_score;
        }
        current_score = 0;
    }

    score.innerHTML = "SCORE: " + current_score;
    top_score.innerHTML = "TOP SCORE: " + best_score;
}

function mouse(mouseEvent)
{
    mouse_x = mouseEvent.screenX;
    mouse_y = mouseEvent.screenY; 
}