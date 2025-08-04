const axios = require('axios');

// Restaurant dish categories with descriptions
const categories = [
    { name: "Appetizers", description: "Small dishes served before the main course to stimulate appetite" },
    { name: "Salads", description: "Fresh and light dishes made with vegetables, greens, and various toppings" },
    { name: "Soups", description: "Hot and cold soups from different world cuisines" },
    { name: "Main Course", description: "Primary dishes featuring meat, fish, or vegetarian options" },
    { name: "Seafood", description: "Dishes featuring fresh fish, shrimp, and other marine delicacies" },
    { name: "Meat Dishes", description: "Dishes made with beef, pork, lamb, and poultry" },
    { name: "Pasta", description: "Italian and European pasta dishes with various sauces" },
    { name: "Pizza", description: "Classic and signature pizzas with different toppings" },
    { name: "Burgers", description: "Delicious burgers made with natural meat and fresh vegetables" },
    { name: "Sushi & Rolls", description: "Traditional Japanese sushi and maki rolls" },
    { name: "Side Dishes", description: "Rice, potatoes, vegetables, and other accompaniments" },
    { name: "Sauces & Dips", description: "Various sauces and dips to complement dishes" },
    { name: "Desserts", description: "Sweet treats, pastries, and confections" },
    { name: "Beverages", description: "Hot and cold drinks, smoothies, and juices" },
    { name: "Alcoholic Drinks", description: "Wine, beer, cocktails, and spirits" },
    { name: "Vegetarian", description: "Meat-free dishes for vegetarians" },
    { name: "Vegan", description: "Plant-based dishes without animal products" },
    { name: "Gluten-Free", description: "Dishes without gluten for people with celiac disease" },
    { name: "Kids Menu", description: "Special dishes designed for children" },
    { name: "Snacks", description: "Light snacks and finger foods" },
    { name: "Sandwiches", description: "Various sandwiches, wraps, and toasts" },
    { name: "Grilled", description: "Meat, fish, and vegetables prepared on the grill" },
    { name: "Baked", description: "Casseroles and dishes prepared in the oven" },
    { name: "Steamed", description: "Healthy dishes prepared by steaming" },
    { name: "Wok Dishes", description: "Asian dishes prepared in a wok" },
    { name: "BBQ", description: "Dishes prepared on barbecue" },
    { name: "Seasonal", description: "Dishes made with seasonal ingredients" },
    { name: "Chef's Special", description: "Unique dishes from our head chef" },
    { name: "Italian", description: "Traditional Italian cuisine and specialties" },
    { name: "Asian", description: "Asian fusion and traditional dishes" },
    { name: "Mediterranean", description: "Mediterranean-style dishes and flavors" },
    { name: "American", description: "Classic American comfort food" },
    { name: "Mexican", description: "Authentic Mexican cuisine and flavors" },
    { name: "Indian", description: "Traditional Indian dishes and spices" },
    { name: "French", description: "Classic French cuisine and techniques" },
    { name: "Breakfast", description: "Traditional and modern breakfast dishes" },
    { name: "Lunch", description: "Perfect midday meals and light options" },
    { name: "Dinner", description: "Elegant evening dishes and special occasions" }
];

async function populateCategories() {
    console.log('Starting to populate categories...');
    
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        
        try {
            const response = await axios.post('http://localhost:3000/categories', {
                name: category.name,
                description: category.description
            });
            
            console.log(`✅ Added: ${category.name} - ${category.description} (ID: ${response.data._id})`);
            
            // Small delay to avoid overwhelming the server
            await new Promise(resolve => setTimeout(resolve, 100));
            
        } catch (error) {
            console.error(`❌ Failed to add ${category.name}:`, error.response?.data || error.message);
        }
    }
    
    console.log('Finished populating categories!');
}

// Run the population script
populateCategories().catch(console.error);
