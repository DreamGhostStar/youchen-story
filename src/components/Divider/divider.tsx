import React, { FC } from 'react'
import classnames from 'classnames'

type NativeProps = React.HTMLAttributes<HTMLElement>
type AnchorProps = React.AnchorHTMLAttributes<HTMLElement>
export type DividerProps = Partial<NativeProps & AnchorProps>

const Divider: FC<DividerProps> = (props) => {
    const { className, style, ...restProps } = props
    return <div
        style={style}
        className={classnames('youchen-divider', className)}
        {...restProps}
    ></div>
}

export default Divider