import React, { ReactElement, ReactNode } from 'react';
interface IStack {
    children: ReactNode;
    direction?: 'column-reverse' | 'column' | 'row-reverse' | 'row';
    alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
    justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    divider?: ReactElement;
    spacing?: number;
    sx?: AnyObject;
}
declare const Stack: React.FC<IStack>;
export default Stack;
