import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps } from './button'

const defaultProps = {
    onClick: jest.fn()
}

const testProps: ButtonProps = {
    btnType: 'primary',
    size: 'lg',
    className: 'cls'
}

const linkProps: ButtonProps = {
    btnType: 'link',
    href: 'http://baidu.com'
}

const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn()
}

describe('test Button components', () => {
    it('should render the correct default button', () => {
        const warpper = render(<Button {...defaultProps} >default</Button>)
        const element = warpper.getByText('default') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
        expect(element).toHaveClass('btn btn-default')
        expect(element.disabled).toBeFalsy()
        fireEvent.click(element)
        expect(defaultProps.onClick).toHaveBeenCalled()
    })

    it('shoudld render corrent components based on different props', () => {
        const warpper = render(<Button {...testProps} >primary</Button>)
        const element = warpper.getByText('primary')
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('btn btn-primary btn-lg cls')
    })

    it('should render a link when btnType equals link and href is provided', () => {
        const warpper = render(<Button {...linkProps} >Link</Button>)
        const element = warpper.getByText('Link')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('A')
        expect(element).toHaveClass('btn btn-link')
    })

    it('should render disabled button when disabled set to true', () => {
        const warpper = render(<Button {...disabledProps} >disabled</Button>)
        const element = warpper.getByText('disabled') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.disabled).toBeTruthy()
        fireEvent.click(element)
        expect(defaultProps.onClick).toHaveBeenCalled()
    })
})