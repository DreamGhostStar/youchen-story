import React from 'react'
import Alert, { AlertProps } from './alert'
import { render, fireEvent } from '@testing-library/react'

const defaultProps: AlertProps = {
    message: 'default',
    decoration: 'decoration',
    type: 'default',
    visible: true,
    placement: 'top'
}

const successProps: AlertProps = {
    message: 'success',
    decoration: 'decoration',
    type: 'success',
    visible: true,
    placement: 'top',
    onCancel: jest.fn()
}


describe('test Alert components', () => {
    it('should render default Alert', () => {
        const warpper = render(<Alert {...defaultProps} >default</Alert>)
        const elem = warpper.getByTestId('test-alert')
        expect(elem).toBeInTheDocument()
        expect(elem).toHaveClass('alert alert-default')
        expect(elem.tagName).toEqual('DIV')
    })
    it('should render different Alert based on differernt props', () => {
        const warpper = render(<Alert {...successProps} >default</Alert>)
        const elem = warpper.getByTestId('test-alert')
        expect(elem).toBeInTheDocument()
        expect(elem).toHaveClass('alert alert-success')
        expect(elem.tagName).toEqual('DIV')

        const closeIcon = warpper.getByTestId('test-alert-close-icon')
        fireEvent.click(closeIcon)
        expect(successProps.onCancel).toHaveBeenCalled()
    })
})