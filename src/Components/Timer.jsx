import React, { useEffect, useState } from 'react'

export default function Timer() {

    const [isRunning, setIsRunning] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(25 * 60);

    useEffect(() => {
        if (isRunning) {
            var interval = setTimeout(() => {
                if (timeRemaining > 0) {

                    /*Note : change "state.count++" & "state.count--" to "state.count +1" and "state.count -1"
                    the increment(++) and decrement(--) operators directly modify state (this.state.count++ === this.state.count += 1) 
                    and thus your component re-renders each time with a newly assigned state, rather than just updating the "count" 
                    prop in state. */

                    setTimeRemaining((timeRemaining) => timeRemaining - 1);
                }
            }, 1000);
        }
        return () => {
            clearInterval(interval);
            console.warn('interval cleared...');
        }
    }, [isRunning, timeRemaining]);

    const formateTime = () => {
        const hours = ~~(timeRemaining / 3600);
        const minutes = ~~(timeRemaining / 60);
    }

    const handleOnStart = () => setIsRunning(true);
    const handleOnPause = () => setIsRunning(false);
    const handleOnReset = () => {
        setIsRunning(false);
        setTimeRemaining(25 * 60);
    }

    return (
        <>
            <h2>{timeRemaining}</h2>
            {!isRunning && <button onClick={() => { handleOnStart() }}>Start</button>}
            {isRunning && <button onClick={() => { handleOnPause() }}>Pause</button>} <br /><br />
            <button onClick={() => { handleOnReset() }}>Reset</button>
        </>
    )
}
