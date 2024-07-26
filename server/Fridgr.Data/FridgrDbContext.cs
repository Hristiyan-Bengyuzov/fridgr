using Fridgr.Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Fridgr.Data
{
    public class FridgrDbContext : IdentityDbContext<ApplicationUser>
    {
        public FridgrDbContext(DbContextOptions<FridgrDbContext> options) : base(options) { }

        public DbSet<FoodCategory> FoodCategories { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Instruction> Instructions { get; set; }
        public DbSet<RecipeIngredient> RecipeIngredients { get; set; }
        public DbSet<RecipeLike> RecipeLikes { get; set; }
    }
}
