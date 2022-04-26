import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

import { getNextBreakpoint, getStyleSheet, SIZE_BREAKPOINTS, useBreakpoints } from './stylesheet.helper';

interface IGrid {
  children: ReactNode;
  columns?: number;
  container?: boolean;
  direction?: string;
  item?: boolean;
  p?: number;
  wrap?: string;
  xl?: 'auto' | number | boolean;
  lg?: 'auto' | number | boolean;
  md?: 'auto' | number | boolean;
  sm?: 'auto' | number | boolean;
  xs?: 'auto' | number | boolean;
  sx?: AnyObject;
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#ddd'
  }
})

const Grid: React.FC<IGrid> = ({
                                 children,
                                 columns = 12,
                                 container = false,
                                 direction = 'row',
                                 item = false,
                                 p = 0,
                                 wrap = 'wrap',
                                 xl = false,
                                 lg = false,
                                 md = false,
                                 sm = false,
                                 xs = false,
                                 sx = {}
                               }) => {
  useBreakpoints();

  const styles: AnyObject = {
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

  const sizes: AnyObject = { xl, lg, md, sm, xs };
  const sizeKeys = Object.keys(sizes);

  sizeKeys.forEach(sizeKey => {
    const style: AnyObject = {};
    const currSize = sizes[sizeKey];

    if (currSize === true) {
      style.root = { flexGrow: 1 };
    } else if (Number.isInteger(currSize)) {
      const maxWidth = `${currSize / columns * 100}%`;

      style.root = {
        flexGrow: 0,
        flexBasis: maxWidth,
        maxWidth
      };
    }

    if (style.root) {
      const nextBreakpoint = getNextBreakpoint(sizeKey, sizes);
      const minWidth = SIZE_BREAKPOINTS[sizeKey];
      const maxWidth = nextBreakpoint && nextBreakpoint - 1;

      let mediaQuery = `@media (min-width: ${minWidth})`;
      if (maxWidth) mediaQuery += ` and (max-width: ${maxWidth})`;

      styles[mediaQuery] = style;
    }
  });

  const stylesheet = getStyleSheet(styles);
  const base = container ? stylesheet.container : stylesheet.item;

  return <View style={[base, stylesheet.root, sx]}>{children}</View>;
}

export default Grid;
