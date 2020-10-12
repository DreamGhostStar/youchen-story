import React, { RefObject, useEffect } from 'react'

function useClickOutSide(ref: RefObject<HTMLElement>, handler: Function) {
    useEffect(() => {
        const lisener = (event: MouseEvent) => {
            if(!ref.current || ref.current.contains(event.target as HTMLElement)) {
                return
            }
            handler(event)
        }
        document.addEventListener('click', lisener)
        return () => {
            document.removeEventListener('click', lisener)
        }
    }, [ref, handler])
}

export default useClickOutSide