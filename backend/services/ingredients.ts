import Ingredient from "../models/ingredients";
import paginate from "../utils/pagination";

export async function getIngredients(page: number, itemsPerPage: number) {
    const ingredients = await Ingredient.find();
    const paginatedIngredients = paginate(ingredients, page, itemsPerPage);
    return paginatedIngredients;
}


export async function createIngredient(name: string, price: number, stock?: number) {
    const newIngredient = new Ingredient({name, price, stock});
    return await newIngredient.save();
}


export async function getIngredientById(id: string) {
    const ingredient = await Ingredient.findById(id);
    return ingredient;
}


export async function updateIngredient(id: string, name: string, price: number, stock?: number) {
    console.log('Before update - ID:', id, 'Name:', name, 'Price:', price, 'Stock:', stock);
    
    // First, get the current document to check its version
    const currentIngredient = await Ingredient.findById(id);
    if (!currentIngredient) {
        throw new Error("Ingredient not found");
    }
    console.log('Current version before update:', currentIngredient.__v);
    
    // Use updateOne to force version increment
    const updateResult = await Ingredient.updateOne(
        { _id: id },
        { 
            $set: { name, price, ...(stock !== undefined && { stock }) },
            $inc: { __v: 1 }
        }
    );
    
    console.log('Update result:', updateResult);
    
    // Get the updated document
    const updatedIngredient = await Ingredient.findById(id);
    if (!updatedIngredient) {
        throw new Error("Failed to retrieve updated ingredient");
    }
    console.log('After update - Version:', updatedIngredient.__v, 'Updated ingredient:', updatedIngredient);
    
    return updatedIngredient;
}


export async function deleteIngredient(id: string) {
    const ingredient = await Ingredient.findByIdAndDelete(id);
    return ingredient;
}
