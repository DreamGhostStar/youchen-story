import React, { ReactElement, InputHTMLAttributes, useEffect, useState } from 'react'
import classNames from 'classnames'

type InputSize = 'large' | 'normal' | 'small'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    disabled?: boolean;
    size?: InputSize;
    prefixIcon?: ReactElement;
    suffixIcon?: ReactElement;
    prefixLabel?: string | ReactElement;
    suffixLabel?: string | ReactElement;
    isPassword?: boolean
}

const Input: React.FC<InputProps> = (props) => {
    const { disabled, size, prefixIcon, suffixIcon, prefixLabel, suffixLabel, className, isPassword, style, placeholder, ...restProp } = props
    const classes = classNames('youchen-input', {
        'input-disabled': disabled,
        [`input-${size}`]: size,
    })
    const [isMouse, setIsMouse] = useState(false)
    const [isFocus, setIsFocus] = useState(false)

    useEffect(() => {
        if (suffixIcon && suffixLabel) {
            console.error('suffixIcon can not coexist with suffixLabel')
        }
        if (prefixIcon && prefixLabel) {
            console.error('prefixIcon can not coexist with prefixLabel')
        }
    }, [])

    return (
        <div
            className='youchen-input-layout' style={{
                boxShadow: isFocus ? '0 0 0 2px rgba(24, 144, 255, .2)' : "none"
            }}
        >
            {
                prefixIcon &&
                <div className='youchen-input-prefix-icon-layout' style={{
                    borderColor: isMouse ? '#40a9ff' : '#ccc'
                }} >
                    {prefixIcon}
                </div>
            }
            {
                prefixLabel &&
                <div className='youchen-input-prefix-label-layout' >
                    {prefixLabel}
                </div>
            }
            <input
                type={isPassword ? 'password' : 'text'}
                className={classes}
                style={{
                    borderRight: suffixIcon ? 'none' : isMouse
                        ? '1px solid #40a9ff' : '1px solid #ccc',
                    borderTopRightRadius: (suffixLabel || suffixIcon) ? '0px' : '3px',
                    borderBottomRightRadius: (suffixLabel || suffixIcon) ? '0px' : '3px',
                    ...restProp
                }}
                placeholder={placeholder === null ? 'placeholder' : placeholder}
                onMouseOver={() => setIsMouse(true)}
                onMouseOut={() => setIsMouse(false)}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                {...restProp}
            />
            {
                suffixLabel &&
                <div className='youchen-input-suffix-label-layout' >
                    {suffixLabel}
                </div>
            }
            {
                suffixIcon &&
                <div className='youchen-input-suffix-icon-layout' style={{
                    borderColor: isMouse ? '#40a9ff' : '#ccc'
                }} >
                    {suffixIcon}
                </div>
            }
        </div>
    )
}

Input.defaultProps = {
    disabled: false,
    size: 'normal',
    isPassword: false,
}
export default Input