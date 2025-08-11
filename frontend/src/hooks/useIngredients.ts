import { useQuery, useMutation } from "@tanstack/react-query";
import http from "../utils/http";
import type Ingredient from "src/types/ingredients";

const useIngredients = () => {
    return useQuery({
        queryKey: ["ingredients"],
        queryFn: async ():Promise<{current:number, data:Ingredient[], limit:number, totalPages:number}> => {
            const response = await http.get<{current:number, data:Ingredient[], limit:number, totalPages:number}>("/ingredients");
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



export {useIngredients, useEditIngredient}