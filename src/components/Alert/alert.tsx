import React from 'react'
import classNames from 'classnames';
import Transition from '../Transition/transition';
import Icon from '../Icon/icon';

export type AlertType = 'success' | 'default' | 'danger' | 'warning'
export type AlertPlace = 'top-left' | 'top' | 'top-right' | 'right' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left'
export interface AlertProps {
    message: string
    decoration?: string
    type?: AlertType
    visible: boolean
    onCancel?: () => void
    placement?: AlertPlace
}

const Alert: React.FC<AlertProps> = (props) => {
    const { message, decoration, type, visible, onCancel, placement } = props
    const classes = classNames('alert', {
        [`alert-${type}`]: type,
        [`alert-${placement}`]: placement
    })
    return (
        <Transition
            animation='zoom-in-top'
            in={visible}
            timeout={600}
            warpper={true}
        >
            <div
                className={classes}
                style={{
                    display: visible ? 'block' : 'none',

                }}
            >
                <div className='alert-message' >
                    <p>{message}</p>
                    <Icon icon='times' className='alert-close' onClick={onCancel} />
                </div>
                {
                    decoration && <p>{decoration}</p>
                }
            </div>
        </Transition>
    )
}

Alert.defaultProps = {
    visible: false,
    type: 'default',
    placement: 'top'
}

export default Alert