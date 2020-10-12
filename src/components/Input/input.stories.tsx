import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Input, { InputProps } from './input';
import Icon from '../Icon/icon';

export default {
    title: '输入&输出/输入框',
    component: Input,
    argTypes: {
        size: {
            description: 'input的大小',
            control: {
                type: 'select',
                options: ['small', 'normal', 'large']
            }
        },
        prefixIcon: {
            control: null
        },
        suffixIcon: {
            control: null
        }
    }
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const InputDefault = Template.bind({});
InputDefault.storyName = '输入框'
InputDefault.args = {
    disabled: false,
    size: 'normal',
    isPassword: false,
    placeholder: 'placeholder'
};

export const InputWithPrefix = Template.bind({});
InputWithPrefix.storyName = '带前缀图标的输入框'
InputWithPrefix.args = {
    disabled: false,
    size: 'normal',
    isPassword: false,
    placeholder: 'placeholder',
    prefixIcon: <Icon icon='search'/>
};

export const InputWithPrefixLabel = Template.bind({});
InputWithPrefixLabel.storyName = '带前缀标签的输入框'
InputWithPrefixLabel.args = {
    disabled: false,
    size: 'normal',
    isPassword: false,
    placeholder: 'placeholder',
    prefixLabel: 'https://'
};

export const InputWithSuffixIcon = Template.bind({});
InputWithSuffixIcon.storyName = '带后缀图标的输入框'
InputWithSuffixIcon.args = {
    disabled: false,
    size: 'normal',
    isPassword: false,
    placeholder: 'placeholder',
    suffixIcon: <Icon icon='search'/>
};

export const InputWithSuffixLabel = Template.bind({});
InputWithSuffixLabel.storyName = '带后缀标签的输入框'
InputWithSuffixLabel.args = {
    disabled: false,
    size: 'normal',
    isPassword: false,
    placeholder: 'placeholder',
    suffixLabel: '.com'
};