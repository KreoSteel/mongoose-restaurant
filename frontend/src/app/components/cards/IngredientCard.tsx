import { useState } from "react";
import useIngredients from "src/hooks/useIngredients";
import type Ingredient from "src/types/ingredients";
import Input from "../ui/Input";

export default function IngredientCard({ingredient}:{ingredient:Ingredient}){
    const [isEditing, setIsEditing] = useState(false)
    
    return (
        <div className="flex justify-between items-center gap-10 w-full py-1 px-4 rounded-md shadow bg-foreground text-text">
            <span className="flex justify-between gap-4">
                <Input isEditing={isEditing} value={ingredient.name} type="name"></Input>
                <Input isEditing={isEditing} value={ingredient.price} type="number"></Input>
                <Input isEditing={isEditing} value={ingredient.stock} type="number"></Input>
            </span>
            <span className="flex gap-2 p-2">
                {isEditing ? <span>
                    <button onClick={() => setIsEditing(false)}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </span> :
                <button onClick={() => setIsEditing(true)}>Edit</button>}
            </span>
        </div>
    )
}