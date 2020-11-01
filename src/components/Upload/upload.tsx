import React, { ChangeEvent, FC, useRef, useState } from 'react'
import axios from 'axios'
import Icon from '../Icon/icon'
import Dragger from './dragger'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
    uid: string;
    size?: number;
    name?: string;
    status: UploadFileStatus;
    percent: number;
    raw?: File;
    response?: any;
    error?: any;
}

export interface UploadProps {
    action: string;
    defaultFileList?: UploadFile[];
    beforeUpload?: (file: File) => boolean | Promise<File>
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    onChange?: (file: File) => void;
    onRemove?: (file: UploadFile) => void;
    headers?: { [key: string]: any };
    drag: boolean;
}

const Upload: FC<UploadProps> = (props) => {
    const {
        action,
        defaultFileList,
        beforeUpload,
        onProgress,
        onSuccess,
        onChange,
        onError,
        onRemove,
        headers,
        children,
        drag
    } = props
    const fileInput = useRef<HTMLInputElement>(null)
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
    const [mouseIndex, setMouseIndex] = useState<number | null>(null)
    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList(prevList => {
            return prevList.map(file => {
                if (file.uid === updateFile.uid) {
                    return {
                        ...file,
                        ...updateObj
                    }
                } else {
                    return file
                }
            })
        })
    }
    const sendFile = (file: File) => {
        let tempFile: UploadFile = {
            uid: Date.now().toString(),
            name: file.name,
            status: 'ready',
            raw: file,
            percent: 0
        }
        setFileList([tempFile, ...fileList])
        const formData = new FormData()
        formData.append(file.name, file)
        axios.post(action, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...headers
            },
            onUploadProgress: (e: ProgressEvent<EventTarget>) => {
                let percentage = Math.round((e.loaded * 100) / e.total) || 0
                if (percentage < 100) {
                    updateFileList(tempFile, {
                        percent: percentage,
                        status: 'uploading'
                    })
                    if (onProgress) {
                        onProgress(percentage, file)
                    }
                }
            }
        }).then(res => {
            updateFileList(tempFile, {
                status: 'success',
                percent: 100
            })
            if (onSuccess) {
                onSuccess(res.data, file)
            }
            if (onChange) {
                onChange(file)
            }
        }).catch(err => {
            updateFileList(tempFile, {
                status: 'error',
                percent: 100
            })
            if (onError) {
                onError(err, file)
            }
            if (onChange) {
                onChange(file)
            }
        })
    }
    const uploadFiles = (files: FileList) => {
        let postFiles = Array.from(files)
        postFiles.forEach(file => {
            if (!beforeUpload) {
                sendFile(file)
            } else {
                const result = beforeUpload(file)
                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        sendFile(processedFile)
                    })
                } else if (result !== false) {
                    sendFile(file)
                }
            }
        })
    }
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            uploadFiles(files)
            if (fileInput.current) {
                fileInput.current.value = ''
            }
        }
    }
    const handleCilck = () => {
        if (fileInput.current) {
            fileInput.current.click()
        }
    }
    const getFilePercent = (index: number) => {
        return (fileList[index] && fileList[index].percent) || 0
    }
    const handleRemove = (file: UploadFile) => {
        setFileList((preFileList) => {
            return preFileList.filter(item => item.uid !== file.uid)
        })
        if (onRemove) {
            onRemove(file)
        }
    }
    return (
        <div className='youchen-upload'>
            <div onClick={handleCilck}>
                {
                    drag
                        ? <Dragger onFile={(dragFileList) => { uploadFiles(dragFileList) }} >
                            {children}
                        </Dragger>
                        : children
                }
                <input
                    data-testid='file-input'
                    type="file"
                    className='youchen-file-input'
                    style={{
                        display: 'none'
                    }}
                    ref={fileInput}
                    onChange={handleFileChange}
                />
            </div>
            {
                fileList.map((file, index) => {
                    return <div key={file.uid}>
                        <div
                            className='file-item-layout'
                            onMouseOver={() => setMouseIndex(index)}
                            onMouseOut={() => setMouseIndex(null)}
                        >
                            <div className='file-item-info-layout' >
                                <Icon
                                    icon='file-alt'
                                    theme='secondary'
                                    className={`file-icon file-icon-${file.status}`}
                                />
                                <p className={`file-item-name file-item-name-${file.status}`}
                                >{file.name}</p>
                            </div>
                            <div style={{
                                display: mouseIndex === index ? 'none' : 'block'
                            }}>
                                {file.status === 'uploading' && <Icon icon='spinner' spin theme='primary' className='file-status-icon' />}
                                {file.status === 'success' && <Icon icon='check-circle' theme='success' className='file-status-icon' />}
                                {file.status === 'error' && <Icon icon='times-circle' theme='danger' className='file-status-icon' />}
                            </div>
                            <Icon
                                style={{
                                    display: mouseIndex === index ? 'block' : 'none'
                                }}
                                data-testid='file-remove'
                                icon='times'
                                className='file-close-icon'
                                onClick={() => handleRemove(file)}
                            />
                        </div>
                        <div
                            style={{
                                display: [0, 100].indexOf(getFilePercent(index)) === -1 ? 'block' : 'none'
                            }}
                            className='upload-progress-layout'
                        >
                            <div
                                style={{
                                    width: `${getFilePercent(index)}%`
                                }}
                                className='upload-progress'
                            >
                                <p className='progress-number' >{getFilePercent(index)}%</p>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

Upload.defaultProps = {
    action: '#',
    drag: false
}

export default Upload