"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DISABLED_TEXT = exports.ENABLED_TEXT = void 0;
const getFormattingStatus_1 = __importDefault(require("../getFormattingStatus"));
exports.ENABLED_TEXT = 'Formatting: $(check)';
exports.DISABLED_TEXT = 'Formatting: $(x)';
const getStatusBarText = () => {
    const isFormattingActivated = (0, getFormattingStatus_1.default)();
    return isFormattingActivated ? exports.ENABLED_TEXT : exports.DISABLED_TEXT;
};
exports.default = getStatusBarText;
