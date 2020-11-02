import React from 'react';
export declare type AlertType = 'success' | 'default' | 'danger' | 'warning';
export declare type AlertPlace = 'top-left' | 'top' | 'top-right' | 'right' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left';
export interface AlertProps {
    message: string;
    decoration?: string;
    type?: AlertType;
    visible: boolean;
    onCancel?: () => void;
    placement?: AlertPlace;
}
declare const Alert: React.FC<AlertProps>;
export default Alert;
