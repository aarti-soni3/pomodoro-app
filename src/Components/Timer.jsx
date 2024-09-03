import React, { useEffect, useState } from 'react'

export default function Timer() {

    var seconds = 5000;
    const [isRunning, setIsRunning] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(seconds);

    useEffect(() => {
        if (isRunning) {
            var interval = setInterval(() => {
                setTimeRemaining((prevTime) => {
                    if (prevTime <= 1) {
                        setIsRunning(false);
                        return 0; //Note 1
                    }
                    return prevTime - 1; // Note 2
                });
            }, 1000);
        }
        return () => {
            interval && clearInterval(interval);
            console.warn('interval cleared...');
        }
    }, [isRunning]); // Note 3

    const formateTime = () => {
        const hours = Math.floor(timeRemaining / 3600); //Shorthand for Math.floor ~~(timeRemaining / 3600);
        const minutes = Math.floor((timeRemaining % 3600) / 60);
        const seconds = timeRemaining % 60;

        const padNumber = (num)=> num.toString().padStart(2,'0');
        return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;
    }

    const handleOnStart = () => setIsRunning(true);
    const handleOnPause = () => setIsRunning(false);
    const handleOnReset = () => {
        setIsRunning(false);
        setTimeRemaining(seconds);
    }

    return (
        <>
            <h2>{formateTime()}</h2>
            {!isRunning && <button onClick={() => { handleOnStart() }}>Start</button>}
            {isRunning && <button onClick={() => { handleOnPause() }}>Pause</button>} <br /><br />
            <button onClick={() => { handleOnReset() }}>Reset</button>
        </>
    )
}

/*Note 1 : change "state.count++" & "state.count--" to "state.count +1" and "state.count -1"
                   the increment(++) and decrement(--) operators directly modify state (this.state.count++ === this.state.count += 1) 
                   and thus your component re-renders each time with a newly assigned state, rather than just updating the "count" 
                   prop in state. */

/* Note 2 :
Purpose of the return statement:
1. When prevTime reaches 0, we want to ensure that timeRemaining stays at 0 and doesn't become negative.
2. Each time it runs, it calls setTimeRemaining with a callback function.
This callback checks if prevTime > 0. If true, it decrements prevTime by 1. 
If false (i.e., prevTime is 0 or less), it clears the interval, sets isRunning to false, and returns 0.
3. Without return 0, the state update would be undefined.
React treats undefined as "no update", meaning the state wouldn't change.
By explicitly returning 0, we ensure the state is set to 0 when the timer reaches zero.*/

/* Note 3 :
With only isRunning in the dependency array:
The effect runs when the component mounts and isRunning changes.
Once the interval is set up, it continues to run every second, updating timeRemaining.
These updates to timeRemaining don't cause the effect to re-run.
The key point is: Even though the effect doesn't re-run, the interval callback continues to execute every second, updating timeRemaining
*/