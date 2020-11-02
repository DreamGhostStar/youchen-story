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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
var Input = function (props) {
    var _a;
    var disabled = props.disabled, size = props.size, prefixIcon = props.prefixIcon, suffixIcon = props.suffixIcon, prefixLabel = props.prefixLabel, suffixLabel = props.suffixLabel, className = props.className, isPassword = props.isPassword, style = props.style, placeholder = props.placeholder, onFocus = props.onFocus, onBlur = props.onBlur, onMouseOver = props.onMouseOver, onMouseOut = props.onMouseOut, restProp = __rest(props, ["disabled", "size", "prefixIcon", "suffixIcon", "prefixLabel", "suffixLabel", "className", "isPassword", "style", "placeholder", "onFocus", "onBlur", "onMouseOver", "onMouseOut"]);
    var classes = classNames('youchen-input', (_a = {
            'input-disabled': disabled
        },
        _a["input-" + size] = size,
        _a));
    var _b = useState(false), isMouse = _b[0], setIsMouse = _b[1];
    var _c = useState(false), isFocus = _c[0], setIsFocus = _c[1];
    useEffect(function () {
        if (suffixIcon && suffixLabel) {
            console.error('suffixIcon can not coexist with suffixLabel');
        }
        if (prefixIcon && prefixLabel) {
            console.error('prefixIcon can not coexist with prefixLabel');
        }
    }, []);
    var handleMouseOver = function (e) {
        setIsMouse(true);
        if (onMouseOver) {
            onMouseOver(e);
        }
    };
    var handleMouseOut = function (e) {
        setIsMouse(false);
        if (onMouseOut) {
            onMouseOut(e);
        }
    };
    var handleFocus = function (e) {
        setIsFocus(true);
        if (onFocus) {
            onFocus(e);
        }
    };
    var handleBlur = function (e) {
        setIsFocus(false);
        if (onBlur) {
            onBlur(e);
        }
    };
    return (React.createElement("div", { className: 'youchen-input-layout', style: {
            boxShadow: isFocus ? '0 0 0 2px rgba(24, 144, 255, .2)' : "none"
        } },
        prefixIcon &&
            React.createElement("div", { className: 'youchen-input-prefix-icon-layout', style: {
                    borderColor: isMouse ? '#40a9ff' : '#ccc'
                } }, prefixIcon),
        prefixLabel &&
            React.createElement("div", { className: 'youchen-input-prefix-label-layout' }, prefixLabel),
        React.createElement("input", __assign({ type: isPassword ? 'password' : 'text', className: classes, style: __assign({ borderRight: suffixIcon ? 'none' : isMouse
                    ? '1px solid #40a9ff' : '1px solid #ccc', borderTopRightRadius: (suffixLabel || suffixIcon) ? '0px' : '3px', borderBottomRightRadius: (suffixLabel || suffixIcon) ? '0px' : '3px' }, restProp), placeholder: placeholder === null ? 'placeholder' : placeholder, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, onFocus: handleFocus, onBlur: handleBlur }, restProp)),
        suffixLabel &&
            React.createElement("div", { className: 'youchen-input-suffix-label-layout' }, suffixLabel),
        suffixIcon &&
            React.createElement("div", { className: 'youchen-input-suffix-icon-layout', style: {
                    borderColor: isMouse ? '#40a9ff' : '#ccc'
                } }, suffixIcon)));
};
Input.defaultProps = {
    disabled: false,
    size: 'normal',
    isPassword: false,
};
export default Input;
