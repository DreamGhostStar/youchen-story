import React, { createContext, useState } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectIndex: string) => void
export interface MenuProps {
    defaultIndex?: string
    className?: string
    mode?: MenuMode
    style?: React.CSSProperties
    onSelect?: SelectCallback
}

interface IMenuContext {
    index: string
    onSelect?: SelectCallback,
    mode?: string
}
export const MenuContext = createContext<IMenuContext>({ index: '0' })
const Menu: React.FC<MenuProps> = (props) => {
    const { className, mode, style, children, defaultIndex, onSelect } = props
    const [activeIndex, setActiveIndex] = useState(defaultIndex)
    const classes = classNames('menu', className, {
        [`menu-${mode}`]: mode
    })
    const handleClick = (index: string) => {
        setActiveIndex(index)
        if (onSelect) {
            onSelect(index)
        }
    }
    const passedContext: IMenuContext = {
        index: activeIndex ? activeIndex : '0',
        onSelect: handleClick,
        mode,
    }
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if (displayName && ['MenuItem', 'SubMenu'].includes(displayName)) {
                return React.cloneElement(childElement, {
                    index: index.toString()
                })
            } else {
                console.error('Warning: Menu has a child whick is not a MenuItem component')
            }
        })
    }

    return (
        <ul className={classes} style={style} data-testid='test-menu' >
            <MenuContext.Provider value={passedContext} >
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal'
}

export default Menu