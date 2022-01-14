"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode_1 = require("vscode");
const documentDecorationManager_1 = require("./documentDecorationManager");
function activate(context) {
    const configuration = vscode_1.workspace.getConfiguration("bracket-pair-colorizer-2", undefined);
    let noticeKey = "depreciation-notice";
    var showNotice = configuration.get(noticeKey);
    if (showNotice) {
        vscode_1.window.showInformationMessage("Bracket Pair Colorizer is no longer being maintained.", { title: "Learn more" }, { title: "Don't show again" }).then(e => {
            if ((e === null || e === void 0 ? void 0 : e.title) == "Learn more") {
                vscode_1.env.openExternal(vscode_1.Uri.parse('https://github.com/CoenraadS/Bracket-Pair-Colorizer-2#readme'));
            }
            if ((e === null || e === void 0 ? void 0 : e.title) == "Don't show again") {
                configuration.update(noticeKey, false, true);
            }
        });
    }
    let documentDecorationManager = new documentDecorationManager_1.default();
    vscode_1.extensions.onDidChange(() => restart());
    context.subscriptions.push(vscode_1.commands.registerCommand("bracket-pair-colorizer-2.expandBracketSelection", () => {
        const editor = vscode_1.window.activeTextEditor;
        if (!editor) {
            return;
        }
        documentDecorationManager.expandBracketSelection(editor);
    }), vscode_1.commands.registerCommand("bracket-pair-colorizer-2.undoBracketSelection", () => {
        const editor = vscode_1.window.activeTextEditor;
        if (!editor) {
            return;
        }
        documentDecorationManager.undoBracketSelection(editor);
    }), vscode_1.workspace.onDidChangeConfiguration((event) => {
        if (event.affectsConfiguration("bracket-pair-colorizer-2") ||
            event.affectsConfiguration("editor.lineHeight") ||
            event.affectsConfiguration("editor.fontSize")) {
            restart();
        }
    }), vscode_1.window.onDidChangeVisibleTextEditors(() => {
        documentDecorationManager.updateAllDocuments();
    }), vscode_1.workspace.onDidChangeTextDocument((event) => {
        if (event.contentChanges.length > 0) {
            documentDecorationManager.onDidChangeTextDocument(event);
        }
    }), vscode_1.workspace.onDidCloseTextDocument((event) => {
        documentDecorationManager.onDidCloseTextDocument(event);
    }), vscode_1.workspace.onDidOpenTextDocument((event) => {
        documentDecorationManager.onDidOpenTextDocument(event);
    }), vscode_1.window.onDidChangeTextEditorSelection((event) => {
        documentDecorationManager.onDidChangeSelection(event);
    }));
    documentDecorationManager.updateAllDocuments();
    function restart() {
        documentDecorationManager.Dispose();
        documentDecorationManager = new documentDecorationManager_1.default();
        documentDecorationManager.updateAllDocuments();
    }
}
exports.activate = activate;
// tslint:disable-next-line:no-empty
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map