import { useState } from "react"
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    isEditing?: boolean;
    label?: string
}

export default function Input({ isEditing, className, label ,...props }: InputProps) {
    const isEditingClasses = "border-1 rounded-md"
    return (
        <div className="rounded-md flex flex-col w-full my-2">
            <label htmlFor={props.id} className="text-xs font-bold pl-2">{label}</label>
            <input className={`${isEditing ? isEditingClasses : ""}${className} outline-0 disabled rounded-md flex justify-center items-center w-full h-full p-2`} {...props} />
        </div>
    )
}