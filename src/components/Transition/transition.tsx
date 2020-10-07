import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'

type TransitionProps = CSSTransitionProps & {
    animation?: AnimationName
    warpper?: boolean
}

const Transition: React.FC<TransitionProps> = (props) => {
    const { children, classNames, animation, warpper, ...restProps } = props
    return (
        <CSSTransition
            classNames={classNames || animation}
            {...restProps}
        >
            {
                warpper
                    ? <div>{children}</div>
                    : children
            }
        </CSSTransition>
    )
}

Transition.defaultProps = {
    unmountOnExit: true,
    appear: true,
    warpper: false
}
export default Transition