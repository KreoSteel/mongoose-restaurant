const axios = require('axios');

// Fetch ALL categories and ingredients (not just first page)
async function fetchAllData() {
    try {
        console.log('Fetching ALL existing categories and ingredients...');
        
        // Get categories from all pages
        let allCategories = [];
        let page = 1;
        let hasMoreCategories = true;
        
        while (hasMoreCategories) {
            const categoriesResponse = await axios.get(`http://localhost:3000/categories?page=${page}`);
            const categoriesData = categoriesResponse.data;
            allCategories = allCategories.concat(categoriesData.data);
            
            if (page >= categoriesData.totalPages) {
                hasMoreCategories = false;
            }
            page++;
        }
        
        // Get ingredients from all pages
        let allIngredients = [];
        page = 1;
        let hasMoreIngredients = true;
        
        while (hasMoreIngredients) {
            const ingredientsResponse = await axios.get(`http://localhost:3000/ingredients?page=${page}`);
            const ingredientsData = ingredientsResponse.data;
            allIngredients = allIngredients.concat(ingredientsData.data);
            
            if (page >= ingredientsData.totalPages) {
                hasMoreIngredients = false;
            }
            page++;
        }
        
        console.log(`Found ${allCategories.length} categories and ${allIngredients.length} ingredients`);
        
        return { categories: allCategories, ingredients: allIngredients };
    } catch (error) {
        console.error('Error fetching data:', error.response?.data || error.message);
        throw error;
    }
}

