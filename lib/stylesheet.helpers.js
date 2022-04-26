"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextBreakpoint = exports.getCurrentBreakpoint = exports.useBreakpoints = exports.getStyleSheet = exports.SIZE_UP = exports.SIZE_BREAKPOINTS = void 0;
var react_1 = require("react");
var react_native_extended_stylesheet_1 = __importDefault(require("react-native-extended-stylesheet"));
exports.SIZE_BREAKPOINTS = {
    xl: 1536,
    lg: 1200,
    md: 900,
    sm: 600,
    xs: 0
};
exports.SIZE_UP = {
    lg: 'xl',
    md: 'lg',
    sm: 'md',
    xs: 'sm'
};
var getStyleSheet = function (styles) {
    return react_native_extended_stylesheet_1.default.create(styles);
};
exports.getStyleSheet = getStyleSheet;
var useBreakpoints = function () {
    // @ts-ignore
    var _a = (0, react_1.useState)((0, exports.getCurrentBreakpoint)()), breakpoint = _a[0], setBreakpoint = _a[1];
    // @ts-ignore
    (0, react_1.useLayoutEffect)(function () {
        var updateSize = function () {
            var currBreakpoint = (0, exports.getCurrentBreakpoint)();
            if (currBreakpoint !== breakpoint) {
                setBreakpoint(currBreakpoint);
            }
        };
        window.addEventListener('resize', updateSize);
        updateSize();
        return function () { return window.removeEventListener('resize', updateSize); };
    }, []);
    return breakpoint;
};
exports.useBreakpoints = useBreakpoints;
var getCurrentBreakpoint = function () {
    var currWidth = window.innerWidth;
    var currSize = 'xs';
    var currBreakpoint = exports.SIZE_BREAKPOINTS[currSize];
    var prevBreakpoint = currBreakpoint;
    while (currWidth >= currBreakpoint) {
        currSize = exports.SIZE_UP[currSize];
        prevBreakpoint = currBreakpoint;
        currBreakpoint = exports.SIZE_BREAKPOINTS[currSize];
    }
    return prevBreakpoint;
};
exports.getCurrentBreakpoint = getCurrentBreakpoint;
var getNextBreakpoint = function (sizeKey, sizes) {
    var sizeSet = sizes || exports.SIZE_BREAKPOINTS;
    var currSize = sizeKey;
    var nextSize = exports.SIZE_UP[currSize];
    var result;
    while (nextSize && !result) {
        if (nextSize && sizeSet[nextSize]) {
            result = sizeSet[nextSize];
        }
        currSize = nextSize;
        nextSize = exports.SIZE_UP[currSize];
    }
    return result;
};
exports.getNextBreakpoint = getNextBreakpoint;
