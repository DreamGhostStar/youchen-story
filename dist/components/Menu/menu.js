import React, { createContext, useState } from 'react';
import classNames from 'classnames';
export var MenuContext = createContext({ index: '0' });
var Menu = function (props) {
    var _a;
    var className = props.className, mode = props.mode, style = props.style, children = props.children, defaultIndex = props.defaultIndex, onSelect = props.onSelect;
    var _b = useState(defaultIndex), activeIndex = _b[0], setActiveIndex = _b[1];
    var classes = classNames('menu', className, (_a = {},
        _a["menu-" + mode] = mode,
        _a));
    var handleClick = function (index) {
        setActiveIndex(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var passedContext = {
        index: activeIndex ? activeIndex : '0',
        onSelect: handleClick,
        mode: mode,
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName && ['MenuItem', 'SubMenu'].includes(displayName)) {
                return React.cloneElement(childElement, {
                    index: index.toString()
                });
            }
            else {
                console.error('Warning: Menu has a child whick is not a MenuItem component');
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style, "data-testid": 'test-menu' },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal'
};
export default Menu;
