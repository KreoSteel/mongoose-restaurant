import { useState, useCallback } from "react";

export default function useFormState<T>(initialState:T):[T, React.Dispatch<React.SetStateAction<T>>, (e:React.ChangeEvent<HTMLInputElement>) => void] {
    const [state, setState] = useState(initialState);

    const handleChange = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.id || e.target.name ;
        if (!key) return;
        setState((prev) => ({...prev, [key]: e.target.value}))
    }, []);

    return [state, setState, handleChange];
}