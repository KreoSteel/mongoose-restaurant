import type Category from "src/types/categories.ts";
import { useEditCategory } from "src/hooks/useCategories";
import { useState } from "react";
import { useDeleteCategory } from "src/hooks/useCategories";
import useFormState from "src/hooks/useFormState";
import Input from "../ui/Input";

export default function CategoryCard({ Category }: { Category: Category }) {
    const [category, setCategory, handleChange] = useFormState<Category>(Category);
    const [isEditing, setIsEditing] = useState(false);
    const { mutate: editCategory } = useEditCategory();
    const { mutate: deleteCategory } = useDeleteCategory();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submitting category:", category);
        editCategory(category);
    }


    return (
        <form className="flex gap-2 items-center justify-between bg-foreground rounded-md text-text" onSubmit={handleSubmit}>
            <span className="flex gap-4 items-center justify-between p-2 rounded-md">
                <Input label="Name" id="name" isEditing={isEditing} placeholder="Enter category name" value={category.name} onChange={handleChange} name="name" />
                <Input label="Description" width="w-[670px]" isEditing={isEditing} id="description" placeholder="Enter description about category" value={category.description} onChange={handleChange} name="description" />
            </span>
            <span className="flex gap-2 p-2">
                {isEditing ? <span className="flex gap-2">
                    <button type="submit" className="cursor-pointer bg-emerald-500 hover:bg-green-500/90 px-3 py-1 rounded-md" onClick={() => setIsEditing(false)}>Save</button>
                    <button type="button" className="cursor-pointer bg-red-500 hover:bg-red-600 rounded-md px-2 py-1" onClick={() => setIsEditing(false)}>Cancel</button>
                </span> :
                    <button className="cursor-pointer px-4 py-1 bg-amber-600 rounded-md" onClick={() => setIsEditing(true)}>Edit</button>}
                <button type="button" className="cursor-pointer px-4 py-1 bg-red-600 rounded-md" onClick={() => deleteCategory(category._id)}>Delete</button>
            </span>
        </form >
    );
}
