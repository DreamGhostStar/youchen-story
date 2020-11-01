import React from 'react'
import axios from 'axios'
import { render, fireEvent, RenderResult, wait, act, createEvent } from '@testing-library/react'
import Upload, { UploadProps } from './upload'

// yarn test -- -t "upload" 只测试以upload开头的测试文件
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
    action: 'www.baidu.com',
    onSuccess: jest.fn(),
    onChange: jest.fn(),
    drag: true,
    onRemove: jest.fn()
}
let wrapper: RenderResult,
    fileSelect: HTMLInputElement,
    uploadArea: HTMLElement,
    fileRmeoveIcon: HTMLElement
const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })
describe('test upload component', () => {
    beforeEach(async () => {
        act(() => {
            wrapper = render(<Upload {...testProps} >Click to Upload</Upload>)
            fileSelect = wrapper.getByTestId('file-input') as HTMLInputElement
            uploadArea = (wrapper.queryByText('Click to Upload') as HTMLElement)
        })
    })
    it('upload process should words fine', async () => {
        const { queryByText } = wrapper
        mockedAxios.post.mockImplementation(() => {
            return Promise.resolve({
                data: 'cool'
            })
        })
        expect(uploadArea).toBeInTheDocument()
        expect(fileSelect).not.toBeVisible()
        act(() => {
            fireEvent.change(fileSelect, {
                target: {
                    files: [testFile]
                }
            })
        })
        await wait(() => {
            expect(queryByText('test.png')).toBeInTheDocument()
        })
        expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile)
        expect(testProps.onChange).toHaveBeenCalledWith(testFile)

        // 测试移除文件
        fileRmeoveIcon = wrapper.getByTestId('file-remove')
        expect(fileRmeoveIcon).toBeInTheDocument()
        fireEvent.click(fileRmeoveIcon)
        expect(queryByText('test.png')).not.toBeInTheDocument()
        expect(testProps.onRemove).toHaveBeenCalledWith(
            expect.objectContaining({
                raw: testFile,
                status: 'success',
                name: 'test.png'
            })
        )
    })
    it('drag and drop files should works fine', async ()=>{
        fireEvent.dragOver(uploadArea)
        expect(uploadArea).toHaveClass('is-dragover')
        fireEvent.dragLeave(uploadArea)
        expect(uploadArea).not.toHaveClass('is-dragover')
        const mockDropEvent = createEvent.drop(uploadArea)
        Object.defineProperty(mockDropEvent, 'dataTransfer', {
            value: {
                files: [testFile]
            }
        })
        fireEvent(uploadArea, mockDropEvent)

        await wait(() => {
            expect(wrapper.queryByText('test.png')).toBeInTheDocument()
        })
    })
})