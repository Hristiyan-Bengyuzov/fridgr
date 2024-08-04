using Fridgr.Web.DTOs.Recipes;

namespace Fridgr.Services.Data.Recipes
{
    public interface IRecipeService
    {
        Task<IEnumerable<RecipeDTO>> GetRecipesByIngredientsAsync(IEnumerable<int> ingredients);
        Task CreateRecipeAsync(CreateRecipeDTO createRecipeDTO);
        Task<RecipeDetailsDTO?> GetRecipeDetailsAsync(int id);
        Task<EditRecipeDTO> GetEditRecipeDTO(int id);
        Task EditRecipeAsync(EditRecipeDTO editRecipeDTO);
        Task DeleteRecipeAsync(int id);
        Task<IEnumerable<RecipeDTO>> GetUsersRecipesAsync(string username);
    }
}
