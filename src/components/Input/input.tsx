import React, { ReactElement, InputHTMLAttributes, useEffect, useState, MouseEvent, FocusEvent } from 'react'
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
    const {
        disabled,
        size,
        prefixIcon,
        suffixIcon,
        prefixLabel,
        suffixLabel,
        className,
        isPassword,
        style,
        placeholder,
        onFocus,
        onBlur,
        onMouseOver,
        onMouseOut,
        ...restProp
    } = props
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
    const handleMouseOver = (e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => {
        setIsMouse(true)
        if (onMouseOver) {
            onMouseOver(e)
        }
    }
    const handleMouseOut = (e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => {
        setIsMouse(false)
        if (onMouseOut) {
            onMouseOut(e)
        }
    }
    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
        setIsFocus(true)
        if (onFocus) {
            onFocus(e)
        }
    }
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        setIsFocus(false)
        if (onBlur) {
            onBlur(e)
        }
    }

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
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onFocus={handleFocus}
                onBlur={handleBlur}
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