import * as vscode from 'vscode';

var is_active: Boolean = false;
var buttons: vscode.StatusBarItem[] = [];

export function activate(context: vscode.ExtensionContext) {

	// Create a button for each symbol
	const symbols = ['#', '-', '*', '/', "'", '"', '`', '[', ']', '{', '}', '(', ')', '<', '>', '=', '+', '!', '@', '$', '%', '^', '&', '|', '~', '?', ':', ';', ',', '.', '_'];
	symbols.forEach(symbol => {
		console.log(`Creating command for ${symbol}`);
		const symbolButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10);
		symbolButton.text = symbol;
		symbolButton.command = `symbolButton.insert${symbol}`;
		symbolButton.tooltip = `Insert ${symbol}`;
		buttons.push(symbolButton);
		context.subscriptions.push(vscode.commands.registerCommand(`symbolButton.insert${symbol}`, () => {
			console.log(`symbolButton.insert${symbol} called`);
			const editor = vscode.window.activeTextEditor;
			if (editor) {
				editor.edit(editBuilder => {
					editBuilder.insert(editor.selection.active, symbol);
				});
			}
		}));
	});

	// Register the command to show the buttons
	context.subscriptions.push(
		vscode.commands.registerCommand('symbol-button.showSymbolButtons', () => {
			if (is_active) {
				vscode.window.showInformationMessage('Symbol Buttons Already Activated');
			} else {
				vscode.window.showInformationMessage('Symbol Buttons Activated');
				buttons.forEach(button => {button.show();});
				is_active = true;
			}
		})
	);
	context.subscriptions.push(
		vscode.commands.registerCommand('symbol-button.hideSymbolButtons', () => {
			if (is_active) {
				vscode.window.showInformationMessage('Symbol Buttons Deactivated');
				buttons.forEach(button => {button.hide();});
				is_active = false;
			} else {
				vscode.window.showInformationMessage('Symbol Buttons Already Deactivated');
			}
		})
	);
}

// This method is called when your extension is deactivated
export function deactivate() {}
