"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var stylesheet_helpers_1 = require("./stylesheet.helpers");
var styles = react_native_1.StyleSheet.create({
    root: {
        backgroundColor: '#ddd'
    }
});
var Grid = function (_a) {
    var children = _a.children, _b = _a.columns, columns = _b === void 0 ? 12 : _b, _c = _a.container, container = _c === void 0 ? false : _c, _d = _a.direction, direction = _d === void 0 ? 'row' : _d, _e = _a.item, item = _e === void 0 ? false : _e, _f = _a.p, p = _f === void 0 ? 0 : _f, _g = _a.wrap, wrap = _g === void 0 ? 'wrap' : _g, _h = _a.xl, xl = _h === void 0 ? false : _h, _j = _a.lg, lg = _j === void 0 ? false : _j, _k = _a.md, md = _k === void 0 ? false : _k, _l = _a.sm, sm = _l === void 0 ? false : _l, _m = _a.xs, xs = _m === void 0 ? false : _m, _o = _a.sx, sx = _o === void 0 ? {} : _o;
    (0, stylesheet_helpers_1.useBreakpoints)();
    var styles = {
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
    var sizes = { xl: xl, lg: lg, md: md, sm: sm, xs: xs };
    var sizeKeys = Object.keys(sizes);
    sizeKeys.forEach(function (sizeKey) {
        var style = {};
        var currSize = sizes[sizeKey];
        if (currSize === true) {
            style.root = { flexGrow: 1 };
        }
        else if (Number.isInteger(currSize)) {
            var maxWidth = "".concat(currSize / columns * 100, "%");
            style.root = {
                flexGrow: 0,
                flexBasis: maxWidth,
                maxWidth: maxWidth
            };
        }
        if (style.root) {
            var nextBreakpoint = (0, stylesheet_helpers_1.getNextBreakpoint)(sizeKey, sizes);
            var minWidth = stylesheet_helpers_1.SIZE_BREAKPOINTS[sizeKey];
            var maxWidth = nextBreakpoint && nextBreakpoint - 1;
            var mediaQuery = "@media (min-width: ".concat(minWidth, ")");
            if (maxWidth)
                mediaQuery += " and (max-width: ".concat(maxWidth, ")");
            styles[mediaQuery] = style;
        }
    });
    var stylesheet = (0, stylesheet_helpers_1.getStyleSheet)(styles);
    var base = container ? stylesheet.container : stylesheet.item;
    return <react_native_1.View style={[base, stylesheet.root, sx]}>{children}</react_native_1.View>;
};
exports["default"] = Grid;
