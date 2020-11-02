import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

export default {
    title: '信息展示/菜单',
    component: Menu
} as Meta;

const TemplateBasic: Story<MenuProps> = () => <Menu>
    <MenuItem>菜单项1</MenuItem>
    <MenuItem>菜单项2</MenuItem>
</Menu>;

export const MenuDefault = TemplateBasic.bind({});
MenuDefault.storyName = '基本的菜单'

const TemplateSubMenu: Story<MenuProps> = () => <Menu>
    <MenuItem>菜单项1</MenuItem>
    <MenuItem>菜单项2</MenuItem>
    <SubMenu title='子菜单标题' >
        <MenuItem>子菜单1</MenuItem>
        <MenuItem>子菜单2</MenuItem>
    </SubMenu>
</Menu>;

export const SubMenuDefault = TemplateSubMenu.bind({});
SubMenuDefault.storyName = '包含子菜单的菜单'

const TemplateVerticalMenu: Story<MenuProps> = () => <Menu
    mode='vertical'
>
    <MenuItem>菜单项1</MenuItem>
    <MenuItem>菜单项2</MenuItem>
    <SubMenu title='子菜单标题' >
        <MenuItem>子菜单1</MenuItem>
        <MenuItem>子菜单2</MenuItem>
    </SubMenu>
</Menu>;

export const VerticalMenu = TemplateVerticalMenu.bind({});
VerticalMenu.storyName = '纵向菜单'