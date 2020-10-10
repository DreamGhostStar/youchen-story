import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import Button, { ButtonProps } from './button';

export default {
    title: '通用/按钮',
    component: Button,
    argTypes: {
        btnType: {
            description: '按钮类型',
            control: {
                type: 'select',
                options: ['default', 'primary', 'danger', 'link'],
            }
        },
        size: {
            description: '按钮大小',
            control: {
                type: 'select',
                options: ['sm', 'lg', 'normal'],
                defaultValue: 'normal'
            }
        }
    },

} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} >默认按钮</Button>;

export const Default = Template.bind({});
Default.storyName = '常规按钮'
Default.args = {
    btnType: 'default',
    size: 'normal'
};
Default.argTypes = {
    btnType: {
        control: {
            type: 'select',
            options: ['default', 'primary', 'danger'],
        }
    }
}


export const Different = Template.bind({});
Different.storyName = '特殊的链接按钮'
Different.args = {
    btnType: 'link',
    href: 'http://www.baidu.com'
};
Different.argTypes = {
    btnType: {
        defaultValue: 'link',
        control: null
    },
    href: {
        control: {
            type: 'text'
        }
    }
}