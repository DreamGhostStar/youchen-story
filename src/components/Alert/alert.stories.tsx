import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Alert, { AlertProps } from './alert';

export default {
    title: '通用/提示消息',
    component: Alert,
    argTypes: {
        message: {
            defaultValue: '-',
            description: '消息标题',
            control: {
                type: 'text',
            }
        },
        visible: {
            defaultValue: false,
            description: '开关',
            control: {
                type: 'boolean'
            }
        },
        type: {
            defaultValue: 'default',
            description: '提示消息的类型',
            control: {
                type: 'select',
                options: ['default', 'success', 'danger', 'warning']
            }
        },
        placement: {
            defaultValue: 'top',
            description: '提示消息出现的位置',
            control: {
                type: 'select',
                options: ['top-left', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left']
            }
        }
    }
} as Meta;

const Template: Story<AlertProps> = (args) => {
    return (
        <Alert {...args} />
    )
};

export const AlertDefault = Template.bind({});
AlertDefault.storyName = '不带描述的提示消息'
AlertDefault.args = {
    visible: false,
    message: '消息标题',
    type: 'default',
    placement: 'top'
}

export const AlertWithDescript = Template.bind({});
AlertWithDescript.storyName = '带描述的提示消息'
AlertWithDescript.args = {
    visible: false,
    message: '消息标题',
    type: 'default',
    placement: 'top',
    decoration: '描述'
}