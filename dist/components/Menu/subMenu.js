var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';
var SubMenu = function (props) {
    var context = useContext(MenuContext);
    var index = props.index, title = props.title, children = props.children, className = props.className, style = props.style, defaultOpenSubmenu = props.defaultOpenSubmenu;
    var _a = useState(defaultOpenSubmenu && context.mode === 'vertical'), submenuOpen = _a[0], setSubmenuOpen = _a[1];
    var classes = classNames('menu-item youchen-submenu', className, {
        'menu-item-active': context.index === index,
        'submenu-is-opened': submenuOpen,
    });
    var renderChildren = function () {
        var subMenuClass = classNames('submenu-main', {
            'submenu-open': submenuOpen,
        });
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: index + "-" + i
                });
            }
            else {
                console.error('Warning: SubMenu has a child whick is not a MenuItem component');
            }
        });
        return (React.createElement("ul", { className: subMenuClass }, childrenComponent));
    };
    var timer;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setSubmenuOpen(toggle);
        }, 300);
    };
    var handleClick = function () {
        if (context.mode === 'vertical') {
            setSubmenuOpen(!submenuOpen);
        }
        if (context.onSelect && (typeof index === 'string')) {
            context.onSelect(index);
        }
    };
    var mouseEvents = context.mode !== 'vertical' ? {
        onMouseEnter: function (e) { handleMouse(e, true); },
        onMouseLeave: function (e) { handleMouse(e, false); },
    } : {};
    return (React.createElement("li", __assign({ key: index, className: classes, style: style }, mouseEvents),
        React.createElement("div", { className: 'submenu-title', onClick: handleClick },
            title,
            React.createElement(Icon, { icon: 'angle-down', className: 'arrow-icon' })),
        React.createElement(Transition, { in: submenuOpen, timeout: 300, animation: 'zoom-in-top' }, renderChildren())));
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
