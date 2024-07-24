using Fridgr.Data.Models;

namespace Fridgr.Data.Seeders
{
    public class RecipeIngredientSeeder : ISeeder
    {
        public async Task SeedAsync(FridgrDbContext context, IServiceProvider serviceProvider)
        {
            if (context.RecipeIngredients.Any()) return;

            await context.RecipeIngredients.AddRangeAsync(new RecipeIngredient[]
            {
                // Shopska salad
                new RecipeIngredient { RecipeId = 1, IngredientId = 14 },
                new RecipeIngredient { RecipeId = 1, IngredientId = 15 },
                new RecipeIngredient { RecipeId = 1, IngredientId = 25 },

                // Scrambled eggs
                new RecipeIngredient { RecipeId = 2, IngredientId = 26 },
                new RecipeIngredient { RecipeId = 2, IngredientId = 27 },
            });

            await context.SaveChangesAsync();
        }
    }
}
