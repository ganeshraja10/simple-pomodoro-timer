// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const Pomodo = require("./pomodo");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "simple-pomodo-timer" is now active!');
  // pomodo.startPomodoTimer(vscode);
  const pomodo = new Pomodo.pomodo();
  let startPomodoTimer = vscode.commands.registerCommand("extension.startPomodoTimer", () => pomodo.startPomodoTimer());
  let pausePomodoTimer = vscode.commands.registerCommand("extension.pausePomodoTimer", () => pomodo.pausePomodoTimer());

  context.subscriptions.push(startPomodoTimer, pausePomodoTimer);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
