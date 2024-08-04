using Fridgr.Web.DTOs.Recipes;

namespace Fridgr.Services.Data.RecipeLikes
{
    public interface IRecipeLikeService
    {
        Task LikeRecipeAsync(int recipeId, string username);
        Task DislikeRecipeAsync(int recipeId, string username);
        Task<bool> UserLikedRecipeAsync(int recipeId, string username);
        Task<IEnumerable<RecipeDTO>> GetUsersLikedAsync(string username);
    }
}
