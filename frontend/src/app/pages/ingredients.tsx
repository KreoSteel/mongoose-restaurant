import useIngredients from "src/hooks/useIngredients"
import IngredientCard from "~/components/cards/IngredientCard";

export default function Ingredients() {
    const {data, isLoading} = useIngredients();
    if (isLoading) return <div>Loading...</div>
    if (!data) return <div>No data</div>
    return (
        <div className="flex flex-col gap-10 items-center justify-center mx-auto">
            <h1>Ingredients</h1>
            <ul className="flex flex-col gap-4">
                {data.data.map((ingredient) => (
                    <IngredientCard key={ingredient.id} ingredient={ingredient} />
                ))}
            </ul>
        </div>
    )
}