import React, { ReactNode } from 'react';
import { View } from 'react-native';

import { getStyleSheet } from './stylesheet.helpers';
import { AnyObject } from './types.d';

interface IContainer {
  children: ReactNode;
  disableGutters?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false | number;
  sx?: object;
}

const Container: React.FC<IContainer> = ({
  children,
  disableGutters = false,
  maxWidth = 'lg',
  sx
}) => {
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
    styles.root.maxWidth = `$${maxWidth}`;
  }

  const stylesheet = getStyleSheet(styles);

  return <View style={stylesheet.root}>{children}</View>;
}

export default Container;
