"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const stylesheet_helpers_1 = require("./stylesheet.helpers");
const Container = ({ children, disableGutters = false, maxWidth = 'lg', sx }) => {
    const styles = {
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
        styles.root = { ...styles.root, ...sx };
    }
    if (Number.isInteger(maxWidth)) {
        styles.root.maxWidth = maxWidth;
    }
    else if (maxWidth) {
        styles.root.maxWidth = `$${maxWidth}`;
    }
    const stylesheet = (0, stylesheet_helpers_1.getStyleSheet)(styles);
    return <react_native_1.View style={stylesheet.root}>{children}</react_native_1.View>;
};
exports.default = Container;
