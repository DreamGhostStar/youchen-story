import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import AutoComplete, { AutoCompleteProps, DataSourceType } from './autoComplete';

export default {
    title: '输入&输出/输入补全提示',
    component: AutoComplete,
    argTypes: {
        onSelect: { action: 'clicked' }
    }
} as Meta;

// const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
//     'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']

interface LakerItemProps {
    value: string;
    number?: number;
}
const lakersWithNumber: LakerItemProps[] = [
    { value: 'bradley', number: 11 },
    { value: 'pope', number: 1 },
    { value: 'caruso', number: 4 },
    { value: 'cook', number: 2 },
    { value: 'cousins', number: 15 },
    { value: 'james', number: 23 },
    { value: 'AD', number: 3 },
    { value: 'green', number: 14 },
    { value: 'howard', number: 39 },
    { value: 'kuzma', number: 0 },
]
const handleFetch = (query: string) => {
    return lakersWithNumber.filter(name => name.value.includes(query))
}
const renderOption = (item: DataSourceType<LakerItemProps>) => {
    return (
        <>
            <h2>Name: {item.value}</h2>
            <p>NUmber: {item.number}</p>
        </>
    )
}

const Template: Story<AutoCompleteProps> = (args) => {
    return (
        <AutoComplete {...args} />
    )
};

export const AutoCompleteDefault = Template.bind({});
AutoCompleteDefault.storyName = '输入补全提示'
AutoCompleteDefault.args = {
    fetchSuggestions: handleFetch,
    // onSelect: (value) => { console.log(value); },
    // renderOption: renderOption,
    placeholder: ''
};

const asyncFunc = async (query: string): Promise<any> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(lakersWithNumber.filter((item: any) => item.value.includes(query)))
        }, 3000);
    })
}

const asyncProps: AutoCompleteProps = {
    fetchSuggestions: async (query): Promise<any> => {
        return await asyncFunc(query)
    },
    onSelect: (value) => { console.log(value); },
}
export const AutoCompleteAsync = Template.bind({})
AutoCompleteAsync.storyName = '异步输入补全提示'
AutoCompleteAsync.args = {
    ...asyncProps
}