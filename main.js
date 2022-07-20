song = "";

score_right_wrist = 0;
score_left_wrist = 0;

right_wristX = 0;
right_wristY = 0;

left_wristX = 0;
left_wristY = 0;

function preload(){  
    song = loadSound("music.mp3"); 
}

function setup() {
    canvas = createCanvas(600,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function  modelLoaded(){
    console.log("poseNet is initialized");
}
 
function draw(){
    image(video, 0, 0, 600, 400);

    fill("pink");
    stroke("pink");

    if(score_right_wrist>0){
        circle(right_wristX, right_wristY, 20);
        if (right_wristY>0 && right_wristY<=100) {
            document.getElementById("speed").innerHTML="Speed:0.5x";
            song.rate(0.5);
        }
        else if (right_wristY>100 && right_wristY<=200) {
            document.getElementById("speed").innerHTML="Speed:1x";
            song.rate(1);
        }
        else if (right_wristY>200 && right_wristY<=300) {
            document.getElementById("speed").innerHTML="Speed:1.5x";
            song.rate(1.5);
        }
        else if (right_wristY>300 && right_wristY<=400) {
            document.getElementById("speed").innerHTML="Speed:2x";
            song.rate(2);
        }
        else if (right_wristY>400) {
            document.getElementById("speed").innerHTML="Speed:2.5x";
            song.rate(2.5);
        }
    }
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        score_left_wrist = results[0].pose.keypoints[9].score;
        score_right_wrist = results[0].pose.keypoints[10].score;

        left_wristX = results[0].pose.leftWrist.x;
        left_wristY = results[0].pose.leftWrist.y;

        right_wristX = results[0].pose.rightWrist.x;
        right_wristX = results[0].pose.rightWrist.y;
    }

    else{
        console.log("code has error");
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop(){
    song.stop();
}