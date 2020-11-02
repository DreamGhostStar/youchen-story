import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Upload, { UploadFile, UploadProps } from './upload';
import Button from '../Button/button';
const defaultFileList: UploadFile[] = [
    {
        uid: '1',
        size: 1024,
        name: 'hello.md',
        status: 'uploading',
        percent: 50
    },
    {
        uid: '2',
        size: 1024,
        name: 'hell1.md',
        status: 'success',
        percent: 100
    },
    {
        uid: '3',
        size: 1024,
        name: 'hello2.md',
        status: 'error',
        percent: 100
    }
]

export default {
    title: '输入&输出/上传文件',
    component: Upload,
    argTypes: {
        defaultFileList: {
            control: {
                type: null
            }
        },
        beforeUpload: {
            control: {
                type: null
            }
        }
    }
} as Meta;

const BasicTemplate: Story<UploadProps> = (args) => <Upload {...args} >
    <Button>上传文件</Button>
</Upload>;

// 检测文件大小
const handleBeforeUpload = (file: File) => {
    if (Math.round(file.size / 1024) > 50) {
        alert('文件大小超出')
        return false
    }
    return true
}
// 重命名文件
// const filePromise = (file: File) => {
//     const newFile = new File([file], 'new_name.docx', { type: file.type })
//     return Promise.resolve(newFile)
// }

export const UploadDefault = BasicTemplate.bind({});
UploadDefault.storyName = '基本的上传文件'
UploadDefault.args = {
    action: 'https://jsonplaceholder.typicode.com/posts/',
    beforeUpload: handleBeforeUpload,
    defaultFileList: defaultFileList
};

const DragTemplate: Story<UploadProps> = (args) => <Upload {...args} >
    <div className='example-drag' >
        upload File
    </div>
</Upload>;

export const UploadDrag = DragTemplate.bind({});
UploadDrag.storyName = '拖动上传'
UploadDrag.args = {
    action: 'https://jsonplaceholder.typicode.com/posts/',
    beforeUpload: handleBeforeUpload,
    defaultFileList: defaultFileList,
    drag: true
};