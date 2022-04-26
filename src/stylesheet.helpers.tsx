import React, { useLayoutEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { AnyObject } from './types.d';

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

export function useBreakpoints() {
  const width = useWindowDimensions().width;

  return getCurrentBreakpoint(width);
};

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
