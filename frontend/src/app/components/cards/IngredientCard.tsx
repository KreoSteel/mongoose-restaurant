import { useState } from "react";
import {useEditIngredient, useIngredients} from "src/hooks/useIngredients";
import type Ingredient from "src/types/ingredients";
import Input from "../ui/Input";
import useFormState from "src/hooks/useFormState";

export default function IngredientCard({ingredient}:{ingredient:Ingredient}){
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData ,handleChange] = useFormState({name:ingredient.name, price:ingredient.price, stock:ingredient.stock}) as [{name:string, price:number, stock:number}, React.Dispatch<React.SetStateAction<{name:string, price:number, stock:number}>>, (e: React.ChangeEvent<HTMLInputElement>) => void]
    const {mutate:editIngredient} = useEditIngredient();
    const handleSave = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        editIngredient({...formData, _id:ingredient._id, updatedAt:ingredient.updatedAt} as Ingredient)
        console.log("Sent data: ",formData)
        setIsEditing(false)
    }


    return (
        <form onSubmit={handleSave} className="flex justify-between items-center gap-10 w-full py-1 px-4 rounded-md shadow bg-foreground text-text" key={ingredient._id}>
            <span className="flex justify-between gap-4">
                <Input label="Name" name="name" id="name" className="font-bold text-md" isEditing={isEditing} value={formData.name} onChange={handleChange} type="name"></Input>
                <Input label="Price" name="price" id="price" className="max-w-[125px]" isEditing={isEditing} value={formData.price} onChange={handleChange} type="number"></Input>
                <Input label="Stock" name="stock" id="stock" className="max-w-[125px]" isEditing={isEditing} value={formData.stock} onChange={handleChange} type="number"></Input>
            </span>
            <span className="flex gap-2 p-2">
                {isEditing ? <span className="flex gap-5">
                    <button type="submit" className="cursor-pointer bg-emerald-500 hover:bg-green-500/90 px-3 py-1 rounded-xl">Save</button>
                    <button className="cursor-pointer bg-red-500 hover:bg-red-600 rounded-xl px-2 py-1" onClick={() => setIsEditing(false)}>Cancel</button>
                </span> :
                <button className="cursor-pointer px-4 py-1 bg-amber-600 rounded-xl" onClick={() => setIsEditing(true)}>Edit</button>}
            </span>
        </form>
    )
}