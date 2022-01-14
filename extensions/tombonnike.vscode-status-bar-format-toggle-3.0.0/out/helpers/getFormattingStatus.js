"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const constants_1 = require("../constants");
const getFormattingStatus = () => {
    const configuration = vscode_1.workspace.getConfiguration();
    const affectsConfiguration = configuration.get('formattingToggle.affects', constants_1.DEFAULT_AFFECTS_CONFIGURATION);
    const isAnyRelevantSettingActivated = affectsConfiguration.some(setting => {
        const isSettingActivated = configuration.get(setting, false);
        return isSettingActivated;
    });
    return isAnyRelevantSettingActivated;
};
exports.default = getFormattingStatus;
