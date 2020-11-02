import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Transition, { TransitionProps } from './transition';
import TransitionExample from './transition_example';

export default {
    title: '通用/动画效果',
    component: Transition
} as Meta;

let visible = false

const TemplateBasic: Story<TransitionProps> = () => <TransitionExample />;

export const TransitionDefault = TemplateBasic.bind({});
TransitionDefault.storyName = '动画效果'