import { userState } from "react";

export default function MyComponent(){
    const [x, setX] = userState(0);

    const increment = () => {
        setX(x - 1);
    };
    return (
        <>
            <h1>{x}</h1>
            <button onClick={increment}>-</button>
        </>
    );
}