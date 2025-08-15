import { useQuery, useMutation } from "@tanstack/react-query";
import http from "../utils/http";
import type Ingredient from "src/types/ingredients.ts";
import { useQueryClient } from "@tanstack/react-query";

const useIngredients = (page:number, limit:number) => {
    return useQuery({
        queryKey: ["ingredients", page, limit],
        queryFn: async ():Promise<{currentPage:number, data:Ingredient[], limit:number, totalPages:number}> => {
            const response = await http.get<{currentPage:number, data:Ingredient[], limit:number, totalPages:number}>("/ingredients", { params: { page, limit } });
            return response.data;
        }
    });
}
const useEditIngredient = () => {
    return useMutation({
        mutationFn: async (ingredient:Ingredient):Promise<Ingredient> => {
            const response = await http.put(`/ingredients/${ingredient._id}`, {...ingredient, updatedAt:new Date()});
            return response.data
        },
        mutationKey: ["editIngredient"]
    })
}

const useCreateIngredient = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (ingredient:Ingredient):Promise<Ingredient> => {
            const response = await http.post("/ingredients", {name:ingredient.name, price:ingredient.price, stock:ingredient.stock, updatedAt:new Date()});
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ingredients"]});
        },
        mutationKey: ["createIngredient"]
    })
}

export {useIngredients, useEditIngredient, useCreateIngredient}