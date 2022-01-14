"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const constants_1 = require("./constants");
const getFormattingStatus_1 = __importDefault(require("./helpers/getFormattingStatus"));
const registerCommand = () => vscode_1.commands.registerCommand(constants_1.COMMAND_NAME, () => {
    const configuration = vscode_1.workspace.getConfiguration();
    const affectsConfiguration = configuration.get('formattingToggle.affects', constants_1.DEFAULT_AFFECTS_CONFIGURATION);
    const isFormattingActivated = (0, getFormattingStatus_1.default)();
    // Updating the configuration will trigger the `onDidChangeConfiguration`
    // handler which will correctly update the text and icon in the status bar.
    affectsConfiguration.forEach(setting => {
        configuration.update(setting, !isFormattingActivated, vscode_1.ConfigurationTarget.Global);
    });
});
exports.default = registerCommand;
