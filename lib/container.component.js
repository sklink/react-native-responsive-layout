"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var stylesheet_helpers_1 = require("./stylesheet.helpers");
var Container = function (_a) {
    var children = _a.children, _b = _a.disableGutters, disableGutters = _b === void 0 ? false : _b, _c = _a.maxWidth, maxWidth = _c === void 0 ? 'lg' : _c, sx = _a.sx;
    var styles = {
        root: {
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
        }
    };
    if (!disableGutters) {
        styles.root.paddingLeft = 16;
        styles.root.paddingRight = 16;
        styles['@media (min-width: 600)'] = {
            root: {
                paddingLeft: 24,
                paddingRight: 24
            }
        };
        styles['@media (min-width: 900)'] = {
            root: {
                paddingLeft: 32,
                paddingRight: 32
            }
        };
    }
    if (sx) {
        styles.root = __assign(__assign({}, styles.root), sx);
    }
    if (Number.isInteger(maxWidth)) {
        styles.root.maxWidth = maxWidth;
    }
    else if (maxWidth) {
        styles.root.maxWidth = "$".concat(maxWidth);
    }
    var stylesheet = (0, stylesheet_helpers_1.getStyleSheet)(styles);
    return react_1.default.createElement(react_native_1.View, { style: stylesheet.root }, children);
};
exports.default = Container;
