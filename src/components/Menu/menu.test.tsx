import React from 'react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import { RenderResult, render, fireEvent, cleanup, wait } from '@testing-library/react'
import SubMenu from './subMenu'

const defaultProps: MenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: 'test'
}
const testVerProps: MenuProps = {
    defaultIndex: '0',
    mode: 'vertical'
}
const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem >active</MenuItem>
            <MenuItem disabled >disabled</MenuItem>
            <MenuItem>xyz</MenuItem>
            <SubMenu title='下拉菜单' >
                <MenuItem>作品集 1</MenuItem>
                <MenuItem>关于我们 1</MenuItem>
            </SubMenu>
        </Menu>
    )
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe('test Menu and MenuItem component', () => {
    beforeEach(() => {
        wrapper = render(generateMenu(defaultProps));
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')
    })
    it('should render correct Menu and MenuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('menu test')
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4) // 测试第一层的li有几个
        expect(activeElement).toHaveClass('menu-item menu-item-active')
        expect(disabledElement).toHaveClass('menu-item menu-item-disabled')
    })

    it('click items should change active and call the right callback', () => {
        const thirdItem = wrapper.getByText('xyz')

        // 测试activeIndex变化
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('menu-item-active')
        expect(activeElement).not.toHaveClass('menu-item-active')
        expect(defaultProps.onSelect).toHaveBeenCalledWith('2')

        // 测试disabledMenuItem的点击事件
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('menu-item-active')
        expect(defaultProps.onSelect).not.toHaveBeenCalledWith('1')
    })

    it('should render vertical model when mode is set to vertical', () => {
        cleanup() // 清除挂载的节点
        const warpper = render(generateMenu(testVerProps))
        const menuElement = warpper.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    })

    it('should show dropdown items when hover on subMenu', async () => {
        expect(wrapper.queryByText('作品集 1')).not.toBeValid() // queryByText可以获取未显示的文本，并且其不可见
        const dropdownElement = wrapper.getByText('下拉菜单')
        fireEvent.mouseEnter(dropdownElement) // 触摸下拉菜单
        await wait(() => {
            expect(wrapper.queryByText('作品集 1')).toBeVisible()
        })
        fireEvent.click(wrapper.getByText('作品集 1'))
        expect(defaultProps.onSelect).toHaveBeenCalledWith('3-0')
        fireEvent.mouseLeave(dropdownElement)
        await wait(() => {
            expect(wrapper.queryByText('作品集 1')).not.toBeValid()
        })
    })
})