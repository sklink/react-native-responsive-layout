import React, { ReactElement, ReactNode } from 'react';
import { View } from 'react-native';

import { getNextBreakpoint, getStyleSheet, SIZE_BREAKPOINTS, useBreakpoints } from './stylesheet.helpers';
import { AnyObject } from './types.d';

interface IGrid {
  children: ReactElement;
  columns?: number;
  container?: boolean;
  direction?: string;
  item?: boolean;
  spacing?: number;
  wrap?: string;
  xl?: 'auto' | number | boolean;
  lg?: 'auto' | number | boolean;
  md?: 'auto' | number | boolean;
  sm?: 'auto' | number | boolean;
  xs?: 'auto' | number | boolean;
  sx?: AnyObject;
}

/**
 * This responsive layout grid adapts to screen size and orientation,
 * ensuring consistency across layouts.
 *
 * This is modeled after the Material UI Grid:
 * https://mui.com/material-ui/react-grid/#main-content
 */
const Grid: React.FC<IGrid> = ({
  children,
  columns = 12,
  container = false,
  direction = 'row',
  item = false,
  spacing = 0,
  wrap = 'wrap',
  xl = false,
  lg = false,
  md = false,
  sm = false,
  xs = false,
  sx = {}
}) => {
  // Re-render when breakpoint changes...
  // This is required because React Native does not support cascading styles
  // (i.e. multiple media queries)
  useBreakpoints();

  const styles: AnyObject = {
    root: {},
    container: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      paddingBottom: spacing || 0,
      paddingRight: spacing || 0
    },
    item: {
      margin: 0
    },
    child: {
      paddingTop: spacing || 0,
      paddingLeft: spacing || 0
    }
  };

  const sizes: AnyObject = { xs, sm, md, lg, xl };
  const sizeKeys = Object.keys(sizes);

  sizeKeys.forEach(sizeKey => {
    const style: AnyObject = {};
    const currSize = sizes[sizeKey];

    // Fill the space if the size is `true`...
    if (currSize === true) {
      style.root = { flexGrow: 1 };
    } else if (Number.isInteger(currSize)) {
      // Otherwise, calculate the width based on column restrictions
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

      // Create the media query for this size,
      // using maxWidth if there is a larger breakpoint configured
      let mediaQuery = `@media (min-width: ${minWidth})`;
      if (maxWidth) mediaQuery += ` and (max-width: ${maxWidth})`;

      styles[mediaQuery] = style;
    }
  });

  console.log('=======', container)
  console.log(styles);

  const stylesheet = getStyleSheet(styles);
  const base = container ? stylesheet.container : stylesheet.item;
  let renderChildren: ReactElement | ReactElement[] = children;

  if (container) {
    renderChildren = React.Children.map(children, (child: ReactElement) => {
      console.log(stylesheet._child);
      return React.cloneElement({ ...child }, {
        children: (
          <View style={stylesheet.child}>{child.props.children}</View>
        )
      });
    });
  }

  return <View style={[base, stylesheet.root, sx]}>{renderChildren}</View>;
}

export default Grid;
