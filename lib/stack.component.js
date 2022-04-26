"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var stylesheet_helpers_1 = require("./stylesheet.helpers");
var Stack = function (_a) {
    var children = _a.children, direction = _a.direction, alignItems = _a.alignItems, justifyContent = _a.justifyContent, divider = _a.divider, _b = _a.spacing, spacing = _b === void 0 ? 0 : _b, sx = _a.sx;
    (0, stylesheet_helpers_1.useBreakpoints)();
    var styles = {
        root: {
            display: 'flex',
            flexDirection: direction
        },
        child: {}
    };
    if (direction === 'column-reverse' || direction === 'column') {
        styles.child.paddingBottom = spacing / 2;
        styles.child.paddingTop = spacing / 2;
        styles['child:first-child'] = { paddingTop: 0 };
        styles['child:last-child'] = { paddingBottom: 0 };
    }
    else {
        styles.child.paddingRight = spacing / 2;
        styles.child.paddingLeft = spacing / 2;
        styles['child:first-child'] = { paddingLeft: 0 };
        styles['child:last-child'] = { paddingRight: 0 };
    }
    if (direction)
        styles.root.direction = direction;
    if (alignItems)
        styles.root.alignItems = alignItems;
    if (justifyContent)
        styles.root.justifyContent = justifyContent;
    var stylesheet = (0, stylesheet_helpers_1.getStyleSheet)(styles);
    var arrChildren = react_1["default"].Children.toArray(children).filter(Boolean);
    var eleChildren = arrChildren.reduce(function (result, child, index) {
        result.push(<react_native_1.View key={"child-".concat(index)} style={stylesheet.child}>{child}</react_native_1.View>);
        if (divider && index < arrChildren.length - 1) {
            result.push(react_1["default"].cloneElement(divider, { key: "separator-".concat(index) }));
        }
        return result;
    }, []);
    return (<react_native_1.View style={[styles.root, sx]}>
      {eleChildren}
    </react_native_1.View>);
};
exports["default"] = Stack;
