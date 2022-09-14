import { render, screen, fireEvent } from '@testing-library/react';
import StartPage from './StartPage';

describe('StartPage component', () => {
    test('Renders CTF string', () => {
        //Arrange
        render(<StartPage />)
        //Act
        const element = screen.getByText('CTF', { exact: false });
        //Assert
        expect(element).toBeInTheDocument();
    })

    test('Renders tastic string', () => {
        //Arrange
        render(<StartPage />)
        //Act
        const element = screen.getByText('tastic', { exact: false });
        //Assert
        expect(element).toBeInTheDocument();
    })

    test('Renders Get started! button', () => {
        //Arrange
        render(<StartPage />)
        //Act
        const buttonElement = screen.getByRole('button');
        //Assert
        expect(buttonElement).toBeInTheDocument();

    })

    test('Calls function on button click', () => {
        //Arrange
        const onGetStarted = jest.fn();
        render(<StartPage onGetStarted={onGetStarted} />)
        //Act
        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);
        //Assert
        expect(onGetStarted).toHaveBeenCalledTimes(1);

    })
});

