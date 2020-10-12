import React from 'react'
import AutoComplete, { AutoCompleteProps, DataSourceType } from './autoComplete'
import { RenderResult, render, fireEvent, wait, cleanup } from '@testing-library/react'
import { config } from 'react-transition-group'
config.disabled = true
interface renderOptionItemProps {
    value: string;
    number?: number
}

const testArray = [
    { value: 'ab', number: 11 },
    { value: 'abc', number: 1 },
    { value: 'b', number: 4 },
    { value: 'c', number: 15 },
]
const testProps: AutoCompleteProps = {
    fetchSuggestions: (query) => { return testArray.filter(item => item.value.includes(query)) },
    onSelect: jest.fn(),
    placeholder: 'auto-complete'
}

const renderOption = (item: DataSourceType<renderOptionItemProps>) => {
    return (
        <>
            <h2>Name: {item.value}</h2>
            <p>Number: {item.number}</p>
        </>
    )
}

const renderOptionProps: AutoCompleteProps = {
    fetchSuggestions: (query) => { return testArray.filter(item => item.value.includes(query)) },
    onSelect: jest.fn(),
    placeholder: 'auto-complete renderOption',
    renderOption: renderOption
}

const asyncFunc = async (query: string) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(testArray.filter((item: any) => item.value.includes(query)))
        }, 3000);
    })
}

const asyncProps: AutoCompleteProps = {
    fetchSuggestions: async (query): Promise<any> => {
        return await asyncFunc(query)
    },
    onSelect: jest.fn(),
    placeholder: 'auto-complete async',
}

let wrapper: RenderResult, inputNode: HTMLInputElement; // 容器和input元素

describe('test AutoComplete component', () => {
    beforeEach(() => { // 提前渲染
        wrapper = render(<AutoComplete {...testProps} />)
        inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
    })
    it('test basic AutoComplete behavior', async () => {
        // 改变input的值
        fireEvent.change(inputNode, { target: { value: 'a' } })
        // input设置了防抖，应该异步 操作
        await wait(() => {
            expect(wrapper.queryByText('ab')).toBeInTheDocument()
        })
        // 出现的下拉提示应该有两项
        expect(wrapper.container.querySelectorAll('.youchen-dropdown-item').length).toEqual(2)
        // 点击ab项的提示
        fireEvent.click(wrapper.getByText('ab'))
        // onSelect应该触发，并且参数应是value:'ab', number: 11
        expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 })
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument() // 并且其应不存在
        // ab应填充到input
        expect(inputNode.value).toBe('ab')
    })
    it('should provide keyboard support', async () => {
        // 改变input的值
        fireEvent.change(inputNode, { target: { value: 'a' } })
        await wait(() => {
            expect(wrapper.queryByText('ab')).toBeInTheDocument()
        })
        const firstResult = wrapper.queryByText('ab')
        const secondResult = wrapper.queryByText('abc')

        fireEvent.keyDown(inputNode, { keyCode: 40 }); // 按下向下键
        expect(firstResult).toHaveClass('dropdown-item-highlight')

        fireEvent.keyDown(inputNode, { keyCode: 40 }); // 按下向下键
        expect(secondResult).toHaveClass('dropdown-item-highlight')

        fireEvent.keyDown(inputNode, { keyCode: 38 }) // 按下向上键
        expect(firstResult).toHaveClass('dropdown-item-highlight')

        fireEvent.keyDown(inputNode, { keyCode: 13 }); // 按下Enter
        expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 })
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument() // 并且其应不存在
        expect(inputNode.value).toBe('ab')
    })
    it('click outside should hide the dropdown', async () => {
        // 改变input的值
        fireEvent.change(inputNode, { target: { value: 'a' } })
        await wait(() => {
            expect(wrapper.queryByText('ab')).toBeInTheDocument()
        })
        fireEvent.click(document)
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    })
    it('renderOption should generate the right template', async () => {
        cleanup()
        const wrapper = render(<AutoComplete {...renderOptionProps} />)
        const inputNode = wrapper.getByPlaceholderText('auto-complete renderOption') as HTMLInputElement
        // 改变input的值
        fireEvent.change(inputNode, { target: { value: 'a' } })
        await wait(() => {
            expect(wrapper.queryByText('Number: 11')).toBeInTheDocument()
        })
    })
    it('async fetchSuggestions should works fine', async () => {
        cleanup()
        const wrapper = render(<AutoComplete {...asyncProps} />)
        const inputNode = wrapper.getByPlaceholderText('auto-complete async') as HTMLInputElement

        // 改变input的值
        fireEvent.change(inputNode, { target: { value: 'a' } })
        await wait(() => {
            expect(wrapper.queryByText('ab')).toBeInTheDocument()
        })
    })
})