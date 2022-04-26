import React, { ReactElement, ReactNode } from 'react';
import { View } from 'react-native';

import { getStyleSheet, useBreakpoints } from './stylesheet.helpers';
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

const Stack: React.FC<IStack> = ({
  children,
  direction,
  alignItems,
  justifyContent,
  divider,
  spacing = 0,
  sx
}) => {
  useBreakpoints();

  const styles: AnyObject = {
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
  const eleChildren = arrChildren.reduce((result: ReactNode[], child, index) => {
    result.push(<View key={`child-${index}`} style={stylesheet.child}>{child}</View>);

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
