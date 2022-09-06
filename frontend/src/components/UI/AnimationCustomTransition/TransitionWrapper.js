
import styles from './TransitionWrapper.module.css';
import React from 'react';
import Transition from 'react-transition-group/Transition'
//Required props
// props.show - state variable
// props.MainClassName
// props.EnteringClassName
// props.ExitingClassName
// animationTiming - optional
// onWrapperDivClick

const TransitionWrapper = (props) => {
    const animationTiming = props.animationTiming || { enter: 400, exit: 400 }
    return (
        <Transition
            mountOnEnter
            unmountOnExit
            in={props.show}
            timeout={animationTiming}        >
            {(state) => {
                const cssClasses = [styles['transitionWrapper'], styles[props.MainClassName],
                state === 'entering' ? styles[props.EnteringClassName]
                    : state === 'exiting' ? styles[props.ExitingClassName] : null

                ]
                return (
                    <div onClick={props.onWrapperDivClick} className={cssClasses.join(' ')}>
                        {props.children}
                    </div>)
            }}

        </Transition>)

}

export default TransitionWrapper;