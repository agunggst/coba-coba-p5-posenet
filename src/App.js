import React from 'react';
import Sketch from "react-p5";
import * as ml5 from 'ml5'

function App() {
  // let x = 50
  // let y = 50

  // const setup = (p5, parent) => {
  //   p5.createCanvas(500, 500).parent(parent)
  // }
  // const draw = p5 => {
  //   p5.background(0)
  //   p5.ellipse(x, y, 70, 70)
  //   x++
  // }
  let video;
  let poseNet;
  let pose;
  let skeleton;
  let icon;

  function preload(p5){
    icon = p5.loadImage("https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_location_on_48px-512.png")
  }

  function setup(p5, parent) {
    p5.createCanvas(640, 480).parent(parent)
    video = p5.createCapture(p5.VIDEO).parent(parent)
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
  }

  function gotPoses(poses) {
    //console.log(poses);
    if (poses.length > 0) {
      pose = poses[0].pose;
      skeleton = poses[0].skeleton;
    }
  }

  function modelLoaded() {
    console.log('poseNet ready');
  }

  function draw(p5) {
    p5.translate(video.width,0)
    p5.scale(-1,1)
    p5.image(video, 0, 0);
    p5.image(icon, 0, 0, 50, 50)
    // p5.scale(-1.0,1.0);
    if (pose) {

      for (let i = 0; i < pose.keypoints.length; i++) {
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;
        p5.fill(0, 255, 0);
        p5.ellipse(x, y, 16, 16);
      }

      for (let i = 0; i < skeleton.length; i++) {
        let a = skeleton[i][0];
        let b = skeleton[i][1];
        p5.strokeWeight(2);
        p5.stroke(255);
        p5.line(a.position.x, a.position.y, b.position.x, b.position.y);
      }
    }
  }

  return (
    <div className="App">
      <Sketch preload={preload} setup={setup} draw={draw} />
    </div>
  );
}

export default App;
