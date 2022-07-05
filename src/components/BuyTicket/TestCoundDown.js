import React from 'react'
import { useState, useEffect } from 'react';

const TestCoundDown = (props) => {
    const { initialMinute = 0, initialSeconds = 0 } = props;
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(10);
    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    alert("OK")
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });


    return (

        <div >
            {minutes === 0 && seconds === 0
                ? null
                : <h1> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
            }
        </div >
    )
}

export default TestCoundDown;