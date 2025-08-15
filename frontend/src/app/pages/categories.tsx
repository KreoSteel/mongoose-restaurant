import { useCategories, useCreateCategory, useEditCategory } from "src/hooks/useCategories";
import Input from "~/components/ui/Input";
import CategoryCard from "~/components/cards/CategoryCard";
import Pagination from "~/components/layouts/Pagination";
import useFormState from "src/hooks/useFormState";
import type Category from "src/types/categories.ts";
import { useEffect, useState } from "react";

export default function Categories() {
    const PAGE_LIMIT = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useCategories(currentPage, PAGE_LIMIT);
    const { mutate: createCategory } = useCreateCategory();
    const [category, setCategory, handleChange] = useFormState<Category>({
        _id: "",
        name: "",
        description: ""
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Submitting category:", category);
        createCategory(category);
    };

    useEffect(() => {
        console.log("Current page:", currentPage);
    }, [currentPage]);

    if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>No data</div>;

    return (
        <div className="flex flex-col gap-10 items-center justify-center w-full mx-auto">
            <form onSubmit={handleSubmit} className="flex gap-2 justify-center items-center mt-7">
                <Input className="border-1 text-gray-300" placeholder="Category name" id="name" value={category.name} onChange={handleChange} />
                <Input className="border-1 text-gray-300" placeholder="Category description" id="description" value={category.description} onChange={handleChange} />
                <button className="cursor-pointer bg-amber-500 rounded-md px-4 py-2" type="submit">Create</button>
            </form>
            <ul className="flex flex-col gap-4 w-[1200px]">
                {data.data.map(category => (
                    <CategoryCard key={category._id} Category={category} />
                ))}
            </ul>
            <Pagination totalPages={data.totalPages} limit={data.limit} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
}