// Create MANY more dishes using existing categories and ingredients
function createExtendedDishes(categories, ingredients) {
    const dishes = [];
    
    // Helper function to get available ingredients by name
    const getAvailableIngredients = (names) => {
        return names.filter(name => ingredients.find(ing => ing.name === name));
    };
    
    // Helper function to get available categories by name
    const getAvailableCategories = (names) => {
        return names.filter(name => categories.find(cat => cat.name === name));
    };
    
    // Helper function to get random ingredients of a type
    const getRandomIngredients = (type, count) => {
        const available = ingredients.filter(ing => ing.name.toLowerCase().includes(type));
        return available.slice(0, Math.min(count, available.length)).map(ing => ing.name);
    };
    
    // 1. SALADS (10+ dishes)
    if (categories.find(c => c.name === 'Salads')) {
        dishes.push({
            name: "Classic Caesar Salad",
            description: "Romaine lettuce with Caesar dressing, croutons, and parmesan",
            price: 14.99,
            country: "Italy",
            categoryNames: ["Salads"],
            ingredientNames: getAvailableIngredients(['Romaine Lettuce', 'Parmesan Cheese', 'Garlic', 'Olive Oil'])
        });
        
        dishes.push({
            name: "Greek Salad",
            description: "Fresh vegetables with feta cheese, olives, and olive oil",
            price: 13.99,
            country: "Greece",
            categoryNames: getAvailableCategories(['Salads', 'Mediterranean']),
            ingredientNames: getAvailableIngredients(['Cucumber', 'Tomatoes', 'Feta Cheese', 'Olives', 'Olive Oil'])
        });
        
        dishes.push({
            name: "Caprese Salad",
            description: "Fresh mozzarella, tomatoes, and basil with balsamic",
            price: 15.99,
            country: "Italy",
            categoryNames: getAvailableCategories(['Salads', 'Italian']),
            ingredientNames: getAvailableIngredients(['Mozzarella', 'Tomatoes', 'Basil', 'Balsamic Vinegar', 'Olive Oil'])
        });
        
        dishes.push({
            name: "Spinach Salad",
            description: "Fresh spinach with strawberries, nuts, and vinaigrette",
            price: 12.99,
            country: "United States",
            categoryNames: ["Salads"],
            ingredientNames: getAvailableIngredients(['Spinach', 'Strawberries', 'Almonds', 'Balsamic Vinegar'])
        });
        
        dishes.push({
            name: "Asian Slaw",
            description: "Cabbage slaw with Asian dressing and sesame seeds",
            price: 11.99,
            country: "China",
            categoryNames: getAvailableCategories(['Salads', 'Asian']),
            ingredientNames: getAvailableIngredients(['Cabbage', 'Carrots', 'Sesame Seeds', 'Soy Sauce', 'Sesame Oil'])
        });
        
        dishes.push({
            name: "Waldorf Salad",
            description: "Apples, celery, walnuts, and grapes with mayonnaise",
            price: 13.99,
            country: "United States",
            categoryNames: getAvailableCategories(['Salads', 'American']),
            ingredientNames: getAvailableIngredients(['Apples', 'Celery', 'Walnuts', 'Grapes', 'Mayonnaise'])
        });
        
        dishes.push({
            name: "Nicoise Salad",
            description: "French salad with tuna, eggs, and vegetables",
            price: 16.99,
            country: "France",
            categoryNames: getAvailableCategories(['Salads', 'French']),
            ingredientNames: getAvailableIngredients(['Tuna', 'Eggs', 'Green Beans', 'Tomatoes', 'Olives'])
        });
        
        dishes.push({
            name: "Cobb Salad",
            description: "Classic American salad with chicken, bacon, and blue cheese",
            price: 17.99,
            country: "United States",
            categoryNames: getAvailableCategories(['Salads', 'American']),
            ingredientNames: getAvailableIngredients(['Chicken Breast', 'Bacon', 'Blue Cheese', 'Lettuce', 'Tomatoes'])
        });
        
        dishes.push({
            name: "Arugula Salad",
            description: "Peppery arugula with parmesan and lemon vinaigrette",
            price: 12.99,
            country: "Italy",
            categoryNames: getAvailableCategories(['Salads', 'Italian']),
            ingredientNames: getAvailableIngredients(['Arugula', 'Parmesan Cheese', 'Lemon', 'Olive Oil'])
        });
        
        dishes.push({
            name: "Kale Caesar",
            description: "Kale Caesar salad with anchovy dressing",
            price: 14.99,
            country: "United States",
            categoryNames: ["Salads"],
            ingredientNames: getAvailableIngredients(['Kale', 'Parmesan Cheese', 'Garlic', 'Olive Oil', 'Lemon'])
        });
    }
    
    // 2. MAIN COURSE DISHES (20+ dishes)
    if (categories.find(c => c.name === 'Main Course')) {
        // Chicken Dishes
        if (ingredients.find(i => i.name === 'Chicken Breast')) {
            dishes.push({
                name: "Grilled Chicken Breast",
                description: "Herb-marinated grilled chicken with vegetables",
                price: 18.99,
                country: "United States",
                categoryNames: ["Main Course"],
                ingredientNames: getAvailableIngredients(['Chicken Breast', 'Herbs', 'Garlic', 'Olive Oil', 'Lemon'])
            });
            
            dishes.push({
                name: "Chicken Marsala",
                description: "Chicken in Marsala wine sauce with mushrooms",
                price: 22.99,
                country: "Italy",
                categoryNames: getAvailableCategories(['Main Course', 'Italian']),
                ingredientNames: getAvailableIngredients(['Chicken Breast', 'Mushrooms', 'Marsala Wine', 'Butter', 'Flour'])
            });
            
            dishes.push({
                name: "Chicken Piccata",
                description: "Lemon-caper chicken with white wine sauce",
                price: 21.99,
                country: "Italy",
                categoryNames: getAvailableCategories(['Main Course', 'Italian']),
                ingredientNames: getAvailableIngredients(['Chicken Breast', 'Lemon', 'Capers', 'White Wine', 'Butter'])
            });
            
            dishes.push({
                name: "Chicken Parmesan",
                description: "Breaded chicken with marinara and mozzarella",
                price: 20.99,
                country: "Italy",
                categoryNames: getAvailableCategories(['Main Course', 'Italian']),
                ingredientNames: getAvailableIngredients(['Chicken Breast', 'Marinara Sauce', 'Mozzarella', 'Breadcrumbs', 'Flour'])
            });
        }
        
        // Beef Dishes
        if (ingredients.find(i => i.name === 'Beef Steak')) {
            dishes.push({
                name: "Grilled Ribeye Steak",
                description: "Perfectly grilled ribeye with herb butter",
                price: 32.99,
                country: "United States",
                categoryNames: getAvailableCategories(['Main Course', 'American']),
                ingredientNames: getAvailableIngredients(['Beef Steak', 'Herbs', 'Butter', 'Garlic', 'Black Pepper'])
            });
            
            dishes.push({
                name: "Beef Tenderloin",
                description: "Premium beef tenderloin with red wine reduction",
                price: 38.99,
                country: "France",
                categoryNames: getAvailableCategories(['Main Course', 'French']),
                ingredientNames: getAvailableIngredients(['Beef Steak', 'Red Wine', 'Shallots', 'Butter', 'Herbs'])
            });
            
            dishes.push({
                name: "Beef Stroganoff",
                description: "Tender beef in sour cream sauce with mushrooms",
                price: 26.99,
                country: "Russia",
                categoryNames: ["Main Course"],
                ingredientNames: getAvailableIngredients(['Beef Steak', 'Mushrooms', 'Sour Cream', 'Onion', 'Noodles'])
            });
        }
        
        if (ingredients.find(i => i.name === 'Ground Beef')) {
            dishes.push({
                name: "Beef Burger",
                description: "Classic beef burger with all the fixings",
                price: 16.99,
                country: "United States",
                categoryNames: getAvailableCategories(['Main Course', 'American']),
                ingredientNames: getAvailableIngredients(['Ground Beef', 'Burger Buns', 'Lettuce', 'Tomatoes', 'Cheese'])
            });
            
            dishes.push({
                name: "Beef Tacos",
                description: "Seasoned ground beef tacos with fresh vegetables",
                price: 15.99,
                country: "Mexico",
                categoryNames: getAvailableCategories(['Main Course', 'Mexican']),
                ingredientNames: getAvailableIngredients(['Ground Beef', 'Tortillas', 'Lettuce', 'Tomatoes', 'Cheese'])
            });
            
            dishes.push({
                name: "Beef Meatballs",
                description: "Italian-style meatballs in marinara sauce",
                price: 18.99,
                country: "Italy",
                categoryNames: getAvailableCategories(['Main Course', 'Italian']),
                ingredientNames: getAvailableIngredients(['Ground Beef', 'Marinara Sauce', 'Breadcrumbs', 'Eggs', 'Parmesan Cheese'])
            });
        }
        
        // Fish Dishes
        if (ingredients.find(i => i.name === 'Salmon')) {
            dishes.push({
                name: "Grilled Salmon",
                description: "Fresh salmon with herbs and lemon butter",
                price: 28.99,
                country: "Norway",
                categoryNames: getAvailableCategories(['Main Course', 'Seafood']),
                ingredientNames: getAvailableIngredients(['Salmon', 'Lemon', 'Herbs', 'Butter', 'Garlic'])
            });
            
            dishes.push({
                name: "Salmon Teriyaki",
                description: "Salmon glazed with teriyaki sauce",
                price: 26.99,
                country: "Japan",
                categoryNames: getAvailableCategories(['Main Course', 'Asian']),
                ingredientNames: getAvailableIngredients(['Salmon', 'Teriyaki Sauce', 'Sesame Seeds', 'Rice'])
            });
        }
        
        if (ingredients.find(i => i.name === 'Tuna')) {
            dishes.push({
                name: "Seared Tuna",
                description: "Sesame-crusted seared tuna with wasabi",
                price: 29.99,
                country: "Japan",
                categoryNames: getAvailableCategories(['Main Course', 'Asian']),
                ingredientNames: getAvailableIngredients(['Tuna', 'Sesame Seeds', 'Wasabi', 'Soy Sauce', 'Rice'])
            });
        }
        
        if (ingredients.find(i => i.name === 'Shrimp')) {
            dishes.push({
                name: "Garlic Shrimp",
                description: "Shrimp sautéed in garlic butter",
                price: 24.99,
                country: "Spain",
                categoryNames: getAvailableCategories(['Main Course', 'Seafood']),
                ingredientNames: getAvailableIngredients(['Shrimp', 'Garlic', 'Butter', 'Lemon', 'Herbs'])
            });
            
            dishes.push({
                name: "Shrimp Scampi",
                description: "Shrimp in white wine garlic sauce",
                price: 26.99,
                country: "Italy",
                categoryNames: getAvailableCategories(['Main Course', 'Italian']),
                ingredientNames: getAvailableIngredients(['Shrimp', 'White Wine', 'Garlic', 'Butter', 'Linguine'])
            });
        }
        
        // Pork Dishes
        if (ingredients.find(i => i.name === 'Pork Chops')) {
            dishes.push({
                name: "Grilled Pork Chops",
                description: "Herb-rubbed grilled pork chops",
                price: 20.99,
                country: "United States",
                categoryNames: getAvailableCategories(['Main Course', 'American']),
                ingredientNames: getAvailableIngredients(['Pork Chops', 'Herbs', 'Garlic', 'Olive Oil', 'Black Pepper'])
            });
        }
        
        if (ingredients.find(i => i.name === 'Bacon')) {
            dishes.push({
                name: "Bacon-Wrapped Scallops",
                description: "Scallops wrapped in crispy bacon",
                price: 25.99,
                country: "United States",
                categoryNames: getAvailableCategories(['Main Course', 'American']),
                ingredientNames: getAvailableIngredients(['Bacon', 'Scallops', 'Lemon', 'Butter', 'Herbs'])
            });
        }
    }
    
    // 3. PASTA DISHES (15+ dishes)
    if (categories.find(c => c.name === 'Italian')) {
        if (ingredients.find(i => i.name === 'Spaghetti')) {
            dishes.push({
                name: "Spaghetti Carbonara",
                description: "Classic Roman pasta with eggs and pancetta",
                price: 18.99,
                country: "Italy",
                categoryNames: ["Italian", "Main Course"],
                ingredientNames: getAvailableIngredients(['Spaghetti', 'Eggs', 'Parmesan Cheese', 'Black Pepper', 'Bacon'])
            });
            
            dishes.push({
                name: "Spaghetti Bolognese",
                description: "Rich meat sauce with spaghetti",
                price: 17.99,
                country: "Italy",
                categoryNames: ["Italian", "Main Course"],
                ingredientNames: getAvailableIngredients(['Spaghetti', 'Ground Beef', 'Marinara Sauce', 'Parmesan Cheese', 'Garlic'])
            });
        }
        
        if (ingredients.find(i => i.name === 'Fettuccine')) {
            dishes.push({
                name: "Fettuccine Alfredo",
                description: "Creamy fettuccine with parmesan sauce",
                price: 19.99,
                country: "Italy",
                categoryNames: ["Italian", "Main Course"],
                ingredientNames: getAvailableIngredients(['Fettuccine', 'Heavy Cream', 'Parmesan Cheese', 'Butter', 'Black Pepper'])
            });
        }
        
        if (ingredients.find(i => i.name === 'Penne')) {
            dishes.push({
                name: "Penne Arrabbiata",
                description: "Spicy penne with tomato and chili",
                price: 16.99,
                country: "Italy",
                categoryNames: ["Italian", "Main Course"],
                ingredientNames: getAvailableIngredients(['Penne', 'Tomatoes', 'Garlic', 'Chili Powder', 'Olive Oil'])
            });
            
            dishes.push({
                name: "Penne Vodka",
                description: "Penne in creamy vodka sauce",
                price: 18.99,
                country: "Italy",
                categoryNames: ["Italian", "Main Course"],
                ingredientNames: getAvailableIngredients(['Penne', 'Vodka', 'Heavy Cream', 'Tomatoes', 'Parmesan Cheese'])
            });
        }
        
        if (ingredients.find(i => i.name === 'Ravioli')) {
            dishes.push({
                name: "Cheese Ravioli",
                description: "Homemade cheese ravioli with marinara",
                price: 20.99,
                country: "Italy",
                categoryNames: ["Italian", "Main Course"],
                ingredientNames: getAvailableIngredients(['Ravioli', 'Marinara Sauce', 'Parmesan Cheese', 'Basil', 'Olive Oil'])
            });
        }
        
        if (ingredients.find(i => i.name === 'Tortellini')) {
            dishes.push({
                name: "Tortellini in Broth",
                description: "Tortellini in rich chicken broth",
                price: 19.99,
                country: "Italy",
                categoryNames: ["Italian", "Main Course"],
                ingredientNames: getAvailableIngredients(['Tortellini', 'Chicken Stock', 'Parmesan Cheese', 'Herbs', 'Black Pepper'])
            });
        }
    }
    
    // 4. SOUPS (10+ dishes)
    if (categories.find(c => c.name === 'Soups')) {
        dishes.push({
            name: "Chicken Noodle Soup",
            description: "Classic comfort soup with chicken and vegetables",
            price: 12.99,
            country: "United States",
            categoryNames: ["Soups"],
            ingredientNames: getAvailableIngredients(['Chicken Breast', 'Noodles', 'Carrots', 'Onion', 'Chicken Stock'])
        });
        
        dishes.push({
            name: "Tomato Basil Soup",
            description: "Creamy tomato soup with fresh basil",
            price: 10.99,
            country: "Italy",
            categoryNames: getAvailableCategories(['Soups', 'Italian']),
            ingredientNames: getAvailableIngredients(['Tomatoes', 'Basil', 'Heavy Cream', 'Garlic', 'Olive Oil'])
        });
        
        dishes.push({
            name: "French Onion Soup",
            description: "Classic French soup with caramelized onions",
            price: 13.99,
            country: "France",
            categoryNames: getAvailableCategories(['Soups', 'French']),
            ingredientNames: getAvailableIngredients(['Onion', 'Beef Stock', 'Bread', 'Cheese', 'Butter'])
        });
        
        dishes.push({
            name: "Mushroom Soup",
            description: "Creamy mushroom soup with herbs",
            price: 11.99,
            country: "France",
            categoryNames: getAvailableCategories(['Soups', 'French']),
            ingredientNames: getAvailableIngredients(['Mushrooms', 'Heavy Cream', 'Herbs', 'Garlic', 'Butter'])
        });
        
        dishes.push({
            name: "Lobster Bisque",
            description: "Rich lobster soup with cream",
            price: 24.99,
            country: "France",
            categoryNames: getAvailableCategories(['Soups', 'French']),
            ingredientNames: getAvailableIngredients(['Lobster', 'Heavy Cream', 'Sherry', 'Butter', 'Herbs'])
        });
        
        dishes.push({
            name: "Clam Chowder",
            description: "New England style clam chowder",
            price: 16.99,
            country: "United States",
            categoryNames: getAvailableCategories(['Soups', 'American']),
            ingredientNames: getAvailableIngredients(['Clams', 'Heavy Cream', 'Potatoes', 'Bacon', 'Onion'])
        });
        
        dishes.push({
            name: "Minestrone",
            description: "Italian vegetable soup with pasta",
            price: 12.99,
            country: "Italy",
            categoryNames: getAvailableCategories(['Soups', 'Italian']),
            ingredientNames: getAvailableIngredients(['Vegetable Stock', 'Pasta', 'Tomatoes', 'Carrots', 'Beans'])
        });
        
        dishes.push({
            name: "Gazpacho",
            description: "Cold Spanish tomato soup",
            price: 9.99,
            country: "Spain",
            categoryNames: ["Soups"],
            ingredientNames: getAvailableIngredients(['Tomatoes', 'Cucumber', 'Bell Peppers', 'Olive Oil', 'Garlic'])
        });
    }
    
    // 5. APPETIZERS (15+ dishes)
    if (categories.find(c => c.name === 'Appetizers')) {
        dishes.push({
            name: "Bruschetta",
            description: "Toasted bread with tomato and basil",
            price: 8.99,
            country: "Italy",
            categoryNames: getAvailableCategories(['Appetizers', 'Italian']),
            ingredientNames: getAvailableIngredients(['Bread', 'Tomatoes', 'Basil', 'Garlic', 'Olive Oil'])
        });
        
        dishes.push({
            name: "Mozzarella Sticks",
            description: "Breaded mozzarella with marinara",
            price: 9.99,
            country: "Italy",
            categoryNames: getAvailableCategories(['Appetizers', 'Italian']),
            ingredientNames: getAvailableIngredients(['Mozzarella', 'Breadcrumbs', 'Marinara Sauce', 'Flour', 'Eggs'])
        });
        
        dishes.push({
            name: "Calamari",
            description: "Crispy fried squid with lemon",
            price: 12.99,
            country: "Italy",
            categoryNames: getAvailableCategories(['Appetizers', 'Italian']),
            ingredientNames: getAvailableIngredients(['Squid', 'Flour', 'Lemon', 'Garlic', 'Olive Oil'])
        });
        
        dishes.push({
            name: "Stuffed Mushrooms",
            description: "Mushrooms stuffed with cheese and herbs",
            price: 10.99,
            country: "United States",
            categoryNames: ["Appetizers"],
            ingredientNames: getAvailableIngredients(['Mushrooms', 'Cream Cheese', 'Herbs', 'Garlic', 'Breadcrumbs'])
        });
        
        dishes.push({
            name: "Spinach Artichoke Dip",
            description: "Creamy dip with spinach and artichokes",
            price: 11.99,
            country: "United States",
            categoryNames: ["Appetizers"],
            ingredientNames: getAvailableIngredients(['Spinach', 'Artichokes', 'Cream Cheese', 'Sour Cream', 'Cheese'])
        });
        
        dishes.push({
            name: "Guacamole",
            description: "Fresh avocado dip with chips",
            price: 8.99,
            country: "Mexico",
            categoryNames: getAvailableCategories(['Appetizers', 'Mexican']),
            ingredientNames: getAvailableIngredients(['Avocado', 'Lime', 'Onion', 'Garlic', 'Tortilla Chips'])
        });
        
        dishes.push({
            name: "Hummus",
            description: "Chickpea dip with pita bread",
            price: 7.99,
            country: "Lebanon",
            categoryNames: ["Appetizers"],
            ingredientNames: getAvailableIngredients(['Chickpeas', 'Tahini', 'Lemon', 'Garlic', 'Olive Oil'])
        });
        
        dishes.push({
            name: "Deviled Eggs",
            description: "Classic deviled eggs with paprika",
            price: 8.99,
            country: "United States",
            categoryNames: ["Appetizers"],
            ingredientNames: getAvailableIngredients(['Eggs', 'Mayonnaise', 'Mustard', 'Paprika', 'Vinegar'])
        });
        
        dishes.push({
            name: "Crab Cakes",
            description: "Maryland-style crab cakes",
            price: 16.99,
            country: "United States",
            categoryNames: getAvailableCategories(['Appetizers', 'American']),
            ingredientNames: getAvailableIngredients(['Crab', 'Breadcrumbs', 'Mayonnaise', 'Mustard', 'Herbs'])
        });
        
        dishes.push({
            name: "Shrimp Cocktail",
            description: "Chilled shrimp with cocktail sauce",
            price: 14.99,
            country: "United States",
            categoryNames: getAvailableCategories(['Appetizers', 'American']),
            ingredientNames: getAvailableIngredients(['Shrimp', 'Ketchup', 'Horseradish', 'Lemon', 'Cocktail Sauce'])
        });
    }
    
    // 6. DESSERTS (15+ dishes)
    if (categories.find(c => c.name === 'Desserts')) {
        dishes.push({
            name: "Tiramisu",
            description: "Classic Italian coffee-flavored dessert",
            price: 12.99,
            country: "Italy",
            categoryNames: getAvailableCategories(['Desserts', 'Italian']),
            ingredientNames: getAvailableIngredients(['Coffee', 'Mascarpone', 'Eggs', 'Sugar', 'Ladyfingers'])
        });
        
        dishes.push({
            name: "Chocolate Lava Cake",
            description: "Warm chocolate cake with molten center",
            price: 11.99,
            country: "France",
            categoryNames: getAvailableCategories(['Desserts', 'French']),
            ingredientNames: getAvailableIngredients(['Dark Chocolate', 'Butter', 'Eggs', 'Flour', 'Sugar'])
        });
        
        dishes.push({
            name: "Crème Brûlée",
            description: "Classic French custard with caramelized sugar",
            price: 10.99,
            country: "France",
            categoryNames: getAvailableCategories(['Desserts', 'French']),
            ingredientNames: getAvailableIngredients(['Heavy Cream', 'Eggs', 'Sugar', 'Vanilla Extract', 'Milk'])
        });
        
        dishes.push({
            name: "Cheesecake",
            description: "New York style cheesecake",
            price: 11.99,
            country: "United States",
            categoryNames: getAvailableCategories(['Desserts', 'American']),
            ingredientNames: getAvailableIngredients(['Cream Cheese', 'Graham Crackers', 'Sugar', 'Eggs', 'Vanilla Extract'])
        });
        
        dishes.push({
            name: "Apple Pie",
            description: "Classic American apple pie",
            price: 9.99,
            country: "United States",
            categoryNames: getAvailableCategories(['Desserts', 'American']),
            ingredientNames: getAvailableIngredients(['Apples', 'Flour', 'Sugar', 'Cinnamon', 'Butter'])
        });
        
        dishes.push({
            name: "Key Lime Pie",
            description: "Florida key lime pie with graham cracker crust",
            price: 10.99,
            country: "United States",
            categoryNames: getAvailableCategories(['Desserts', 'American']),
            ingredientNames: getAvailableIngredients(['Lime', 'Graham Crackers', 'Sweetened Condensed Milk', 'Eggs', 'Butter'])
        });
        
        dishes.push({
            name: "Chocolate Mousse",
            description: "Light and airy chocolate mousse",
            price: 11.99,
            country: "France",
            categoryNames: getAvailableCategories(['Desserts', 'French']),
            ingredientNames: getAvailableIngredients(['Dark Chocolate', 'Heavy Cream', 'Eggs', 'Sugar', 'Vanilla Extract'])
        });
        
        dishes.push({
            name: "Panna Cotta",
            description: "Italian vanilla cream dessert",
            price: 10.99,
            country: "Italy",
            categoryNames: getAvailableCategories(['Desserts', 'Italian']),
            ingredientNames: getAvailableIngredients(['Heavy Cream', 'Gelatin', 'Sugar', 'Vanilla Extract', 'Milk'])
        });
        
        dishes.push({
            name: "Bread Pudding",
            description: "Warm bread pudding with vanilla sauce",
            price: 9.99,
            country: "United States",
            categoryNames: getAvailableCategories(['Desserts', 'American']),
            ingredientNames: getAvailableIngredients(['Bread', 'Milk', 'Eggs', 'Sugar', 'Vanilla Extract'])
        });
        
        dishes.push({
            name: "Ice Cream Sundae",
            description: "Vanilla ice cream with toppings",
            price: 8.99,
            country: "United States",
            categoryNames: getAvailableCategories(['Desserts', 'American']),
            ingredientNames: getAvailableIngredients(['Ice Cream', 'Chocolate Syrup', 'Whipped Cream', 'Cherries', 'Nuts'])
        });
    }
    
    // 7. BEVERAGES (10+ dishes)
    if (categories.find(c => c.name === 'Beverages')) {
        dishes.push({
            name: "Espresso",
            description: "Strong Italian coffee",
            price: 3.99,
            country: "Italy",
            categoryNames: getAvailableCategories(['Beverages', 'Italian']),
            ingredientNames: getAvailableIngredients(['Coffee', 'Water'])
        });
        
        dishes.push({
            name: "Cappuccino",
            description: "Italian coffee with steamed milk",
            price: 4.99,
            country: "Italy",
            categoryNames: getAvailableCategories(['Beverages', 'Italian']),
            ingredientNames: getAvailableIngredients(['Coffee', 'Milk', 'Foam'])
        });
        
        dishes.push({
            name: "Latte",
            description: "Coffee with steamed milk",
            price: 4.99,
            country: "Italy",
            categoryNames: getAvailableCategories(['Beverages', 'Italian']),
            ingredientNames: getAvailableIngredients(['Coffee', 'Milk', 'Foam'])
        });
        
        dishes.push({
            name: "Hot Chocolate",
            description: "Rich hot chocolate with whipped cream",
            price: 5.99,
            country: "United States",
            categoryNames: ["Beverages"],
            ingredientNames: getAvailableIngredients(['Chocolate', 'Milk', 'Whipped Cream', 'Sugar'])
        });
        
        dishes.push({
            name: "Fresh Lemonade",
            description: "Homemade lemonade",
            price: 4.99,
            country: "United States",
            categoryNames: ["Beverages"],
            ingredientNames: getAvailableIngredients(['Lemon', 'Sugar', 'Water'])
        });
        
        dishes.push({
            name: "Iced Tea",
            description: "Refreshing iced tea",
            price: 3.99,
            country: "United States",
            categoryNames: ["Beverages"],
            ingredientNames: getAvailableIngredients(['Tea', 'Sugar', 'Lemon'])
        });
        
        dishes.push({
            name: "Smoothie",
            description: "Fresh fruit smoothie",
            price: 6.99,
            country: "United States",
            categoryNames: ["Beverages"],
            ingredientNames: getAvailableIngredients(['Strawberries', 'Banana', 'Yogurt', 'Honey', 'Milk'])
        });
        
        dishes.push({
            name: "Milkshake",
            description: "Classic vanilla milkshake",
            price: 5.99,
            country: "United States",
            categoryNames: getAvailableCategories(['Beverages', 'American']),
            ingredientNames: getAvailableIngredients(['Ice Cream', 'Milk', 'Vanilla Extract', 'Whipped Cream'])
        });
    }
    
    // 8. VEGETARIAN DISHES (10+ dishes)
    if (categories.find(c => c.name === 'Vegetarian')) {
        dishes.push({
            name: "Vegetable Stir Fry",
            description: "Fresh vegetables in Asian sauce",
            price: 14.99,
            country: "China",
            categoryNames: getAvailableCategories(['Vegetarian', 'Asian']),
            ingredientNames: getAvailableIngredients(['Broccoli', 'Carrots', 'Bell Peppers', 'Soy Sauce', 'Ginger'])
        });
        
        dishes.push({
            name: "Vegetable Curry",
            description: "Spicy vegetable curry with rice",
            price: 15.99,
            country: "India",
            categoryNames: getAvailableCategories(['Vegetarian', 'Indian']),
            ingredientNames: getAvailableIngredients(['Rice', 'Carrots', 'Onion', 'Curry Powder', 'Coconut Milk'])
        });
        
        dishes.push({
            name: "Mushroom Risotto",
            description: "Creamy risotto with wild mushrooms",
            price: 17.99,
            country: "Italy",
            categoryNames: getAvailableCategories(['Vegetarian', 'Italian']),
            ingredientNames: getAvailableIngredients(['Rice', 'Mushrooms', 'Parmesan Cheese', 'White Wine', 'Butter'])
        });
        
        dishes.push({
            name: "Vegetable Lasagna",
            description: "Layered pasta with vegetables and cheese",
            price: 16.99,
            country: "Italy",
            categoryNames: getAvailableCategories(['Vegetarian', 'Italian']),
            ingredientNames: getAvailableIngredients(['Lasagna Noodles', 'Spinach', 'Mushrooms', 'Ricotta', 'Marinara Sauce'])
        });
        
        dishes.push({
            name: "Quinoa Bowl",
            description: "Healthy quinoa with roasted vegetables",
            price: 13.99,
            country: "United States",
            categoryNames: getAvailableCategories(['Vegetarian', 'American']),
            ingredientNames: getAvailableIngredients(['Quinoa', 'Sweet Potato', 'Kale', 'Chickpeas', 'Tahini'])
        });
        
        dishes.push({
            name: "Falafel",
            description: "Middle Eastern chickpea fritters",
            price: 12.99,
            country: "Lebanon",
            categoryNames: getAvailableCategories(['Vegetarian', 'Mediterranean']),
            ingredientNames: getAvailableIngredients(['Chickpeas', 'Tahini', 'Pita Bread', 'Cucumber', 'Tomatoes'])
        });
        
        dishes.push({
            name: "Vegetable Pad Thai",
            description: "Thai rice noodles with vegetables",
            price: 14.99,
            country: "Thailand",
            categoryNames: getAvailableCategories(['Vegetarian', 'Asian']),
            ingredientNames: getAvailableIngredients(['Rice Noodles', 'Tofu', 'Bean Sprouts', 'Peanuts', 'Tamarind Sauce'])
        });
        
        dishes.push({
            name: "Ratatouille",
            description: "French vegetable stew",
            price: 13.99,
            country: "France",
            categoryNames: getAvailableCategories(['Vegetarian', 'French']),
            ingredientNames: getAvailableIngredients(['Eggplant', 'Zucchini', 'Tomatoes', 'Bell Peppers', 'Herbs'])
        });
    }
    
    // 9. SIDE DISHES (10+ dishes)
    if (categories.find(c => c.name === 'Side Dishes')) {
        dishes.push({
            name: "Mashed Potatoes",
            description: "Creamy mashed potatoes with butter",
            price: 6.99,
            country: "United States",
            categoryNames: getAvailableCategories(['Side Dishes', 'American']),
            ingredientNames: getAvailableIngredients(['Potatoes', 'Butter', 'Milk', 'Salt', 'Black Pepper'])
        });
        
        dishes.push({
            name: "Roasted Vegetables",
            description: "Seasonal vegetables roasted with herbs",
            price: 7.99,
            country: "United States",
            categoryNames: ["Side Dishes"],
            ingredientNames: getAvailableIngredients(['Carrots', 'Broccoli', 'Bell Peppers', 'Olive Oil', 'Herbs'])
        });
        
        dishes.push({
            name: "Rice Pilaf",
            description: "Fluffy rice with herbs and vegetables",
            price: 5.99,
            country: "United States",
            categoryNames: ["Side Dishes"],
            ingredientNames: getAvailableIngredients(['Rice', 'Onion', 'Garlic', 'Herbs', 'Chicken Stock'])
        });
        
        dishes.push({
            name: "Garlic Bread",
            description: "Toasted bread with garlic butter",
            price: 4.99,
            country: "Italy",
            categoryNames: getAvailableCategories(['Side Dishes', 'Italian']),
            ingredientNames: getAvailableIngredients(['Bread', 'Garlic', 'Butter', 'Herbs', 'Olive Oil'])
        });
        
        dishes.push({
            name: "Coleslaw",
            description: "Classic cabbage slaw",
            price: 4.99,
            country: "United States",
            categoryNames: getAvailableCategories(['Side Dishes', 'American']),
            ingredientNames: getAvailableIngredients(['Cabbage', 'Carrots', 'Mayonnaise', 'Vinegar', 'Sugar'])
        });
        
        dishes.push({
            name: "French Fries",
            description: "Crispy golden fries",
            price: 5.99,
            country: "United States",
            categoryNames: getAvailableCategories(['Side Dishes', 'American']),
            ingredientNames: getAvailableIngredients(['Potatoes', 'Vegetable Oil', 'Salt'])
        });
        
        dishes.push({
            name: "Onion Rings",
            description: "Beer-battered onion rings",
            price: 6.99,
            country: "United States",
            categoryNames: getAvailableCategories(['Side Dishes', 'American']),
            ingredientNames: getAvailableIngredients(['Onion', 'Flour', 'Beer', 'Vegetable Oil', 'Salt'])
        });
        
        dishes.push({
            name: "Baked Beans",
            description: "Sweet and savory baked beans",
            price: 5.99,
            country: "United States",
            categoryNames: getAvailableCategories(['Side Dishes', 'American']),
            ingredientNames: getAvailableIngredients(['Beans', 'Molasses', 'Bacon', 'Onion', 'Brown Sugar'])
        });
    }
    
    // 10. BREAKFAST DISHES (10+ dishes)
    if (categories.find(c => c.name === 'Breakfast')) {
        dishes.push({
            name: "Eggs Benedict",
            description: "Poached eggs with hollandaise sauce",
            price: 14.99,
            country: "United States",
            categoryNames: getAvailableCategories(['Breakfast', 'American']),
            ingredientNames: getAvailableIngredients(['Eggs', 'English Muffins', 'Hollandaise Sauce', 'Bacon', 'Butter'])
        });
        
        dishes.push({
            name: "Pancakes",
            description: "Fluffy buttermilk pancakes",
            price: 10.99,
            country: "United States",
            categoryNames: getAvailableCategories(['Breakfast', 'American']),
            ingredientNames: getAvailableIngredients(['Flour', 'Milk', 'Eggs', 'Butter', 'Maple Syrup'])
        });
        
        dishes.push({
            name: "French Toast",
            description: "Cinnamon French toast",
            price: 11.99,
            country: "France",
            categoryNames: getAvailableCategories(['Breakfast', 'French']),
            ingredientNames: getAvailableIngredients(['Bread', 'Eggs', 'Milk', 'Cinnamon', 'Maple Syrup'])
        });
        
        dishes.push({
            name: "Omelette",
            description: "Three-egg omelette with cheese",
            price: 12.99,
            country: "France",
            categoryNames: getAvailableCategories(['Breakfast', 'French']),
            ingredientNames: getAvailableIngredients(['Eggs', 'Cheese', 'Milk', 'Butter', 'Herbs'])
        });
        
        dishes.push({
            name: "Breakfast Burrito",
            description: "Scrambled eggs with potatoes and salsa",
            price: 11.99,
            country: "Mexico",
            categoryNames: getAvailableCategories(['Breakfast', 'Mexican']),
            ingredientNames: getAvailableIngredients(['Eggs', 'Tortillas', 'Potatoes', 'Cheese', 'Salsa'])
        });
        
        dishes.push({
            name: "Avocado Toast",
            description: "Sourdough toast with avocado",
            price: 9.99,
            country: "United States",
            categoryNames: getAvailableCategories(['Breakfast', 'American']),
            ingredientNames: getAvailableIngredients(['Sourdough Bread', 'Avocado', 'Eggs', 'Salt', 'Black Pepper'])
        });
        
        dishes.push({
            name: "Granola Bowl",
            description: "Greek yogurt with granola and berries",
            price: 8.99,
            country: "United States",
            categoryNames: getAvailableCategories(['Breakfast', 'American']),
            ingredientNames: getAvailableIngredients(['Greek Yogurt', 'Granola', 'Strawberries', 'Blueberries', 'Honey'])
        });
        
        dishes.push({
            name: "Breakfast Sandwich",
            description: "Egg, cheese, and bacon on English muffin",
            price: 10.99,
            country: "United States",
            categoryNames: getAvailableCategories(['Breakfast', 'American']),
            ingredientNames: getAvailableIngredients(['English Muffins', 'Eggs', 'Cheese', 'Bacon', 'Butter'])
        });
    }
    
    return dishes;
}

