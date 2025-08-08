import { useState } from "react"
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    isEditing?: boolean;
}

export default function Input({ isEditing, ...props }:InputProps){
    const [value, setValue] = useState(props.value || "")
    if(isEditing){
        return (
            <input {...props} value={value} onChange={(e) => setValue(e.target.value)} />
        )
    }
    return (
        <span>{value}</span>
    )
}