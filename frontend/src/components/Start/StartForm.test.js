import { fireEvent, render, screen } from '@testing-library/react';
import StartForm from './StartForm';

describe('StartForm componenet', () => {
    test('button is disabled on start', () => {
        //Arrange
        const onAdminAccFilledHandler = jest.fn();
        render(<StartForm onAdminAccFilled={onAdminAccFilledHandler} />)

        //Act
        const buttonElement = screen.getByRole('button');

        //Assert
        expect(buttonElement).toBeDisabled();
    });
    test('email input isValid is null on start', () => {
        //Arrange
        render(<StartForm />)

        //Act
        const emailTextBox =
            screen.getByRole('textbox', {
                name: /email address/i
            })

        //Assert
        expect(emailTextBox.getAttribute('isValid')).toBe(null);
    });
    test('email input isInvalid is null on start', () => {
        //Arrange
        render(<StartForm />)

        //Act
        const emailTextBox =
            screen.getByRole('textbox', {
                name: /email address/i
            })

        //Assert
        expect(emailTextBox.getAttribute('isInvalid')).toBe(null);
    });

    test('email input value is null on start', () => {
        //Arrange
        render(<StartForm />)

        //Act
        const emailTextBox =
            screen.getByRole('textbox', {
                name: /email address/i
            })

        //Assert
        expect(emailTextBox.getAttribute('value')).toBe("");
    });

    test('changing email text makes email appear on screen', () => {
        //Arrange
        render(<StartForm />)

        //Act
        const emailTextBox =
            screen.getByRole('textbox', {
                name: /email address/i
            })

        fireEvent.change(emailTextBox, { target: { value: 'test' } });
        //Assert
        expect(screen.getByDisplayValue('test')).toBeInTheDocument();

        //expect(emailTextBox.getAttribute('isInvalid')).toBe(null);
    });
    test('changing email makes value not null', () => {

        render(<StartForm />)
        //Act
        const emailTextBox =
            screen.getByRole('textbox', {
                name: /email address/i
            })

        fireEvent.change(emailTextBox, { target: { value: 'test' } });
        //Assert
        expect(emailTextBox.getAttribute('value')).not.toBe(null);

    });
    test('password input isValid is null on start', () => {
        //Arrange
        render(<StartForm />)

        //Act
        const passwordTextBox = document.getElementById('formPassword');

        //Assert
        expect(passwordTextBox.getAttribute('isValid')).toBe(null);
    });
    test('password input isInvalid is null on start', () => {
        //Arrange
        render(<StartForm />)

        //Act
        const passwordTextBox = document.getElementById('formPassword');

        //Assert
        expect(passwordTextBox.getAttribute('isInvalid')).toBe(null);
    });

    test('password input value is null on start', () => {
        //Arrange
        render(<StartForm />)

        //Act
        const passwordTextBox = document.getElementById('formPassword');

        //Assert
        expect(passwordTextBox.getAttribute('value')).toBe("");
    });


    test('changing password makes value not null', () => {

        render(<StartForm />)
        //Act
        const passwordTextBox = document.getElementById('formPassword');

        fireEvent.change(passwordTextBox, { target: { value: 'test' } });
        //Assert
        expect(passwordTextBox.getAttribute('value')).not.toBe(null);

    });

    test('passwordRepeat input isValid is null on start', () => {
        //Arrange
        render(<StartForm />)

        //Act
        const passwordTextBox = document.getElementById('formRepeatPassword');

        //Assert
        expect(passwordTextBox.getAttribute('isValid')).toBe(null);
    });
    test('passwordRepeat input isInvalid is null on start', () => {
        //Arrange
        render(<StartForm />)

        //Act
        const passwordTextBox = document.getElementById('formRepeatPassword');

        //Assert
        expect(passwordTextBox.getAttribute('isInvalid')).toBe(null);
    });

    test('passwordRepeat input value is null on start', () => {
        //Arrange
        render(<StartForm />)

        //Act
        const passwordTextBox = document.getElementById('formRepeatPassword');

        //Assert
        expect(passwordTextBox.getAttribute('value')).toBe("");
    });


    test('changing passwordRepeat makes value not null', () => {

        render(<StartForm />)
        //Act
        const passwordTextBox = document.getElementById('formRepeatPassword');

        fireEvent.change(passwordTextBox, { target: { value: 'test' } });
        //Assert
        expect(passwordTextBox.getAttribute('value')).not.toBe(null);

    });


    test('when passswords not the same print text: passwords do not match', () => {

        render(<StartForm />)
        //Act

        const passwordTextBox = document.getElementById('formPassword');
        const passwordRepeatTextBox = document.getElementById('formRepeatPassword');

        fireEvent.change(passwordTextBox, { target: { value: 'testasdasd' } });
        fireEvent.change(passwordRepeatTextBox, { target: { value: 'test2asdas' } });

        //Assert
        expect(screen.getByText('Passwords do not match!')).toBeInTheDocument();

    });

    test('when passswords the same do not print text: passwords do not match', () => {

        render(<StartForm />)
        //Act
        const passwordTextBox = document.getElementById('formPassword');
        const passwordRepeatTextBox = document.getElementById('formRepeatPassword');

        fireEvent.change(passwordTextBox, { target: { value: 'asAS12!@' } });
        fireEvent.change(passwordRepeatTextBox, { target: { value: 'asAS12!@' } });

        //Assert
        expect(screen.queryByText('Passwords do not match!')).not.toBeInTheDocument();

    });


    // test('Calls function on button click', () => {
    //     //Arrange
    //     const onAdminAccFilledHandler = jest.fn();
    //     <StartForm onAdminAccFilled={onAdminAccFilledHandler} />
    //     //  Act
    //     const buttonElement = screen.getByRole('button', {
    //         name: /Next/i, hidden: true
    //     })
    //     fireEvent.click(buttonElement);
    //     // Assert
    //     expect(onAdminAccFilledHandler).toHaveBeenCalledTimes(1);

    // })
}
)



