using Fridgr.Data.Models;
using Fridgr.Data.Repositories;
using Fridgr.Services.Mapping;
using Fridgr.Web.DTOs.Recipes;
using Microsoft.EntityFrameworkCore;

namespace Fridgr.Services.Data.Recipes
{
    public class RecipeService : IRecipeService
    {
        private readonly IRepository<Recipe> _recipeRepository;

        public RecipeService(IRepository<Recipe> recipeRepository) => _recipeRepository = recipeRepository;

        public async Task<IEnumerable<RecipeDTO>> GetRecipesByIngredientsAsync(IEnumerable<int> ingredients)
        {
            var recipes = await _recipeRepository.AllAsNoTracking()
                .Include(r => r.Ingredients)
                .Where(r => r.Ingredients.All(ri => ingredients.Contains(ri.IngredientId)))
                .To<RecipeDTO>()
                .ToListAsync();

            return recipes;
        }
    }
}
