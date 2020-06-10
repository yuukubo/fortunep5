// fortunep5

let game_title = "* fortunep5 * c2.1"
let [canvas_W, canvas_H] = [400, 400];
let fortune_X = canvas_W / 2;
let fortune_Y = canvas_H / 4;
let fortune_W = 200;
let fortune_H = 100;
let fortune_RGB = [150, 150, 150];
let is_fortune_on = 0;
let background_RGB = [230, 230 ,230];
let on_RGB = [250, 250, 250, 150];
let off_RGB = [50, 50, 50, 150];
let is_touch = 0;
let fortune_arr_org = ["大凶", "凶", "小吉", "中吉", "吉", "大吉"];
let fortune_tier = [5, 3, 1, 2, 4, 6];
let tier_probability = [5, 15, 40, 28, 10, 2];
let fortune = " ";
let fortune_arr = [];

for (let i=0; i<tier_probability.length; i++) {
  for (let j=0; j<tier_probability[i]; j++) {
    fortune_arr.push(fortune_arr_org[i]);
  }
}

function setup() {
  window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
  window.addEventListener("touchmove",  function (event) { event.preventDefault(); }, { passive: false });
  createCanvas(canvas_W, canvas_H);
  rectMode(CENTER);
}
 
function draw() {
  background(background_RGB[0], background_RGB[1], background_RGB[2]);
  set_game_title();
  set_fortune(fortune_RGB[0], fortune_RGB[1], fortune_RGB[2], fortune_X, fortune_Y, fortune_W, fortune_H);
  if (1 == is_touch) {
    touched();
    is_touch = 0;
  }
  set_pointer();
}

function set_pointer() {
  push();
  noStroke();
  fill(255, 255, 0)
  circle(mouseX, mouseY, 4);
  pop();
}

function touchStarted() {
  is_touch = 1;
}
function touched() {
  mousePressed();
  is_touch = 0;
}
function touchEnded() {
  is_touch = 0;
}
function mousePressed() {
  if ((fortune_X - fortune_W / 2 < mouseX && mouseX < fortune_X + fortune_W / 2) && (fortune_Y - fortune_H / 2 < mouseY && mouseY < fortune_Y + fortune_H / 2)) {
    if (is_fortune_on) {
      is_fortune_on = 0;
    } else {
      is_fortune_on = 1;
      fortune_telling();
    }
  }
}
function fortune_telling() {
  fortune = fortune_arr[Math.floor(Math.random() * fortune_arr.length)];
}

function set_fortune(fortune_R, fortune_G, fortune_B, fortune_X, fortune_Y, fortune_W, fortune_H, now) {
  push();
  noStroke();
  rectMode(CENTER);
  fill(fortune_R, fortune_G, fortune_B);
  rect(fortune_X, fortune_Y, fortune_W, fortune_H, 4);
  if (!is_fortune_on) {
    fill(fortune_R + 30, fortune_G + 30, fortune_B + 30);
    rect(fortune_X - 5, fortune_Y -5, fortune_W, fortune_H, 4);
    
    textSize(20);
    textFont("Crimson Text");
    textAlign(CENTER, CENTER);
    noStroke();
    fill(10);
    text(" 占う？ ", fortune_X, fortune_Y);
  } else {
    textSize(20);
    textFont("Crimson Text");
    textAlign(CENTER, CENTER);
    noStroke();
    fill(10);
    text(" あなたの運勢は ", fortune_X, fortune_Y);

    fill(fortune_R + 60, fortune_G + 60, fortune_B + 60);
    rect(fortune_X, fortune_Y * 2, fortune_W, fortune_H, 4);
    
    textSize(20);
    textFont("Crimson Text");
    textAlign(CENTER, CENTER);
    noStroke();
    fill(10);
    text(fortune, fortune_X, fortune_Y * 2);
  }

  pop();
}

function set_game_title() {
  push();
  textSize(10);
  textFont("Comic Sans MS");
  textAlign(CENTER, CENTER);
  noStroke();
  fill(10);
  text(game_title, canvas_W * 17 / 20, canvas_H -20);
  pop();
}
