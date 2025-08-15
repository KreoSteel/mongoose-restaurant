import { useState } from "react"
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    isEditing?: boolean;
    label?: string
    width?: string
}

export default function Input({ isEditing, className, label, width, ...props }: InputProps) {
    const isEditingClasses = "border-1 rounded-md"
    return (
        <div className={`rounded-md flex flex-col w-full my-2 ${width}`}>
            <label htmlFor={props.id} className="text-xs font-bold pl-2">{label}</label>
            <input className={`${isEditing ? `${isEditingClasses} ml-2` : ""}${className} outline-0 disabled rounded-md flex justify-center items-center ${width} p-2 h-[45px]`} {...props} />
        </div>
    )
}