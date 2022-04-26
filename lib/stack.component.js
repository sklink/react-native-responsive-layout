"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const stylesheet_helpers_1 = require("./stylesheet.helpers");
const Stack = ({ children, direction, alignItems, justifyContent, divider, spacing = 0, sx }) => {
    (0, stylesheet_helpers_1.useBreakpoints)();
    const styles = {
        root: {
            display: 'flex',
            flexDirection: direction,
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
    const stylesheet = (0, stylesheet_helpers_1.getStyleSheet)(styles);
    const arrChildren = react_1.default.Children.toArray(children).filter(Boolean);
    const eleChildren = arrChildren.reduce((result, child, index) => {
        result.push(<react_native_1.View key={`child-${index}`} style={stylesheet.child}>{child}</react_native_1.View>);
        if (divider && index < arrChildren.length - 1) {
            result.push(react_1.default.cloneElement(divider, { key: `separator-${index}` }));
        }
        return result;
    }, []);
    return (<react_native_1.View style={[styles.root, sx]}>
      {eleChildren}
    </react_native_1.View>);
};
exports.default = Stack;
