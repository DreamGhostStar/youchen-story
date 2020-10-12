import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Icon, { IconProps } from './icon';

export default {
    title: '通用/图标',
    component: Icon,
    argTypes: {
        size: {
            description: 'icon的大小',
            control: {
                type: 'inline-radio',
                options: ['1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x']
            }
        },
        icon: {
            description: '具体的图标',
            control: {
                type: 'text',
            }
        }
    }
} as Meta;

const Template: Story<IconProps> = (args) => <Icon {...args} />;

export const IconDefault = Template.bind({});
IconDefault.storyName = '图标'
IconDefault.args = {
    icon: 'times',
    size: '2x'
};

export const IconWithType = Template.bind({});
IconWithType.storyName = '不同风格的图标'
IconWithType.args = {
    icon: 'times',
    size: '2x',
    theme: 'primary'
};
IconWithType.argTypes = {
    theme: {
        description: '图标的风格',
        control: {
            type: 'select',
            options: ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark']
        }
    }
}