async function populateExtendedDishes() {
    try {
        const { categories, ingredients } = await fetchAllData();
        
        if (categories.length === 0) {
            console.error('❌ No categories found. Please run populate_categories.JS first.');
            return;
        }
        
        if (ingredients.length === 0) {
            console.error('❌ No ingredients found. Please run populate_ingredients_extended.js first.');
            return;
        }
        
        const dishes = createExtendedDishes(categories, ingredients);
        
        console.log(`\n🍽️ Creating ${dishes.length} extended dishes using existing data...`);
        
        for (let i = 0; i < dishes.length; i++) {
            const dish = dishes[i];
            
            // Find category IDs by name
            const categoryIds = dish.categoryNames.map(catName => {
                const category = categories.find(cat => cat.name === catName);
                return category._id;
            });
            
            // Find ingredient IDs by name
            const ingredientIds = dish.ingredientNames.map(ingName => {
                const ingredient = ingredients.find(ing => ing.name === ingName);
                return ingredient._id;
            });
            
            try {
                const response = await axios.post('http://localhost:3000/dishes', {
                    name: dish.name,
                    description: dish.description,
                    price: dish.price,
                    country: dish.country,
                    categories: categoryIds,
                    ingredients: ingredientIds
                });
                
                console.log(`✅ Added: ${dish.name} - $${dish.price} (ID: ${response.data._id})`);
                console.log(`   Categories: ${dish.categoryNames.join(', ')}`);
                console.log(`   Ingredients: ${dish.ingredientNames.join(', ')}`);
                
                // Small delay to avoid overwhelming the server
                await new Promise(resolve => setTimeout(resolve, 50));
                
            } catch (error) {
                console.error(`❌ Failed to add ${dish.name}:`, error.response?.data || error.message);
            }
        }
        
        console.log('\n🎉 Finished populating extended dishes!');
        
        // Print usage statistics
        const usedCategories = new Set(dishes.flatMap(d => d.categoryNames));
        const usedIngredients = new Set(dishes.flatMap(d => d.ingredientNames));
        
        console.log('\n📊 Usage Statistics:');
        console.log(`Total dishes created: ${dishes.length}`);
        console.log(`Categories used: ${usedCategories.size}/${categories.length}`);
        console.log(`Ingredients used: ${usedIngredients.size}/${ingredients.length}`);
        
        console.log('\n📋 Used Categories:');
        Array.from(usedCategories).sort().forEach(cat => console.log(`  - ${cat}`));
        
        console.log('\n📋 Used Ingredients:');
        Array.from(usedIngredients).sort().forEach(ing => console.log(`  - ${ing}`));
        
    } catch (error) {
        console.error('Error in populateExtendedDishes:', error);
    }
}

// Run the population script
populateExtendedDishes().catch(console.error); 