"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextBreakpoint = exports.getCurrentBreakpoint = exports.useBreakpoints = exports.getStyleSheet = exports.SIZE_UP = exports.SIZE_BREAKPOINTS = void 0;
const react_1 = require("react");
const react_native_extended_stylesheet_1 = __importDefault(require("react-native-extended-stylesheet"));
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
const getStyleSheet = (styles) => react_native_extended_stylesheet_1.default.create(styles);
exports.getStyleSheet = getStyleSheet;
function useBreakpoints() {
    const [breakpoint, setBreakpoint] = (0, react_1.useState)((0, exports.getCurrentBreakpoint)());
    (0, react_1.useLayoutEffect)(() => {
        const updateSize = () => {
            const currBreakpoint = (0, exports.getCurrentBreakpoint)();
            if (currBreakpoint !== breakpoint) {
                setBreakpoint(currBreakpoint);
            }
        };
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return breakpoint;
}
exports.useBreakpoints = useBreakpoints;
;
const getCurrentBreakpoint = () => {
    const currWidth = window.innerWidth;
    let currSize = 'xs';
    let currBreakpoint = exports.SIZE_BREAKPOINTS[currSize];
    let prevBreakpoint = currBreakpoint;
    while (currWidth >= currBreakpoint) {
        currSize = exports.SIZE_UP[currSize];
        prevBreakpoint = currBreakpoint;
        currBreakpoint = exports.SIZE_BREAKPOINTS[currSize];
    }
    return prevBreakpoint;
};
exports.getCurrentBreakpoint = getCurrentBreakpoint;
const getNextBreakpoint = (sizeKey, sizes) => {
    const sizeSet = sizes || exports.SIZE_BREAKPOINTS;
    let currSize = sizeKey;
    let nextSize = exports.SIZE_UP[currSize];
    let result;
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
