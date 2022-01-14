"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_AFFECTS_CONFIGURATION = exports.COMMAND_NAME = void 0;
// This should be kept in sync with the command name specified in the
// `package.json` file: `contributes.commands[0].command`.
exports.COMMAND_NAME = 'formattingToggle.toggleFormat';
// This should be kept in sync with the default specified in the `package.json`
// file: `contributes.configuration.properties.formattingToggle.affects.default`.
// By default, we always want to toggle all editor settings.
exports.DEFAULT_AFFECTS_CONFIGURATION = [
    'editor.formatOnPaste',
    'editor.formatOnSave',
    'editor.formatOnType',
];
