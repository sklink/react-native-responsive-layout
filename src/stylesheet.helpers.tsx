import React, { useLayoutEffect, useState } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

export const SIZE_BREAKPOINTS: AnyObject = {
  xl: 1536,
  lg: 1200,
  md: 900,
  sm: 600,
  xs: 0
};

export const SIZE_UP: AnyObject = {
  lg: 'xl',
  md: 'lg',
  sm: 'md',
  xs: 'sm'
}

export const getStyleSheet = (styles: object) =>
  EStyleSheet.create(styles);

export const useBreakpoints = () => {
  const [breakpoint, setBreakpoint] = useState(getCurrentBreakpoint());

  useLayoutEffect(() => {
    const updateSize = () => {
      const currBreakpoint = getCurrentBreakpoint();

      if (currBreakpoint !== breakpoint) {
        setBreakpoint(currBreakpoint);
      }
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return breakpoint;
};

export const getCurrentBreakpoint = () => {
  const currWidth = window.innerWidth;
  let currSize = 'xs';
  let currBreakpoint = SIZE_BREAKPOINTS[currSize];
  let prevBreakpoint = currBreakpoint;

  while (currWidth >= currBreakpoint) {
    currSize = SIZE_UP[currSize];
    prevBreakpoint = currBreakpoint;
    currBreakpoint = SIZE_BREAKPOINTS[currSize];
  }

  return prevBreakpoint;
}

export const getNextBreakpoint = (sizeKey: string, sizes?: AnyObject) => {
  const sizeSet = sizes || SIZE_BREAKPOINTS;
  let currSize = sizeKey;
  let nextSize = SIZE_UP[currSize];
  let result;

  while (nextSize && !result) {
    if (nextSize && sizeSet[nextSize]) {
      result = sizeSet[nextSize];
    }

    currSize = nextSize;
    nextSize = SIZE_UP[currSize];
  }

  return result;
}
