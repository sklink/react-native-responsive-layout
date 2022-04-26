"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const stylesheet_helpers_1 = require("./stylesheet.helpers");
const styles = react_native_1.StyleSheet.create({
    root: {
        backgroundColor: '#ddd'
    }
});
const Grid = ({ children, columns = 12, container = false, direction = 'row', item = false, p = 0, wrap = 'wrap', xl = false, lg = false, md = false, sm = false, xs = false, sx = {} }) => {
    (0, stylesheet_helpers_1.useBreakpoints)();
    const styles = {
        root: {},
        container: {
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            paddingBottom: p || 0,
            paddingRight: p || 0
        },
        item: {
            margin: 0,
            paddingLeft: p || 0,
            paddingTop: p || 0
        }
    };
    const sizes = { xl, lg, md, sm, xs };
    const sizeKeys = Object.keys(sizes);
    sizeKeys.forEach(sizeKey => {
        const style = {};
        const currSize = sizes[sizeKey];
        if (currSize === true) {
            style.root = { flexGrow: 1 };
        }
        else if (Number.isInteger(currSize)) {
            const maxWidth = `${currSize / columns * 100}%`;
            style.root = {
                flexGrow: 0,
                flexBasis: maxWidth,
                maxWidth
            };
        }
        if (style.root) {
            const nextBreakpoint = (0, stylesheet_helpers_1.getNextBreakpoint)(sizeKey, sizes);
            const minWidth = stylesheet_helpers_1.SIZE_BREAKPOINTS[sizeKey];
            const maxWidth = nextBreakpoint && nextBreakpoint - 1;
            let mediaQuery = `@media (min-width: ${minWidth})`;
            if (maxWidth)
                mediaQuery += ` and (max-width: ${maxWidth})`;
            styles[mediaQuery] = style;
        }
    });
    const stylesheet = (0, stylesheet_helpers_1.getStyleSheet)(styles);
    const base = container ? stylesheet.container : stylesheet.item;
    return <react_native_1.View style={[base, stylesheet.root, sx]}>{children}</react_native_1.View>;
};
exports.default = Grid;
