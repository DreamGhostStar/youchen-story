import React from 'react'
import classNames from 'classnames'

interface BaseIconFontProps {
    className?: string
    style?: React.CSSProperties
    type: string
}
export type IconFontProps = Partial<React.SVGProps<SVGSVGElement> & BaseIconFontProps>
const IconFont: React.FC<IconFontProps> = (props) => {
    const { className, style, type, ...restProps } = props
    const classes = classNames('icon', className)
    return (
        <svg className={classes} style={style} aria-hidden='true' {...restProps} >
            <use xlinkHref={`#${type}`} ></use>
        </svg>
    )
}

export default IconFont