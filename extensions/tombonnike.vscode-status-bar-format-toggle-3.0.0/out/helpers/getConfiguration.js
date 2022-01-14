"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const getConfiguration = () => vscode_1.workspace.getConfiguration(undefined, vscode_1.window.activeTextEditor ? vscode_1.window.activeTextEditor.document.uri : null);
exports.default = getConfiguration;
