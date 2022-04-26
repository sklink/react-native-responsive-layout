import React, { ReactNode } from 'react';
interface IContainer {
    children: ReactNode;
    disableGutters?: boolean;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false | number;
    sx?: object;
}
declare const Container: React.FC<IContainer>;
export default Container;
