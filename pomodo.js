const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const POMODO_TIMER = 1;
const REST_TIMER = 2;

const restCountDown = 1 * 60 * 1000;
const pomodoCountDown = 1 * 60 * 1000;

const pomodo = class Pomodoro {
  constructor(context) {
    this.vsCodeStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment["Right"], 10);
    this.tick = 0;
    this.currentTimerID = null;
    this.currentAction = POMODO_TIMER;
    this.context = context;
    this.fileName = context.globalStoragePath + path.sep + "pomodo.txt";
  }
  startPomodoTimer() {
    if (this.tick <= 0) {
      this.vsCodeStatusBar.text = "Pomodo Started";
      this.vsCodeStatusBar.show();
      this.currentTime = new Date();
    }
    if (this.currentAction == POMODO_TIMER) this.startWorkTimer();
    else this.startRestTimer();
  }

  storeDataToFile() {
    fs.appendFile(this.fileName, this.currentTime + ",completed", (err) => console.log(err));
  }

  appendZero(num) {
    return num <= 9 ? "0" + num : num;
  }

  timer(countDownTime, timerType = POMODO_TIMER, icon = null) {
    let countDownTimer = countDownTime;
    let that = this;
    this.vsCodeStatusBar.command = "extension.pausePomodoTimer";
    let timerId = setInterval(() => {
      countDownTimer -= 1000;
      this.tick = countDownTimer;
      let min = Math.floor(countDownTimer / (60 * 1000));
      let sec = Math.floor((countDownTimer - min * 60 * 1000) / 1000);

      if (countDownTimer <= 0) {
        clearInterval(timerId);
        switch (timerType) {
          case POMODO_TIMER:
            this.startRestTimer();
            break;
          case REST_TIMER:
            this.vsCodeStatusBar.text = "Pomodo Done!!! Time to take rest";
            this.storeDataToFile();
            this.resetPomodoTimer();
        }
      } else {
        that.vsCodeStatusBar.text = icon + " " + this.appendZero(min) + " : " + this.appendZero(sec);
      }
    }, 1000);
    this.currentTimerID = timerId;
  }

  startWorkTimer() {
    const tomatodIcon = "🍅";
    this.timer(this.tick ? this.tick : pomodoCountDown, POMODO_TIMER, tomatodIcon);
  }

  startRestTimer() {
    this.currentAction = REST_TIMER;
    const restIcon = "🌴";
    this.timer(this.tick ? this.tick : restCountDown, REST_TIMER, restIcon);
  }
  pausePomodoTimer() {
    if (this.currentTimerID) {
      this.vsCodeStatusBar.text = "Pomodo Timer passed. Click to Resume";
      clearInterval(this.currentTimerID);
      switch (this.currentAction) {
        case POMODO_TIMER:
          this.vsCodeStatusBar.command = "extension.startPomodoTimer";
          break;
        case REST_TIMER:
          this.vsCodeStatusBar.command = "extension.startPomodoTimer";
          break;
      }
    }
  }

  resetPomodoTimer() {
    this.tick = 0;
    this.currentTimerID = null;
    this.currentAction = POMODO_TIMER;
  }
};

exports.pomodo = pomodo;
