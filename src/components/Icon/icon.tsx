import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIconProps, FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

export interface IconProps extends FontAwesomeIconProps {
    theme?: ThemeProps
}

const Icon: React.FC<IconProps> = (props) => {
    const { theme, className, style, ...restProps } = props
    const classes = classNames('youchen-icon', className, {
        [`icon-${theme}`]: theme
    })
    return (
        <FontAwesomeIcon className={classes} style={style} {...restProps} />
    )
}

export default Icon