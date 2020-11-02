import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

export default {
    title: '使用前需看',
} as Meta;

const Template: Story = () => <div>
    <h1>欢迎来到youchen的组件库</h1>
    <code>npm i youchen-story --save</code>
</div>;

export const WelcomeDefault = Template.bind({});
WelcomeDefault.storyName = '介绍以及安装'