using Fridgr.Data.Models;

namespace Fridgr.Data.Seeders
{
    public class RecipeSeeder : ISeeder
    {
        public async Task SeedAsync(FridgrDbContext context, IServiceProvider serviceProvider)
        {
            if (context.Recipes.Any()) return;

            await context.Recipes.AddRangeAsync(new Recipe[]
            {
                new Recipe { Name = "Shopska salad", Image = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Chopska.jpg/1200px-Chopska.jpg" },
                new Recipe { Name = "Scrambled eggs", Image = "https://assets.epicurious.com/photos/57b35f844924889253994109/master/pass/scrambled-eggs.jpg" },
            });

            await context.SaveChangesAsync();
        }
    }
}
