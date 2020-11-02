import React, { ReactElement, InputHTMLAttributes } from 'react';
declare type InputSize = 'large' | 'normal' | 'small';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    disabled?: boolean;
    size?: InputSize;
    prefixIcon?: ReactElement;
    suffixIcon?: ReactElement;
    prefixLabel?: string | ReactElement;
    suffixLabel?: string | ReactElement;
    isPassword?: boolean;
}
declare const Input: React.FC<InputProps>;
export default Input;
