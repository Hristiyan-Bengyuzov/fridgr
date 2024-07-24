namespace Fridgr.Data.Seeders
{
    public class FridgrSeeder : ISeeder
    {
        public async Task SeedAsync(FridgrDbContext context, IServiceProvider serviceProvider)
        {
            if (context is null) throw new ArgumentNullException(nameof(context));

            if (serviceProvider is null) throw new ArgumentNullException(nameof(serviceProvider));

            var seeders = new List<ISeeder>
            {
                new FoodCategorySeeder(),
                new IngredientSeeder(),
                new RecipeSeeder(),
                new InstructionSeeder(),
                new RecipeIngredientSeeder()
            };

            foreach (var seeder in seeders)
            {
                await seeder.SeedAsync(context, serviceProvider);
            }
        }
    }
}
