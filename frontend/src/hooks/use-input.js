import { useReducer } from "react";

const ACTIONS = { SET_ENTERED_VALUE: "SET_ENTERED_VALUE", SET_VALUE_IS_TOUCHED: "SET_VALUE_IS_TOUCHED", RESET: "RESET" };




const useInput = (valueValidator) => {

    const valueReducer = (state, action) => {
        switch (action.type) {
            case ACTIONS.SET_ENTERED_VALUE:
                const newObj = { enteredValue: action.enteredValue, enteredValueIsTouched: true };
                return newObj;
            case ACTIONS.SET_VALUE_IS_TOUCHED:
                const newState = { enteredValue: state.enteredValue, enteredValueIsTouched: true }
                return newState;

            case ACTIONS.RESET:
                return { enteredValue: '', enteredValueIsTouched: false }

            default:
                return state;
        }


    }

    const [state, dispatch] = useReducer(valueReducer, { enteredValue: '', enteredValueIsTouched: false })
    // console.log("state enetered val " + state.enteredValue);
    const valueIsValid = valueValidator(state.enteredValue);
    const hasError = (!valueIsValid && state.enteredValueIsTouched)
    // console.log("state is touched ", state.enteredValueIsTouched);

    const enteredValueChangeHandler = (event) => {
        // console.log(event.target.value);
        dispatch({ type: "SET_ENTERED_VALUE", enteredValue: event.target.value });

    }

    const enteredValueBlurHandler = (event) => {
        dispatch({ type: "SET_VALUE_IS_TOUCHED" });
    }

    const reset = () => {
        dispatch({ type: "RESET" })
    }




    // console.log("Haserror " + hasError);
    // console.log("valueIsValid " + valueIsValid);
    // console.log("istouched " + enteredValueIsTouched);




    return {
        value: state.enteredValue,
        isTouched: state.enteredValueIsTouched,
        isValid: valueIsValid,
        hasError: hasError,
        valueChangeHandler: enteredValueChangeHandler,
        valueBlurHandler: enteredValueBlurHandler,
        reset: reset
    }

}

export default useInput;