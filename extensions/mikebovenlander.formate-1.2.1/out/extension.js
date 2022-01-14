"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = exports.findIndexOfFurthestColon = exports.isCommentLine = exports.insertExtraSpaces = exports.verticalAlign = exports.isProperty = exports.format = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const jsbeautify = require("js-beautify");
function format(document, range, defaultOptions) {
    const settings = vscode.workspace.getConfiguration('formate');
    const enable = settings.get('enable', true);
    if (!enable)
        return;
    const verticalAlignProperties = settings.get('verticalAlignProperties', true);
    const alignColon = settings.get('alignColon', true);
    // Set range if the range isn't set.
    if (range === null) {
        range = initDocumentRange(document);
    }
    const result = [];
    const content = document.getText(range);
    if (!defaultOptions) {
        defaultOptions = {
            insertSpaces: true,
            tabSize: 4,
            newline_between_rules: true,
        };
    }
    const beautifyOptions = {
        indent_char: defaultOptions.insertSpaces ? ' ' : '\t',
        indent_size: defaultOptions.insertSpaces ? defaultOptions.tabSize : 1,
        newline_between_rules: defaultOptions.newline_between_rules ? defaultOptions.newline_between_rules : true,
    };
    let formatted = jsbeautify.css_beautify(content, beautifyOptions);
    if (verticalAlignProperties) {
        const additionalSpaces = settings.get('additionalSpaces', 0);
        formatted = verticalAlign(formatted, additionalSpaces, alignColon);
    }
    if (formatted) {
        result.push(new vscode.TextEdit(range, formatted));
    }
    return result;
}
exports.format = format;
/**
 * Creates a new range from begin to end of the document
 *
 * @param {vscode.TextDocument} document
 * @returns {vscode.Range}
 */
function initDocumentRange(document) {
    const lastLine = document.lineCount - 1;
    const start = new vscode.Position(0, 0);
    const end = new vscode.Position(lastLine, document.lineAt(lastLine).text.length);
    return new vscode.Range(start, end);
}
/**
 * Checks to see if the current line matches a css property.
 *
 * @export
 * @param {string} line
 * @returns {boolean}
 */
function isProperty(line) {
    const isPropertyRegex = new RegExp(/(([A-z]-*)*\s*:\s*).*;?[^,|{]$/);
    /*
    (
    ([A-z]-*)   Matches any characters between a-z or A-Z and zero or more -
    \s*         Optional space
    :           Matches colon
    \s*         Optional space
    )
    .*          zero or more character
    ;?          Optional end with ;
    [^,|{]$     Not end with comma or {
    */
    return isPropertyRegex.test(line);
}
exports.isProperty = isProperty;
/**
 * Runs the property alignment.
 *
 * @export
 * @param {string} css
 * @returns {string}
 */
function verticalAlign(css, additionalSpaces = 0, alignColon) {
    const cssLines = css.split('\n');
    let firstProperty = -1;
    let lastProperty = -1;
    let commentBlockEntered = false;
    cssLines.forEach((line, lineNumberIndex) => {
        line = line.trim();
        // Skip comment lines
        if (isCommentLine(line))
            return;
        if (line.trim().indexOf('*/') >= 0) {
            commentBlockEntered = false;
            return;
        }
        if (line.trim().startsWith('/*') || commentBlockEntered) {
            commentBlockEntered = true;
            return;
        }
        // Set the start of the property group
        if (isProperty(line) && firstProperty === -1) {
            firstProperty = lineNumberIndex;
        }
        // Last property group line.
        if ((!isProperty(line) && firstProperty >= 0) || cssLines.length - 1 === lineNumberIndex) {
            lastProperty = lineNumberIndex;
        }
        // Format the selected group
        if (firstProperty !== -1 && lastProperty !== -1) {
            const properyGroup = cssLines.slice(firstProperty, lastProperty);
            const furthestColon = findIndexOfFurthestColon(properyGroup) + additionalSpaces;
            // Format the group
            while (firstProperty <= lastProperty) {
                const colonIndex = cssLines[firstProperty].indexOf(':');
                if (colonIndex < furthestColon && !isCommentLine(cssLines[firstProperty])) {
                    let diff = furthestColon - colonIndex;
                    cssLines[firstProperty] = insertExtraSpaces(cssLines[firstProperty], diff, alignColon);
                }
                firstProperty++;
            }
            // Prepare for the next loop.
            firstProperty = -1;
            lastProperty = -1;
        }
    });
    return cssLines.join('\n');
}
exports.verticalAlign = verticalAlign;
/**
 * Replaces a colon : with needed spaces AND colon. example: "     : "
 *
 * @param {string} cssLine Line to do the replace in.
 * @param {number} numberOfSpaces Number of spaces to add.
 * @returns {string} cssLine with added spaces.
 */
function insertExtraSpaces(cssLine, numberOfSpaces, alignColon) {
    return alignColon ? cssLine.replace(':', ' '.repeat(numberOfSpaces) + ':') : cssLine.replace(':', ':' + ' '.repeat(numberOfSpaces));
}
exports.insertExtraSpaces = insertExtraSpaces;
/**
 * Checks to see if a line is commented.
 *
 * @param {string} line Line to check.
 * @returns {boolean}
 */
function isCommentLine(line) {
    return line.trim().startsWith('//');
}
exports.isCommentLine = isCommentLine;
/**
 * Find the property where the : is the furthest
 * @param properties
 */
function findIndexOfFurthestColon(properties) {
    if (!properties || properties.length === 0)
        return 0;
    return Math.max.apply(null, properties.map(p => p.indexOf(':')));
}
exports.findIndexOfFurthestColon = findIndexOfFurthestColon;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    const provideDocumentFormattingEdits = {
        provideDocumentFormattingEdits: (document, options) => format(document, null, options)
    };
    const provideDocumentRangeFormattingEdits = {
        provideDocumentRangeFormattingEdits: (document, ranges, options) => format(document, ranges, options)
    };
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('css', provideDocumentFormattingEdits));
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('less', provideDocumentFormattingEdits));
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('scss', provideDocumentFormattingEdits));
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('sass', provideDocumentFormattingEdits));
    context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider('css', provideDocumentRangeFormattingEdits));
    context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider('less', provideDocumentRangeFormattingEdits));
    context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider('scss', provideDocumentRangeFormattingEdits));
    context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider('sass', provideDocumentRangeFormattingEdits));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map