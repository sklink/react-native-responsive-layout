import React, { ReactElement, ReactNode } from 'react';
import { View } from 'react-native';

import { getStyleSheet } from './stylesheet.helpers';
import { AnyObject } from './types.d';

interface IStack {
  children: ReactNode;
  direction?: 'column-reverse' | 'column' | 'row-reverse' | 'row';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  divider?: ReactElement;
  spacing?: number;
  sx?: AnyObject;
}

/**
 * The Stack component manages layout of immediate children along the vertical or horizontal axis
 * with optional spacing and/or dividers between each child.
 *
 * Modeled after Material UI Stack:
 * https://mui.com/material-ui/react-stack/
 */
const Stack: React.FC<IStack> = ({
  children,
  direction = 'column',
  alignItems,
  justifyContent,
  divider,
  spacing = 0,
  sx
}) => {
  const styles: AnyObject = {
    root: {
      display: 'flex',
      flexDirection: direction,
    },
    child: {
      paddingRight: 10
    }
  };

  if (direction === 'column-reverse' || direction === 'column') {
    styles.child.paddingBottom = spacing / 2;
    styles.child.paddingTop = spacing / 2;
    styles['child:first-child'] = { paddingTop: 0 };
    styles['child:last-child'] = { paddingBottom: 0 };
  } else {
    styles.child.paddingRight = spacing / 2;
    styles.child.paddingLeft = spacing / 2;
    styles['child:first-child'] = { paddingLeft: 0 };
    styles['child:last-child'] = { paddingRight: 0 };
  }

  if (direction) styles.root.flexDirection = direction;
  if (alignItems) styles.root.alignItems = alignItems;
  if (justifyContent) styles.root.justifyContent = justifyContent;

  const stylesheet = getStyleSheet(styles);

  const arrChildren: ReactNode[] = React.Children.toArray(children).filter(Boolean);

  // Map the child ReactNode elements so that we can...
  const eleChildren = arrChildren.reduce((result: ReactNode[], child, index) => {
    // wrap the child elements so that we can apply spacing, and...
    result.push(<View key={`child-${index}`} style={stylesheet.child}>{child}</View>);

    // optionally include a divider between the elements
    if (divider && index < arrChildren.length - 1) {
      result.push(React.cloneElement(divider, { key: `separator-${index}` }));
    }

    return result;
  }, []);

  return (
    <View style={[styles.root, sx]}>
      {eleChildren}
    </View>
  );
};

export default Stack;
