import React from "react";

function useInterval(callback: (...args: any[]) => void, delay: number) {
    const savedCallback = React.useRef(callback);

    React.useEffect(() => {
        savedCallback.current = callback;
    });

    React.useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        const id = setInterval(tick, delay);
        return () => clearInterval(id);
    }, [delay]);
}

export default useInterval;