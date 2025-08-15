import { useIngredients } from "src/hooks/useIngredients"
import IngredientCard from "~/components/cards/IngredientCard";
import Input from "~/components/ui/Input";
import type Ingredient from "src/types/ingredients.ts";
import { useCreateIngredient } from "src/hooks/useIngredients";
import useFormState from "src/hooks/useFormState";
import Pagination from "~/components/layouts/Pagination";
import { useState } from "react";

export default function Ingredients() {
    const PAGE_LIMIT = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const {data, isLoading} = useIngredients(currentPage, PAGE_LIMIT);
    const [ingredient, setIngredient, handleChange] = useFormState({_id:"", name: "", price: 1, stock: 1, updatedAt: new Date(), createdAt: new Date()} as Ingredient);
    const {mutate: createIngredient} = useCreateIngredient();
    if (isLoading) return <div>Loading...</div>
    if (!data) return <div>No data</div>

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submitting ingredient:", ingredient);
        createIngredient(ingredient);
    }

    return (
        <div className="flex flex-col gap-10 items-center justify-center mx-auto">
            <h1>Ingredients</h1>
            <form className="flex gap-2 justify-center items-center" onSubmit={handleSubmit}>
                <Input placeholder="Enter ingredient name" id="name" label="Ingredient Name" required type="text" isEditing={true} value={ingredient.name} onChange={handleChange}></Input>
                <Input id="price" label="Price" type="number" required min={1} max={9999} isEditing={true} value={ingredient.price} onChange={handleChange}></Input>
                <Input id="stock" label="Stock" type="number" required min={1} max={999} isEditing={true} value={ingredient.stock} onChange={handleChange}></Input>
                <button className="cursor-pointer bg-amber-500 rounded-md px-4 py-2" type="submit">Create</button>
            </form>
            <ul className="flex flex-col gap-4">
                {data.data.map((ingredient) => (
                    <IngredientCard key={ingredient._id} ingredient={ingredient} />
                ))}
            </ul>
            <Pagination totalPages={data.totalPages} limit={data.limit} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    )
}