using Fridgr.Data.Models;

namespace Fridgr.Data.Seeders
{
    public class IngredientSeeder : ISeeder
    {
        public async Task SeedAsync(FridgrDbContext context, IServiceProvider serviceProvider)
        {
            if (context.Ingredients.Any()) return;

            await context.AddRangeAsync(new Ingredient[]
            {
                // Fruits
                new Ingredient { Name = "Apple", CategoryId = 1 },
                new Ingredient { Name = "Banana", CategoryId = 1 },
                new Ingredient { Name = "Orange", CategoryId = 1 },
                new Ingredient { Name = "Blueberry", CategoryId = 1 },
                new Ingredient { Name = "Strawberry", CategoryId = 1 },
                new Ingredient { Name = "Grapes", CategoryId = 1 },
                new Ingredient { Name = "Mango", CategoryId = 1 },
                new Ingredient { Name = "Pineapple", CategoryId = 1 },
                new Ingredient { Name = "Melon", CategoryId = 1 },
                new Ingredient { Name = "Watermelon", CategoryId = 1 },
                new Ingredient { Name = "Peach", CategoryId = 1 },
                new Ingredient { Name = "Pear", CategoryId = 1 },
                new Ingredient { Name = "Cherry", CategoryId = 1 },

                // Vegetables
                new Ingredient { Name = "Tomato", CategoryId = 2 },
                new Ingredient { Name = "Onion", CategoryId = 2 },
                new Ingredient { Name = "Carrot", CategoryId = 2 },
                new Ingredient { Name = "Potato", CategoryId = 2 },
                new Ingredient { Name = "Pepper", CategoryId = 2 },
                new Ingredient { Name = "Pumpkin", CategoryId = 2 },
                new Ingredient { Name = "Eggplant", CategoryId = 2 },
                new Ingredient { Name = "Lettuce", CategoryId = 2 },
                new Ingredient { Name = "Mushroom", CategoryId = 2 },

                // Animal products
                new Ingredient { Name = "Milk", CategoryId = 3 },
                new Ingredient { Name = "Cheese", CategoryId = 3 },
                new Ingredient { Name = "Eggs", CategoryId = 3 },
                new Ingredient { Name = "Butter", CategoryId = 3 },
                new Ingredient { Name = "Yogurt", CategoryId = 3 },
                new Ingredient { Name = "Cream", CategoryId = 3 },

                // Meat
                new Ingredient { Name = "Beef", CategoryId = 4 },
                new Ingredient { Name = "Pork", CategoryId = 4 },
                new Ingredient { Name = "Chicken", CategoryId = 4 },
                new Ingredient { Name = "Lamb", CategoryId = 4 },
                new Ingredient { Name = "Turkey", CategoryId = 4 },
                new Ingredient { Name = "Duck", CategoryId = 4 },
                new Ingredient { Name = "Venison", CategoryId = 4 },
                new Ingredient { Name = "Rabbit", CategoryId = 4 },

                // Seafood
                new Ingredient { Name = "Salmon", CategoryId = 5 },
                new Ingredient { Name = "Tuna", CategoryId = 5 },
                new Ingredient { Name = "Shrimp", CategoryId = 5 },
                new Ingredient { Name = "Lobster", CategoryId = 5 },
                new Ingredient { Name = "Crab", CategoryId = 5 },
                new Ingredient { Name = "Scallops", CategoryId = 5 },
                new Ingredient { Name = "Oysters", CategoryId = 5 },
                new Ingredient { Name = "Clams", CategoryId = 5 },
                new Ingredient { Name = "Squid", CategoryId = 5 },

                // Grains
                new Ingredient { Name = "Rice", CategoryId = 6 },
                new Ingredient { Name = "Wheat", CategoryId = 6 },
                new Ingredient { Name = "Barley", CategoryId = 6 },
                new Ingredient { Name = "Oats", CategoryId = 6 },
                new Ingredient { Name = "Corn", CategoryId = 6 },
                new Ingredient { Name = "Quinoa", CategoryId = 6 },
                new Ingredient { Name = "Rye", CategoryId = 6 },
            });

            await context.SaveChangesAsync();
        }
    }
}
