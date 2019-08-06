import { useCallback, useEffect, useRef, useState } from 'react';

export const STATUS = {
    RUNNING: 'running',
    PAUSED: 'paused',
    STOPPED: 'stopped',
};

function useStopwatch({ interval = 10, onStop, onStart, onPause, onRestart }) {
    const stopwatchRef = useRef(null);

    const [milliseconds, setMilliseconds] = useState(0);

    const msRef = useRef(milliseconds);

    msRef.current = milliseconds;

    const [status, setStatus] = useState(STATUS.STOPPED)

    const restart = useCallback(() => {
        const ts = Date.now();
        const msCache = msRef.current;
        setMilliseconds(0);
        setStatus(STATUS.RUNNING);
        if (onRestart) onRestart({ ts, ms: msCache });
    }, [onRestart])

    const start = useCallback(() => {
        const ts = Date.now();
        setStatus(STATUS.RUNNING);
        if (onStart) onStart({ ts });
    }, [onStart]);

    const pause = useCallback(() => {
        const ts = Date.now();
        setStatus(STATUS.PAUSED);
        if (onPause) onPause({ ts, ms: msRef.current });
    }, [onPause]);

    const stop = useCallback(() => {
        setStatus(STATUS.STOPPED);
        const ts = Date.now();
        const msCache = msRef.current;
        setMilliseconds(0);
        if (onStop) onStop({ ts, ms: msCache });
    }, [onStop]);

    const setStopwatch = useCallback(() => {
        stopwatchRef.current = setInterval(() => {
            setMilliseconds(msRef.current + interval);
        }, interval);
    }, [interval]);

    useEffect(() => {
        if (status === STATUS.RUNNING) {
            setStopwatch();
        } else if (status === STATUS.STOPPED || status === STATUS.PAUSED) {
            clearInterval(stopwatchRef.current);
        }
    }, [status]);

    return [milliseconds, status, start, pause, stop, restart];
}

export default useStopwatch;
