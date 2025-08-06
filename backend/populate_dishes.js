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
        
        // Log what we found
        console.log('\n📋 Available Categories:');
        allCategories.forEach(cat => console.log(`  - ${cat.name}`));
        
        console.log('\n📋 Available Ingredients:');
        allIngredients.forEach(ing => console.log(`  - ${ing.name} ($${ing.price})`));
        
        return { categories: allCategories, ingredients: allIngredients };
    } catch (error) {
        console.error('Error fetching data:', error.response?.data || error.message);
        throw error;
    }
}

// Create dishes using ONLY existing categories and ingredients
function createDishesFromExistingData(categories, ingredients) {
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
    
    // 1. Salads
    if (categories.find(c => c.name === 'Salads')) {
        dishes.push({
            name: "Fresh Garden Salad",
            description: "Mixed greens with fresh vegetables and light dressing",
            price: 12.99,
            country: "United States",
            categoryNames: ["Salads"],
            ingredientNames: getAvailableIngredients(['Lettuce', 'Tomato', 'Cucumber', 'Onion'])
        });
        
        dishes.push({
            name: "Caesar Salad",
            description: "Classic Caesar salad with croutons and parmesan",
            price: 14.99,
            country: "Italy",
            categoryNames: ["Salads", "Appetizers"],
            ingredientNames: getAvailableIngredients(['Lettuce', 'Cheese', 'Garlic', 'Olive Oil'])
        });
    }
    
    // 2. Main Course Dishes
    if (categories.find(c => c.name === 'Main Course')) {
        // Chicken dishes
        if (ingredients.find(i => i.name === 'Chicken')) {
            dishes.push({
                name: "Grilled Chicken Breast",
                description: "Tender grilled chicken with herbs and spices",
                price: 18.99,
                country: "United States",
                categoryNames: ["Main Course"],
                ingredientNames: getAvailableIngredients(['Chicken', 'Garlic', 'Herbs', 'Olive Oil'])
            });
            
            dishes.push({
                name: "Chicken Pasta",
                description: "Penne pasta with grilled chicken and cream sauce",
                price: 20.99,
                country: "Italy",
                categoryNames: getAvailableCategories(['Main Course', 'Italian']),
                ingredientNames: getAvailableIngredients(['Chicken', 'Pasta', 'Cream', 'Garlic', 'Cheese'])
            });
        }
        
        // Beef dishes
        if (ingredients.find(i => i.name === 'Beef')) {
            dishes.push({
                name: "Beef Steak",
                description: "Grilled beef steak with herbs and butter",
                price: 24.99,
                country: "United States",
                categoryNames: ["Main Course"],
                ingredientNames: getAvailableIngredients(['Beef', 'Garlic', 'Herbs', 'Butter'])
            });
            
            dishes.push({
                name: "Beef Burger",
                description: "Juicy beef burger with fresh vegetables",
                price: 16.99,
                country: "United States",
                categoryNames: getAvailableCategories(['Main Course', 'American']),
                ingredientNames: getAvailableIngredients(['Beef', 'Bread', 'Lettuce', 'Tomato', 'Cheese'])
            });
        }
        
        // Fish dishes
        if (ingredients.find(i => i.name === 'Fish')) {
            dishes.push({
                name: "Grilled Fish",
                description: "Fresh grilled fish with lemon and herbs",
                price: 22.99,
                country: "Greece",
                categoryNames: getAvailableCategories(['Main Course', 'Seafood']),
                ingredientNames: getAvailableIngredients(['Fish', 'Lemon', 'Herbs', 'Olive Oil'])
            });
        }
        
        if (ingredients.find(i => i.name === 'Salmon')) {
            dishes.push({
                name: "Salmon Fillet",
                description: "Pan-seared salmon with vegetables",
                price: 26.99,
                country: "Norway",
                categoryNames: getAvailableCategories(['Main Course', 'Seafood']),
                ingredientNames: getAvailableIngredients(['Salmon', 'Lemon', 'Garlic', 'Butter'])
            });
        }
    }
    
    // 3. Italian Dishes
    if (categories.find(c => c.name === 'Italian')) {
        if (ingredients.find(i => i.name === 'Pasta')) {
            dishes.push({
                name: "Classic Spaghetti",
                description: "Traditional Italian pasta with tomato sauce",
                price: 16.99,
                country: "Italy",
                categoryNames: ["Italian", "Main Course"],
                ingredientNames: getAvailableIngredients(['Pasta', 'Tomato', 'Garlic', 'Olive Oil', 'Herbs'])
            });
            
            dishes.push({
                name: "Pasta Carbonara",
                description: "Creamy pasta with eggs and cheese",
                price: 18.99,
                country: "Italy",
                categoryNames: ["Italian", "Main Course"],
                ingredientNames: getAvailableIngredients(['Pasta', 'Eggs', 'Cheese', 'Garlic', 'Black Pepper'])
            });
        }
        
        if (ingredients.find(i => i.name === 'Pizza Dough')) {
            dishes.push({
                name: "Margherita Pizza",
                description: "Classic pizza with tomato, mozzarella, and basil",
                price: 19.99,
                country: "Italy",
                categoryNames: getAvailableCategories(['Italian', 'Pizza']),
                ingredientNames: getAvailableIngredients(['Pizza Dough', 'Tomato', 'Mozzarella', 'Basil', 'Olive Oil'])
            });
        }
    }
    
    // 4. Soups
    if (categories.find(c => c.name === 'Soups')) {
        dishes.push({
            name: "Vegetable Soup",
            description: "Hearty soup with fresh vegetables",
            price: 11.99,
            country: "United States",
            categoryNames: ["Soups"],
            ingredientNames: getAvailableIngredients(['Tomato', 'Carrots', 'Onion', 'Garlic', 'Herbs'])
        });
        
        dishes.push({
            name: "Chicken Soup",
            description: "Comforting chicken soup with vegetables",
            price: 13.99,
            country: "United States",
            categoryNames: ["Soups"],
            ingredientNames: getAvailableIngredients(['Chicken', 'Carrots', 'Onion', 'Garlic', 'Herbs'])
        });
        
        if (ingredients.find(i => i.name === 'Beef Broth')) {
            dishes.push({
                name: "Beef Noodle Soup",
                description: "Rich beef broth with noodles and vegetables",
                price: 15.99,
                country: "China",
                categoryNames: getAvailableCategories(['Soups', 'Asian']),
                ingredientNames: getAvailableIngredients(['Beef Broth', 'Noodles', 'Carrots', 'Onion', 'Garlic'])
            });
        }
    }
    
    // 5. Appetizers
    if (categories.find(c => c.name === 'Appetizers')) {
        if (ingredients.find(i => i.name === 'Cheese')) {
            dishes.push({
                name: "Cheese Platter",
                description: "Assorted cheeses with crackers and fruits",
                price: 13.99,
                country: "France",
                categoryNames: ["Appetizers"],
                ingredientNames: getAvailableIngredients(['Cheese', 'Bread', 'Honey'])
            });
        }
        
        dishes.push({
            name: "Garlic Bread",
            description: "Toasted bread with garlic butter and herbs",
            price: 6.99,
            country: "Italy",
            categoryNames: getAvailableCategories(['Appetizers', 'Italian']),
            ingredientNames: getAvailableIngredients(['Bread', 'Garlic', 'Butter', 'Herbs'])
        });
        
        if (ingredients.find(i => i.name === 'Eggs')) {
            dishes.push({
                name: "Deviled Eggs",
                description: "Classic deviled eggs with mayonnaise and mustard",
                price: 8.99,
                country: "United States",
                categoryNames: ["Appetizers"],
                ingredientNames: getAvailableIngredients(['Eggs', 'Mayonnaise', 'Mustard', 'Paprika'])
            });
        }
    }
    
    // 6. Desserts
    if (categories.find(c => c.name === 'Desserts')) {
        if (ingredients.find(i => i.name === 'Milk')) {
            dishes.push({
                name: "Vanilla Ice Cream",
                description: "Creamy vanilla ice cream",
                price: 6.99,
                country: "United States",
                categoryNames: ["Desserts"],
                ingredientNames: getAvailableIngredients(['Milk', 'Sugar', 'Vanilla'])
            });
        }
        
        if (ingredients.find(i => i.name === 'Chocolate')) {
            dishes.push({
                name: "Chocolate Cake",
                description: "Rich chocolate cake with chocolate frosting",
                price: 8.99,
                country: "France",
                categoryNames: getAvailableCategories(['Desserts', 'French']),
                ingredientNames: getAvailableIngredients(['Chocolate', 'Flour', 'Sugar', 'Eggs', 'Milk'])
            });
        }
        
        if (ingredients.find(i => i.name === 'Flour')) {
            dishes.push({
                name: "Apple Pie",
                description: "Classic apple pie with cinnamon",
                price: 7.99,
                country: "United States",
                categoryNames: getAvailableCategories(['Desserts', 'American']),
                ingredientNames: getAvailableIngredients(['Flour', 'Apples', 'Sugar', 'Cinnamon', 'Butter'])
            });
        }
    }
    
    // 7. Beverages
    if (categories.find(c => c.name === 'Beverages')) {
        if (ingredients.find(i => i.name === 'Milk')) {
            dishes.push({
                name: "Hot Chocolate",
                description: "Rich hot chocolate with whipped cream",
                price: 4.99,
                country: "United States",
                categoryNames: ["Beverages"],
                ingredientNames: getAvailableIngredients(['Milk', 'Chocolate', 'Sugar'])
            });
            
            dishes.push({
                name: "Cappuccino",
                description: "Italian coffee with steamed milk",
                price: 3.99,
                country: "Italy",
                categoryNames: getAvailableCategories(['Beverages', 'Italian']),
                ingredientNames: getAvailableIngredients(['Coffee', 'Milk', 'Sugar'])
            });
        }
        
        if (ingredients.find(i => i.name === 'Lemon')) {
            dishes.push({
                name: "Lemonade",
                description: "Fresh squeezed lemonade",
                price: 3.99,
                country: "United States",
                categoryNames: ["Beverages"],
                ingredientNames: getAvailableIngredients(['Lemon', 'Sugar', 'Water'])
            });
        }
    }
    
    // 8. Vegetarian Dishes
    if (categories.find(c => c.name === 'Vegetarian')) {
        dishes.push({
            name: "Vegetable Stir Fry",
            description: "Fresh vegetables stir-fried with light sauce",
            price: 14.99,
            country: "China",
            categoryNames: getAvailableCategories(['Vegetarian', 'Main Course', 'Asian']),
            ingredientNames: getAvailableIngredients(['Broccoli', 'Carrots', 'Bell Peppers', 'Soy Sauce', 'Garlic'])
        });
        
        dishes.push({
            name: "Vegetable Curry",
            description: "Spicy vegetable curry with rice",
            price: 16.99,
            country: "India",
            categoryNames: getAvailableCategories(['Vegetarian', 'Main Course', 'Indian']),
            ingredientNames: getAvailableIngredients(['Rice', 'Carrots', 'Onion', 'Garlic', 'Curry Powder'])
        });
        
        if (ingredients.find(i => i.name === 'Mushrooms')) {
            dishes.push({
                name: "Mushroom Risotto",
                description: "Creamy risotto with wild mushrooms",
                price: 18.99,
                country: "Italy",
                categoryNames: getAvailableCategories(['Vegetarian', 'Main Course', 'Italian']),
                ingredientNames: getAvailableIngredients(['Rice', 'Mushrooms', 'Cheese', 'Garlic', 'Butter'])
            });
        }
    }
    
    // 9. Side Dishes
    if (categories.find(c => c.name === 'Side Dishes')) {
        if (ingredients.find(i => i.name === 'Rice')) {
            dishes.push({
                name: "Steamed Rice",
                description: "Perfectly steamed rice",
                price: 4.99,
                country: "China",
                categoryNames: ["Side Dishes"],
                ingredientNames: getAvailableIngredients(['Rice', 'Salt'])
            });
        }
        
        if (ingredients.find(i => i.name === 'Potatoes')) {
            dishes.push({
                name: "Mashed Potatoes",
                description: "Creamy mashed potatoes with butter",
                price: 5.99,
                country: "United States",
                categoryNames: getAvailableCategories(['Side Dishes', 'American']),
                ingredientNames: getAvailableIngredients(['Potatoes', 'Butter', 'Milk', 'Salt'])
            });
        }
        
        dishes.push({
            name: "Roasted Vegetables",
            description: "Seasonal vegetables roasted with herbs",
            price: 6.99,
            country: "United States",
            categoryNames: ["Side Dishes"],
            ingredientNames: getAvailableIngredients(['Carrots', 'Broccoli', 'Garlic', 'Olive Oil', 'Herbs'])
        });
    }
    
    // 10. Asian Dishes
    if (categories.find(c => c.name === 'Asian')) {
        if (ingredients.find(i => i.name === 'Noodles')) {
            dishes.push({
                name: "Stir Fried Noodles",
                description: "Asian noodles with vegetables and soy sauce",
                price: 15.99,
                country: "China",
                categoryNames: ["Asian", "Main Course"],
                ingredientNames: getAvailableIngredients(['Noodles', 'Carrots', 'Broccoli', 'Soy Sauce', 'Garlic'])
            });
        }
        
        if (ingredients.find(i => i.name === 'Rice')) {
            dishes.push({
                name: "Fried Rice",
                description: "Classic fried rice with vegetables and eggs",
                price: 13.99,
                country: "China",
                categoryNames: ["Asian", "Main Course"],
                ingredientNames: getAvailableIngredients(['Rice', 'Eggs', 'Carrots', 'Onion', 'Soy Sauce'])
            });
        }
    }
    
    // 11. Mexican Dishes
    if (categories.find(c => c.name === 'Mexican')) {
        if (ingredients.find(i => i.name === 'Tortillas')) {
            dishes.push({
                name: "Chicken Tacos",
                description: "Grilled chicken tacos with fresh vegetables",
                price: 16.99,
                country: "Mexico",
                categoryNames: ["Mexican", "Main Course"],
                ingredientNames: getAvailableIngredients(['Tortillas', 'Chicken', 'Lettuce', 'Tomato', 'Cheese'])
            });
        }
        
        dishes.push({
            name: "Guacamole",
            description: "Fresh guacamole with chips",
            price: 8.99,
            country: "Mexico",
            categoryNames: getAvailableCategories(['Mexican', 'Appetizers']),
            ingredientNames: getAvailableIngredients(['Avocado', 'Lime', 'Onion', 'Garlic', 'Tortilla Chips'])
        });
    }
    
    // 12. French Dishes
    if (categories.find(c => c.name === 'French')) {
        if (ingredients.find(i => i.name === 'Beef')) {
            dishes.push({
                name: "Beef Bourguignon",
                description: "Classic French beef stew with red wine",
                price: 28.99,
                country: "France",
                categoryNames: ["French", "Main Course"],
                ingredientNames: getAvailableIngredients(['Beef', 'Onion', 'Garlic', 'Herbs', 'Red Wine'])
            });
        }
        
        dishes.push({
            name: "French Onion Soup",
            description: "Classic French soup with caramelized onions",
            price: 12.99,
            country: "France",
            categoryNames: getAvailableCategories(['French', 'Soups']),
            ingredientNames: getAvailableIngredients(['Onion', 'Beef Broth', 'Bread', 'Cheese', 'Butter'])
        });
    }
    
    // 13. Breakfast Dishes
    if (categories.find(c => c.name === 'Breakfast')) {
        if (ingredients.find(i => i.name === 'Eggs')) {
            dishes.push({
                name: "Scrambled Eggs",
                description: "Fluffy scrambled eggs with toast",
                price: 9.99,
                country: "United States",
                categoryNames: ["Breakfast"],
                ingredientNames: getAvailableIngredients(['Eggs', 'Bread', 'Butter', 'Milk'])
            });
            
            dishes.push({
                name: "Omelette",
                description: "Three-egg omelette with cheese and vegetables",
                price: 11.99,
                country: "France",
                categoryNames: getAvailableCategories(['Breakfast', 'French']),
                ingredientNames: getAvailableIngredients(['Eggs', 'Cheese', 'Tomato', 'Onion', 'Butter'])
            });
        }
        
        if (ingredients.find(i => i.name === 'Pancakes')) {
            dishes.push({
                name: "Blueberry Pancakes",
                description: "Fluffy pancakes with fresh blueberries",
                price: 10.99,
                country: "United States",
                categoryNames: getAvailableCategories(['Breakfast', 'American']),
                ingredientNames: getAvailableIngredients(['Pancakes', 'Blueberries', 'Butter', 'Maple Syrup'])
            });
        }
    }
    
    // 14. Snacks
    if (categories.find(c => c.name === 'Snacks')) {
        dishes.push({
            name: "Popcorn",
            description: "Fresh popped popcorn with butter and salt",
            price: 4.99,
            country: "United States",
            categoryNames: ["Snacks"],
            ingredientNames: getAvailableIngredients(['Popcorn', 'Butter', 'Salt'])
        });
        
        if (ingredients.find(i => i.name === 'Potato Chips')) {
            dishes.push({
                name: "Potato Chips",
                description: "Crispy potato chips with sea salt",
                price: 3.99,
                country: "United States",
                categoryNames: ["Snacks"],
                ingredientNames: getAvailableIngredients(['Potato Chips', 'Sea Salt'])
            });
        }
    }
    
    // 15. Sandwiches
    if (categories.find(c => c.name === 'Sandwiches')) {
        if (ingredients.find(i => i.name === 'Chicken')) {
            dishes.push({
                name: "Chicken Sandwich",
                description: "Grilled chicken sandwich with lettuce and tomato",
                price: 12.99,
                country: "United States",
                categoryNames: getAvailableCategories(['Sandwiches', 'American']),
                ingredientNames: getAvailableIngredients(['Bread', 'Chicken', 'Lettuce', 'Tomato', 'Mayonnaise'])
            });
        }
        
        if (ingredients.find(i => i.name === 'Turkey')) {
            dishes.push({
                name: "Turkey Club",
                description: "Classic turkey club sandwich",
                price: 13.99,
                country: "United States",
                categoryNames: getAvailableCategories(['Sandwiches', 'American']),
                ingredientNames: getAvailableIngredients(['Bread', 'Turkey', 'Lettuce', 'Tomato', 'Bacon'])
            });
        }
    }
    
    return dishes;
}

async function populateDishes() {
    try {
        const { categories, ingredients } = await fetchAllData();
        
        if (categories.length === 0) {
            console.error('❌ No categories found. Please run populate_categories.JS first.');
            return;
        }
        
        if (ingredients.length === 0) {
            console.error('❌ No ingredients found. Please run populate_ingredients.js first.');
            return;
        }
        
        const dishes = createDishesFromExistingData(categories, ingredients);
        
        console.log(`\n🍽️ Creating ${dishes.length} dishes using existing data...`);
        
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
                await new Promise(resolve => setTimeout(resolve, 100));
                
            } catch (error) {
                console.error(`❌ Failed to add ${dish.name}:`, error.response?.data || error.message);
            }
        }
        
        console.log('\n🎉 Finished populating dishes!');
        
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
        console.error('Error in populateDishes:', error);
    }
}

// Run the population script
populateDishes().catch(console.error); 