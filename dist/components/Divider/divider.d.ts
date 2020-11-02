import React, { FC } from 'react';
declare type NativeProps = React.HTMLAttributes<HTMLElement>;
declare type AnchorProps = React.AnchorHTMLAttributes<HTMLElement>;
export declare type DividerProps = Partial<NativeProps & AnchorProps>;
declare const Divider: FC<DividerProps>;
export default Divider;
