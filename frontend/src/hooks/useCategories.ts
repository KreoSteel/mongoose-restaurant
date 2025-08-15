import { useQuery, useMutation } from "@tanstack/react-query";
import http from "../utils/http";
import type Category from "src/types/categories.ts";
import { useQueryClient } from "@tanstack/react-query";

const useCategories = (page:number, limit:number) => {
    return useQuery({
        queryKey: ["categories", page, limit ],
        queryFn: async ():Promise<{currentPage:number, data:Category[], limit:number, totalPages:number}> => {
            const response = await http.get<{currentPage:number, data:Category[], limit:number, totalPages:number}>("/categories", { params: { page, limit } });
            console.log("Fetched categories:", response.data);
            return response.data;
        }
    });
}
const useEditCategory = () => {
    return useMutation({
        mutationFn: async (category:Category):Promise<Category> => {
            const response = await http.put(`/categories/${category._id}`, {...category, updatedAt:new Date()});
            return response.data
        },
        mutationKey: ["editCategory"]
    })
}

const useCreateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (category:Category):Promise<Category> => {
            const response = await http.post("/categories", {name:category.name, description:category.description});
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"]});
        },
        mutationKey: ["createCategory"]
    })
}

const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (categoryId: string): Promise<void> => {
            const response = await http.delete(`/categories/${categoryId}`);
            if (response.status === 400) {
                throw new Error("Failed to delete category");
            }
        },
        onSuccess: () => {
            alert("Category deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: (error) => {
            alert("Error: This category could not be deleted because it is still in use.");
        },
        mutationKey: ["deleteCategory"]
    })
}

export {useCategories, useEditCategory, useCreateCategory, useDeleteCategory}