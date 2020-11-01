import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'

export interface SubMenuProps {
    index?: string
    title: string
    className?: string
    style?: React.CSSProperties
    defaultOpenSubmenu?: boolean
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
    const context = useContext(MenuContext)
    const { index, title, children, className, style, defaultOpenSubmenu } = props

    const [submenuOpen, setSubmenuOpen] = useState(defaultOpenSubmenu && context.mode === 'vertical')
    const classes = classNames('menu-item youchen-submenu', className, {
        'menu-item-active': context.index === index,
        'submenu-is-opened': submenuOpen,
    })
    const renderChildren = () => {
        const subMenuClass = classNames('submenu-main', {
            'submenu-open': submenuOpen, // 如果打开子菜单或者默认展开
        })
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                })
            } else {
                console.error('Warning: SubMenu has a child whick is not a MenuItem component')
            }
        })
        return (
            <ul className={subMenuClass} >
                {childrenComponent}
            </ul>
        )
    }
    let timer: any;
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault();
        timer = setTimeout(() => {
            setSubmenuOpen(toggle)
        }, 300);
    }
    const handleClick = () => {
        if (context.mode === 'vertical') {
            setSubmenuOpen(!submenuOpen)
        }
        if (context.onSelect && (typeof index === 'string')) {
            context.onSelect(index)
        }
    }
    const mouseEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) },
    } : {}
    return (
        <li key={index} className={classes} style={style} {...mouseEvents} >
            <div className='submenu-title' onClick={handleClick}>
                {title}
                <Icon icon='angle-down' className='arrow-icon' />
            </div>
            <Transition
                in={submenuOpen}
                timeout={300}
                animation='zoom-in-top'
            >
                {renderChildren()}
            </Transition>
        </li>
    )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu