const axios = require('axios');

// Function to generate random stock between 10 and 100
function generateRandomStock() {
    return Math.floor(Math.random() * 91) + 10; // Random number between 10 and 100
}

// Restaurant ingredients with prices and stock
const ingredients = [
    { name: "Tomato", price: 2.50  },
    { name: "Mozzarella", price: 8.99 },
    { name: "Basil", price: 3.99 },
    { name: "Pizza Dough", price: 4.50 },
    { name: "Olive Oil", price: 12.99 },
    { name: "Romaine Lettuce", price: 3.99 },
    { name: "Parmesan Cheese", price: 9.99 },
    { name: "Croutons", price: 4.99 },
    { name: "Caesar Dressing", price: 5.99 },
    { name: "Black Pepper", price: 6.99 },
    { name: "Salmon", price: 24.99 },
    { name: "Lemon", price: 1.99 },
    { name: "Herbs", price: 4.99 },
    { name: "Garlic", price: 2.99 },
    { name: "Beef", price: 18.99 },
    { name: "Lettuce", price: 2.99 },
    { name: "Cheese", price: 7.99 },
    { name: "Burger Bun", price: 3.99 },
    { name: "Onion", price: 2.49 },
    { name: "Chicken", price: 12.99 },
    { name: "Pasta", price: 5.99 },
    { name: "Cream", price: 4.99 },
    { name: "Butter", price: 6.99 },
    { name: "Broccoli", price: 3.99 },
    { name: "Carrots", price: 2.99 },
    { name: "Bell Peppers", price: 4.99 },
    { name: "Soy Sauce", price: 3.99 },
    { name: "Ginger", price: 3.49 },
    { name: "Chocolate", price: 8.99 },
    { name: "Flour", price: 4.99 },
    { name: "Sugar", price: 3.99 },
    { name: "Eggs", price: 5.99 },
    { name: "Milk", price: 4.99 },
    { name: "Avocado", price: 3.99 },
    { name: "Rice", price: 6.99 },
    { name: "Nori", price: 7.99 },
    { name: "Wasabi", price: 5.99 },
    { name: "Cucumber", price: 2.99 },
    { name: "Feta Cheese", price: 8.99 },
    { name: "Olives", price: 6.99 },
    { name: "Pork", price: 16.99 },
    { name: "BBQ Sauce", price: 4.99 },
    { name: "Cabbage", price: 2.49 },
    { name: "Mayonnaise", price: 3.99 },
    { name: "Vinegar", price: 2.99 },
    { name: "Mushrooms", price: 5.99 },
    { name: "White Wine", price: 15.99 },
    { name: "Fish", price: 19.99 },
    { name: "Tortillas", price: 4.99 },
    { name: "Lime", price: 1.49 },
    { name: "Chipotle", price: 4.99 },
    { name: "Sour Cream", price: 3.99 },
    { name: "Coconut Milk", price: 3.99 },
    { name: "Curry Powder", price: 5.99 },
    { name: "Beef Broth", price: 4.99 },
    { name: "Bread", price: 3.99 },
    { name: "Thyme", price: 4.99 },
    { name: "Quinoa", price: 8.99 },
    { name: "Sweet Potato", price: 3.99 },
    { name: "Kale", price: 4.99 },
    { name: "Chickpeas", price: 3.99 },
    { name: "Tahini", price: 6.99 },
    { name: "Potatoes", price: 4.99 },
    { name: "Salsa", price: 3.99 },
    { name: "Lobster", price: 45.99 },
    { name: "Sherry", price: 18.99 },
    { name: "Gluten-Free Pasta", price: 8.99 },
    { name: "Breadcrumbs", price: 3.99 },
    { name: "Ketchup", price: 2.99 },
    { name: "Mango", price: 3.99 },
    { name: "Yogurt", price: 4.99 },
    { name: "Honey", price: 7.99 },
    { name: "Ice", price: 1.99 }
];

async function populateIngredients() {
    console.log('Starting to populate ingredients...');
    
    for (let i = 0; i < ingredients.length; i++) {
        const ingredient = ingredients[i];
        
        try {
            const randomStock = generateRandomStock();
            const response = await axios.post('http://localhost:3000/ingredients', {
                name: ingredient.name,
                price: ingredient.price,
                stock: randomStock
            });
            
            console.log(`✅ Added: ${ingredient.name} - $${ingredient.price} - Stock: ${randomStock} (ID: ${response.data._id})`);
            
            // Small delay to avoid overwhelming the server
            await new Promise(resolve => setTimeout(resolve, 100));
            
        } catch (error) {
            console.error(`❌ Failed to add ${ingredient.name}:`, error.response?.data || error.message);
        }
    }
    
    console.log('Finished populating ingredients!');
}

// Run the population script
populateIngredients().catch(console.error); 