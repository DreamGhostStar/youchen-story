import React, { DragEvent, FC, useState } from 'react'
import classnames from 'classnames'

interface DraggerProps {
    onFile: (files: FileList) => void
}

const Dragger: FC<DraggerProps> = (props) => {
    const { onFile, children } = props
    const [dragOver, setDragOver] = useState(false)
    const dragClasses = classnames('youchen-dragger', {
        'is-dragover': dragOver
    })
    const handleDrop = (e: DragEvent<HTMLElement>) => {
        e.preventDefault();
        setDragOver(false)
        console.log(e.dataTransfer.files)
        onFile(e.dataTransfer.files)
    }
    const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
        e.preventDefault()
        setDragOver(over)
    }
    return (
        <div
            className={dragClasses}
            onDragOver={e => handleDrag(e, true)}
            onDragLeave={e => handleDrag(e, false)}
            onDrop={handleDrop}
        >
            {children}
        </div>
    )
}

export default Dragger