import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
var MenuItem = function (props) {
    var index = props.index, disabled = props.disabled, className = props.className, style = props.style, children = props.children;
    var context = useContext(MenuContext);
    var classes = classNames('menu-item', className, {
        'menu-item-disabled': disabled,
        'menu-item-active': context.index === index
    });
    var handleClick = function () {
        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index);
        }
    };
    return (React.createElement("li", { className: classes, style: style, onClick: handleClick }, children));
};
MenuItem.displayName = 'MenuItem';
export default MenuItem;
