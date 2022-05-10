import React, { ReactNode } from 'react';
import { Animated } from 'react-native';

import { getStyleSheet, SIZE_BREAKPOINTS, useBreakpoints } from './stylesheet.helpers';
import { AnyObject } from './types.d';

interface IContainer {
  children: ReactNode;
  disableGutters?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false | number;
  sx?: object;
}

/**
 * The container centers your content horizontally. It's the most basic layout element.
 *
 * Modeled after Material UI Container:
 * https://mui.com/material-ui/react-container/#main-content
 */
const Container: React.FC<IContainer> = ({
  children,
  disableGutters = false,
  maxWidth = 'lg',
  sx
}) => {
  // Re-render when breakpoint changes...
  // This is required because React Native does not support cascading styles
  // (i.e. multiple media queries)
  useBreakpoints();

  const styles: AnyObject = {
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
  } else if (maxWidth) {
    styles.root.maxWidth = SIZE_BREAKPOINTS[maxWidth];
  }

  const stylesheet = getStyleSheet(styles);

  return <Animated.View style={stylesheet.root}>{children}</Animated.View>;
}

export default Container;
