song = "";
scoreRightWrist = 0;
scoreLeftWrist = 0;
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;


function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelloaded);
    posenet.on("pose", getresults);
}

function modelloaded() {
    console.log("model has loaded");
}

function draw() {
    image(video, 0, 0, 600, 500);
    stroke("blue");
    fill("blue");
    circle(rightWristX, rightWristY, 25);

    if (rightWristY > 0 && rightWristY < 125) {
        song.rate(0.5);
        document.getElementById("speed").innerHTML = "speed : 0.5x";
    }

    if (rightWristY > 125 && rightWristY < 250) {
        song.rate(1);
        document.getElementById("speed").innerHTML = "speed : 1x";
    }

    if (rightWristY > 250 && rightWristY < 375) {
        song.rate(1.5);
        document.getElementById("speed").innerHTML = "speed : 1.5x";
    }

    if (rightWristY > 375 && rightWristY < 500) {
        song.rate(2);
        document.getElementById("speed").innerHTML = "speed : 2x";
    }

    circle(leftWristX, leftWristY, 25);
    leftWristynumber = Number(leftWristY);
    leftwristywholenumber = floor(leftWristynumber);
    volume = leftwristywholenumber / 500;
    song.setVolume(volume);
    document.getElementById("volume").innerHTML = "volume : " + volume;

}

function getresults(arrayresults) {

    if (arrayresults.length > 0) {
        console.log(arrayresults);
        scoreLeftWrist = arrayresults[0].pose.keypoints[9].score;
        rightWristY = arrayresults[0].pose.rightWrist.y;
        rightWristX = arrayresults[0].pose.rightWrist.x;
        leftWristX = arrayresults[0].pose.leftWrist.x;
        leftWristY = arrayresults[0].pose.leftWrist.y
        scoreRightWrist = arrayresults[0].pose.keypoints[10].score;
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}