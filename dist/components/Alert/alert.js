import React from 'react';
import classNames from 'classnames';
import Transition from '../Transition/transition';
import Icon from '../Icon/icon';
var Alert = function (props) {
    var _a;
    var message = props.message, decoration = props.decoration, type = props.type, visible = props.visible, onCancel = props.onCancel, placement = props.placement;
    var classes = classNames('alert', (_a = {},
        _a["alert-" + type] = type,
        _a["alert-" + placement] = placement,
        _a));
    return (React.createElement(Transition, { animation: 'zoom-in-top', in: visible, timeout: 600, warpper: true },
        React.createElement("div", { "data-testid": 'test-alert', className: classes, style: {
                display: visible ? 'block' : 'none',
            } },
            React.createElement("div", { className: 'alert-message' },
                React.createElement("p", null, message),
                React.createElement(Icon, { "data-testid": 'test-alert-close-icon', icon: 'times', className: 'alert-close', onClick: onCancel })),
            decoration && React.createElement("p", null, decoration))));
};
Alert.defaultProps = {
    visible: false,
    type: 'default',
    placement: 'top'
};
export default Alert;
