import Dish from "../models/dishes";
import paginate from "../utils/pagination";
import Category from "../models/categories";

export async function getDishes(page: number, limit: number, categories: string[], minAmount: number, maxAmount: number) {
    const query: Record<string, unknown> = {};

    // Add price range filter
    if (minAmount !== 0 || maxAmount !== 1000000) {
        query.price = {
            $gte: minAmount,
            $lte: maxAmount
        };
    }

    // Add category filter
    if (categories.length > 0) {
        const foundCategories = await Category.find({ name: { $in: categories } });
        
        if (foundCategories.length !== categories.length) {
            throw new Error("One or more categories not found");
        }
        
        const categoryIds = foundCategories.map(cat => cat._id);
        query.categories = { $in: categoryIds };
    }
    
    const dishes = await Dish.find(query)
        .populate('categories')
        .populate('ingredients');
    const paginatedDishes = paginate(dishes, page, limit);
    return paginatedDishes;
}

export async function getDishById(id: string) {
    const dish = await Dish.findById(id)
    .populate('categories')
    .populate('ingredients');
    return dish;
}


export async function createDish(dish: {
    name: string;
    categories: string[];
    price: number;
    description: string;
    ingredients: string[];
    country: string;
}) {
    const newDish = await Dish.create(dish);
    return newDish;
}


export async function updateDish(id: string, dish: {
    name: string;
    categories: string[];
    price: number;
    description: string;
    ingredients: string[];
    country: string;
}) {
    const updatedDish = await Dish.findByIdAndUpdate(id, {...dish, $inc: {__v: 1}}, {new: true, runValidators: true});
    return updatedDish;
}

export async function deleteDish(id: string) {
    const deletedDish = await Dish.findByIdAndDelete(id);
    
    return deletedDish;
}

