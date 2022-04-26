import React from 'react';
import { useWindowDimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { AnyObject } from './types.d';

// Breakpoints units. TODO: Allow this to be configured
export const SIZE_BREAKPOINTS: AnyObject = {
  xl: 1536,
  lg: 1200,
  md: 900,
  sm: 600,
  xs: 0
};

// Reference next size up
export const SIZE_UP: AnyObject = {
  lg: 'xl',
  md: 'lg',
  sm: 'md',
  xs: 'sm'
}

/**
 * Generate a React Native Extended StyleSheet given a styles object
 *
 * @param styles - Any object that satisfies StyleSheet
 */
export const getStyleSheet = (styles: AnyObject) =>
  EStyleSheet.create(styles);

/**
 * Triggered on window dimension changes, this React Hook will give us the current
 * breakpoint name (i.e. xl, md)
 */
export function useBreakpoints() {
  const width = useWindowDimensions().width;

  return getCurrentBreakpoint(width);
};

/**
 * Given width, specifying the window size, tell us which breakpoint size we're on
 *
 * @param currWidth - Number representing the window width
 */
export const getCurrentBreakpoint = (currWidth: number) => {
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

/**
 * Determine the value at which the next break will occur.
 * Providing `sizes` will change which size breakpoints are considered
 */
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
