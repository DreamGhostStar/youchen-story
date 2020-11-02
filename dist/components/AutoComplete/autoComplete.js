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
import React, { useState, useEffect, useRef } from 'react';
import Input from '../Input/input';
import useDebounce from '../../hooks/useDebounce';
import useClickOutSide from '../../hooks/useClickOutSide';
import classNames from 'classnames';
import Transition from '../Transition/transition';
import Icon from '../Icon/icon';
var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOption = props.renderOption, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderOption"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(-1), highlightIndex = _c[0], setHighlightIndex = _c[1];
    var _d = useState(false), loading = _d[0], setLoading = _d[1];
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    var debouncedValue = useDebounce(inputValue, 500);
    useClickOutSide(componentRef, function () {
        setSuggestions([]);
    });
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };
    var handleSelect = function (selected) {
        setInputValue(selected.value);
        setSuggestions([]);
        if (onSelect) {
            onSelect(selected);
        }
        triggerSearch.current = false;
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropdown = function () {
        return (React.createElement("ul", { className: 'youchen-dropdown' }, suggestions.map(function (item, index) {
            var classesInItem = classNames('youchen-dropdown-item', {
                'dropdown-item-highlight': index === highlightIndex
            });
            return React.createElement("li", { key: index, className: classesInItem, onClick: function () { return handleSelect(item); } }, renderTemplate(item));
        })));
    };
    var highlight = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighlightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            case 13: // 回车
                if (suggestions[highlightIndex]) { // 清除掉未有下拉显示的情况
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case 38: // 向上
                highlight(highlightIndex - 1);
                break;
            case 40: // 向下
                highlight(highlightIndex + 1);
                break;
            case 27: // ESC
                setSuggestions([]);
                break;
            default:
                break;
        }
    };
    useEffect(function () {
        if (debouncedValue && triggerSearch.current) {
            setLoading(true);
            var res = fetchSuggestions(debouncedValue);
            if (res instanceof Promise) {
                res.then(function (data) {
                    setLoading(false);
                    setSuggestions(data);
                });
            }
            else {
                setLoading(false);
                setSuggestions(res);
            }
        }
        else {
            setSuggestions([]);
        }
        setHighlightIndex(-1);
    }, [debouncedValue]);
    return (React.createElement("div", { className: 'youchen-auto-complete', ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue || '', onChange: handleChange, onKeyDown: handleKeyDown, suffixIcon: loading ? React.createElement(Icon, { icon: 'spinner', spin: true }) : undefined }, restProps)),
        React.createElement(Transition, { animation: 'zoom-in-top', timeout: 300, in: suggestions.length > 0 }, generateDropdown())));
};
export default AutoComplete;
