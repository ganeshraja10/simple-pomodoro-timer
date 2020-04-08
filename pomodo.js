const vscode = require("vscode");

const pomodo = class Pomodoro {
  constructor(context) {
    this.vsCodeStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment["Right"], 10);
    this.context = context;
  }
  startPomodoTimer() {
    this.vsCodeStatusBar.text = "Pomodo Started";
    this.vsCodeStatusBar.show();
    this.startWorkTimer();
  }
  appendZero(num) {
    return num <= 9 ? "0" + num : num;
  }

  timer(countDownTime, counterisDone = null, icon = null) {
    let countDownTimer = countDownTime;
    let that = this;
    let timerId = setInterval(() => {
      countDownTimer -= 1000;
      let min = Math.floor(countDownTimer / (60 * 1000));
      let sec = Math.floor((countDownTimer - min * 60 * 1000) / 1000);

      if (countDownTimer <= 0) {
        clearInterval(timerId);
        if (counterisDone) counterisDone();
      } else {
        that.vsCodeStatusBar.text = icon + " " + this.appendZero(min) + " : " + this.appendZero(sec);
      }
    }, 1000);
  }

  startWorkTimer() {
    const pomodoCountDown = 5 * 60 * 1000;
    const tomatodIcon = "🍅";
    this.vsCodeStatusBar.text = "xxx 2";
    this.timer(pomodoCountDown, this.startRestTimer, tomatodIcon);
  }

  pomodoDone() {
    this.vsCodeStatusBar.text = "Pomodo Done!!!";
  }

  startRestTimer() {
    const restCountDown = 1 * 60 * 100;
    const restIcon = "🌴";
    this.timer(restCountDown, this.pomodoDone, restIcon);
  }
};
exports.pomodo = pomodo;
