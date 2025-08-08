import { useQuery } from "@tanstack/react-query";
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

export default useIngredients;