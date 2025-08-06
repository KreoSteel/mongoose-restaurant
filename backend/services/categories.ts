import Category from "../models/categories";
import Dish from "../models/dishes";
import paginate from "../utils/pagination";

export async function getCategories(page: number, itemsPerPage: number) {
    const categories = await Category.find();
    const paginatedCategories = paginate(categories, page, itemsPerPage);
    return paginatedCategories;
}


export async function getCategoryById(id: string) {
    const category = await Category.findById(id);
    return category;
}


export async function createCategory(category: typeof Category.schema.obj) {
    const newCategory = await Category.create(category);
    return newCategory;
}


export async function updateCategory(id: string, category: typeof Category.schema.obj) {
    const updatedCategory = await Category.findByIdAndUpdate(id, {...category, $inc: {__v: 1}}, {new: true, runValidators: true});
    return updatedCategory;
}


export async function deleteCategory(id: string) {
    const dishesUsingCategory = await Dish.find({ categories: id });
    if (dishesUsingCategory.length > 0) {
        const dishIds = dishesUsingCategory.map(dish => dish._id).join(', ');
        throw new Error(`Cannot delete category. It is used by the following dishes: ${dishIds}`);
    }
    const deletedCategory = await Category.findByIdAndDelete(id);
    return deletedCategory;
}