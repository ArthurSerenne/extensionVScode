"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const getStatusBarText_1 = __importDefault(require("./helpers/getStatusBarText"));
const getOnDidChangeConfigurationHandler = (statusBar) => vscode_1.workspace.onDidChangeConfiguration(event => {
    if (event.affectsConfiguration('editor') ||
        event.affectsConfiguration('files') ||
        event.affectsConfiguration('formattingToggle')) {
        statusBar.text = (0, getStatusBarText_1.default)();
    }
});
exports.default = getOnDidChangeConfigurationHandler;
