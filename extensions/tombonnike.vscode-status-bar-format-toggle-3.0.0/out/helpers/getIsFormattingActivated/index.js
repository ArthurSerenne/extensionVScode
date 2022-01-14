"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const getConfiguration_1 = __importDefault(require("../getConfiguration"));
const getIsFormattingActivated = () => {
    const editorConfiguration = (0, getConfiguration_1.default)('editor');
    const formattingToggleConfiguration = (0, getConfiguration_1.default)('formattingToggle');
    const affectsConfiguration = formattingToggleConfiguration.get('affects', constants_1.DEFAULT_AFFECTS_CONFIGURATION);
    const isAnyRelevantSettingActivated = constants_1.FORMATTING_SETTINGS.some(setting => {
        const isRelevantSetting = affectsConfiguration.includes(setting);
        const isSettingActivated = editorConfiguration.get(setting, false);
        return isRelevantSetting && isSettingActivated;
    });
    return isAnyRelevantSettingActivated;
};
exports.default = getIsFormattingActivated;
