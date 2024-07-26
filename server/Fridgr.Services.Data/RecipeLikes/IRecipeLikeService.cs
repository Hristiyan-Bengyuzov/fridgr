namespace Fridgr.Services.Data.RecipeLikes
{
    public interface IRecipeLikeService
    {
        Task LikeRecipeAsync(int recipeId, string username);
        Task DislikeRecipeAsync(int recipeId, string username);
        Task<bool> UserLikedRecipeAsync(int recipeId, string username);
    }
}
