const axios = require('axios');

// Function to generate random stock between 10 and 100
function generateRandomStock() {
    return Math.floor(Math.random() * 91) + 10; // Random number between 10 and 100
}

async function updateIngredientsStock() {
    console.log('Starting to update ingredients with stock...');
    
    try {
        // First, get all existing ingredients
        const response = await axios.get('http://localhost:3000/ingredients?limit=1000');
        const ingredients = response.data.data; // The ingredients are in the data property
        
        console.log(`Found ${ingredients.length} ingredients to update`);
        
        for (let i = 0; i < ingredients.length; i++) {
            const ingredient = ingredients[i];
            const randomStock = generateRandomStock();
            
            try {
                const updateResponse = await axios.put(`http://localhost:3000/ingredients/${ingredient._id}`, {
                    name: ingredient.name,
                    price: ingredient.price,
                    stock: randomStock
                });
                
                console.log(`✅ Updated: ${ingredient.name} - Stock: ${randomStock} (ID: ${ingredient._id})`);
                
                // Small delay to avoid overwhelming the server
                await new Promise(resolve => setTimeout(resolve, 100));
                
            } catch (error) {
                console.error(`❌ Failed to update ${ingredient.name}:`, error.response?.data || error.message);
                console.error(`Error details:`, error.response?.status, error.response?.statusText);
                console.error(`Full error:`, JSON.stringify(error.response?.data, null, 2));
            }
        }
        
        console.log('Finished updating ingredients with stock!');
        
    } catch (error) {
        console.error('❌ Failed to fetch ingredients:', error.response?.data || error.message);
    }
}

// Run the update script
updateIngredientsStock().catch(console.error); 