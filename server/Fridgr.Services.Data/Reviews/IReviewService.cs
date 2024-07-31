using Fridgr.Web.DTOs.Reviews;

namespace Fridgr.Services.Data.Reviews
{
    public interface IReviewService
    {
        Task CreateReviewAsync(CreateReviewDTO createReviewDTO);
        Task<bool> UserReviewedRecipeAsync(int recipeId, string username);
    }
}
