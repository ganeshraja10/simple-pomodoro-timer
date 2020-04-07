const vscode = require("vscode");

let WORK_TIME = 25;
let REST_TIME = 5;

const vsCodeStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment["Right"], 10);

const startPomodoTimer = () => {
  vsCodeStatusBar.text = "Pomodo Started";
  vsCodeStatusBar.show();
  startWorkTimer();
};
const appendZero = (num) => (num <= 9 ? "0" + num : num);

const updateStatusBar = (min, sec, icon) => {
  vsCodeStatusBar.text = icon + " " + appendZero(min) + " : " + appendZero(sec);
};

const timer = (countDownTime, callEverySecond = null, counterisDone = null, icon = null) => {
  let countDownTimer = countDownTime;
  let timerId = setInterval(function () {
    countDownTimer -= 1000;
    let min = Math.floor(countDownTimer / (60 * 1000));
    let sec = Math.floor((countDownTimer - min * 60 * 1000) / 1000);

    if (countDownTimer <= 0) {
      clearInterval(timerId);
      if (counterisDone) counterisDone();
    } else {
      if (callEverySecond) callEverySecond(min, sec, icon);
    }
  }, 1000);
  // return timerId;
};

const startWorkTimer = () => {
  const pomodoCountDown = 5 * 60 * 1000;
  const tomatodIcon = "🍅";
  timer(pomodoCountDown, updateStatusBar, startRestTimer, tomatodIcon);
};
const pomodoDone = () => {
  vsCodeStatusBar.text = "Pomodo Done!!!";
};

const startRestTimer = () => {
  const restCountDown = 1 * 60 * 100;
  const restIcon = "🌴";
  timer(restCountDown, updateStatusBar, pomodoDone, restIcon);
};

exports.startPomodoTimer = startPomodoTimer;
