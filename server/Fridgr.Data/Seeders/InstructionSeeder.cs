using Fridgr.Data.Models;

namespace Fridgr.Data.Seeders
{
    internal class InstructionSeeder : ISeeder
    {
        public async Task SeedAsync(FridgrDbContext context, IServiceProvider serviceProvider)
        {
            if (context.Instructions.Any()) return;

            await context.Instructions.AddRangeAsync(new Instruction[]
            {
                // Shopska salad
                new Instruction { Text = "Chop the tomatoes and cucumbers into small, bite-sized pieces.", RecipeId = 1 },
                new Instruction { Text = "In a large salad bowl, combine the chopped tomatoesand cucumbers.", RecipeId = 1 },
                new Instruction { Text = "Crumble or grate the feta cheese over the top of the salad.", RecipeId = 1 },
                new Instruction { Text = "Season them however you like.", RecipeId = 1 },
                new Instruction { Text = "Serve immediately or chill in the refrigerator for about 30 minutes before serving for a more refreshing taste.", RecipeId = 1 },

                // Scrambled eggs
                new Instruction { Text = "Crack the eggs into a bowl.", RecipeId = 2 },
                new Instruction { Text = "Beat the eggs with a fork or whisk until the yolks and whites are fully combined.", RecipeId = 2 },
                new Instruction { Text = "Place a non-stick skillet or frying pan over medium-low heat.", RecipeId = 2 },
                new Instruction { Text = "Add the butter or oil to the pan and let it melt, coating the bottom evenly.", RecipeId = 2 },
                new Instruction { Text = "Pour the beaten eggs into the pan.", RecipeId = 2 },
                new Instruction { Text = "Using a spatula, gently stir the eggs from the edges toward the center, creating soft folds.", RecipeId = 2 },
                new Instruction { Text = "Cook until the eggs are mostly set but still slightly runny.", RecipeId = 2 },
                new Instruction { Text = "Remove the pan from the heat just before the eggs are fully cooked to prevent them from becoming dry.", RecipeId = 2 },
                new Instruction { Text = "Serve immediately.", RecipeId = 2 },
            });

            await context.SaveChangesAsync();
        }
    }
}
