import React, { useState, ChangeEvent, ReactElement, useEffect, KeyboardEvent, useRef } from 'react'
import Input, { InputProps } from '../Input/input';
import useDebounce from '../../hooks/useDebounce'
import useClickOutSide from '../../hooks/useClickOutSide'
import classNames from 'classnames'
import Transition from '../Transition/transition';
import Icon from '../Icon/icon';

interface DataSourceObject {
    value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject // 支持数据源的多种类型
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (keyword: string) => DataSourceType[] | Promise<DataSourceType[]>
    onSelect?: (item: DataSourceType) => void
    renderOption?: (item: DataSourceType) => ReactElement
}

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
    const { fetchSuggestions, onSelect, value, renderOption, ...restProps } = props
    const [inputValue, setInputValue] = useState(value as string)
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
    const [highlightIndex, setHighlightIndex] = useState(-1)
    const [loading, setLoading] = useState(false)
    const triggerSearch = useRef(false)
    const componentRef = useRef<HTMLDivElement>(null)
    const debouncedValue = useDebounce(inputValue, 500)
    useClickOutSide(componentRef, () => {
        setSuggestions([])
    })
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
        triggerSearch.current = true
    }
    const handleSelect = (selected: DataSourceType) => {
        setInputValue(selected.value)
        setSuggestions([])
        if (onSelect) {
            onSelect(selected)
        }
        triggerSearch.current = false
    }
    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value
    }
    const generateDropdown = () => {
        return (
            <ul className='youchen-dropdown' >
                {
                    suggestions.map((item, index) => {
                        const classesInItem = classNames('youchen-dropdown-item', {
                            'dropdown-item-highlight': index === highlightIndex
                        });
                        return <li
                            key={index}
                            className={classesInItem}
                            onClick={() => handleSelect(item)}
                        >
                            {renderTemplate(item)}
                        </li>
                    })
                }
            </ul>
        )
    }
    const highlight = (index: number) => {
        if (index < 0) index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1
        }
        setHighlightIndex(index)
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.keyCode) {
            case 13: // 回车
                if (suggestions[highlightIndex]) { // 清除掉未有下拉显示的情况
                    handleSelect(suggestions[highlightIndex])
                }
                break;
            case 38: // 向上
                highlight(highlightIndex - 1)
                break;
            case 40: // 向下
                highlight(highlightIndex + 1)
                break;
            case 27: // ESC
                setSuggestions([])
                break;
            default:
                break;
        }
    }
    useEffect(() => {
        if (debouncedValue && triggerSearch.current) {
            setLoading(true)
            const res = fetchSuggestions(debouncedValue)
            if (res instanceof Promise) {
                res.then(data => {
                    setLoading(false)
                    setSuggestions(data)
                })
            } else {
                setLoading(false)
                setSuggestions(res);
            }
        } else {
            setSuggestions([])
        }
        setHighlightIndex(-1)
    }, [debouncedValue])
    return (
        <div className='youchen-auto-complete' ref={componentRef} >
            <Input
                value={inputValue || ''}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                suffixIcon={loading ? <Icon icon='spinner' spin /> : undefined}
                {...restProps}
            />
            <Transition
                animation='zoom-in-top'
                timeout={300}
                in={suggestions.length > 0}
            >
                {generateDropdown()}
            </Transition>
        </div>
    )
}

export default AutoComplete