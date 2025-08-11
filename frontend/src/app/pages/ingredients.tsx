import { useIngredients } from "src/hooks/useIngredients"
import IngredientCard from "~/components/cards/IngredientCard";
import Input from "~/components/ui/Input";
import { useState } from "react";
import useFormState from "src/hooks/useFormState";

export default function Ingredients() {
    const {data, isLoading} = useIngredients();
    const [ingredient, setIngredient] = useState("")
    if (isLoading) return <div>Loading...</div>
    if (!data) return <div>No data</div>
    return (
        <div className="flex flex-col gap-10 items-center justify-center mx-auto">
            <h1>Ingredients</h1>
            <form>
                <Input isEditing={true} value={ingredient} onChange={(e) => setIngredient(e.target.value)}>Create Ingredient</Input>
            </form>
            <ul className="flex flex-col gap-4">
                {data.data.map((ingredient) => (
                    <IngredientCard key={ingredient._id} ingredient={ingredient} />
                ))}
            </ul>
        </div>
    )
}