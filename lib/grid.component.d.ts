import React, { ReactNode } from 'react';
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
declare const Grid: React.FC<IGrid>;
export default Grid;
