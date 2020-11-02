import React from 'react';
export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string;
    style?: React.CSSProperties;
    defaultOpenSubmenu?: boolean;
}
declare const SubMenu: React.FC<SubMenuProps>;
export default SubMenu;
