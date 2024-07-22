namespace Fridgr.Data.Seeders
{
    public interface ISeeder
    {
        Task SeedAsync(FridgrDbContext context, IServiceProvider serviceProvider);
    }
}
