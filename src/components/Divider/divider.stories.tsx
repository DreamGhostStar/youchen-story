import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Divider, { DividerProps } from './divider';

export default {
    title: '信息展示/分割线',
    component: Divider
} as Meta;

const TemplateBasic: Story<DividerProps> = () => <div className='youchen-example' >
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
    <Divider />
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
</div>;

export const MenuDefault = TemplateBasic.bind({});
MenuDefault.storyName = '分割线'