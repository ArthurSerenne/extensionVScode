"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const getConfiguration_1 = __importDefault(require("../getConfiguration"));
const getFormattingStatus = () => {
    const configuration = (0, getConfiguration_1.default)();
    const affectsConfiguration = configuration.get('formattingToggle.affects', constants_1.DEFAULT_AFFECTS_CONFIGURATION);
    const isAnyRelevantSettingActivated = affectsConfiguration.some(setting => {
        const isSettingActivated = configuration.get(setting, false);
        return isSettingActivated;
    });
    return isAnyRelevantSettingActivated;
};
exports.default = getFormattingStatus;
