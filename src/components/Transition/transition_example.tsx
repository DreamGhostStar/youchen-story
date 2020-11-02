import React, { FC, useState } from 'react'
import Button from '../Button/button'
import Transition from './transition'

const TransitionExample: FC = () => {
    const [visible, setVisible] = useState(false)
    return (
        <div className='youchen-example' >
            <Transition
                animation='zoom-in-top'
                in={visible}
                timeout={600}
                warpper={true}
            >
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
            </Transition>
            <Button onClick={() => setVisible(!visible)}>点击后切换内容</Button>
        </div>
    )
}

export default TransitionExample