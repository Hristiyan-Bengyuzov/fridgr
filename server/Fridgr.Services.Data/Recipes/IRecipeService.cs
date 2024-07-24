using Fridgr.Web.DTOs.Recipes;

namespace Fridgr.Services.Data.Recipes
{
    public interface IRecipeService
    {
        Task<IEnumerable<RecipeDTO>> GetRecipesByIngredientsAsync(IEnumerable<int> ingredients);
    }
}
