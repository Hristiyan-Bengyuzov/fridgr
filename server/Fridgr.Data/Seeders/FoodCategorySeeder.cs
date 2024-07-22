using Fridgr.Data.Models;

namespace Fridgr.Data.Seeders
{
    public class FoodCategorySeeder : ISeeder
    {
        public async Task SeedAsync(FridgrDbContext context, IServiceProvider serviceProvider)
        {
            if (context.FoodCategories.Any()) return;

            await context.FoodCategories.AddRangeAsync(new FoodCategory[]
            {
                new FoodCategory { Name = "Fruits" },
                new FoodCategory { Name = "Vegetables" },
                new FoodCategory { Name = "Animal products" },
                new FoodCategory { Name = "Meat" },
                new FoodCategory { Name = "Seafood" },
                new FoodCategory { Name = "Grains" },
            });

            await context.SaveChangesAsync();
        }
    }
}
