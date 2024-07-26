using Fridgr.Services.Data.RecipeLikes;
using Fridgr.Web.DTOs.LikeRecipes;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeLikesController : ControllerBase
    {
        private readonly IRecipeLikeService _recipeLikeService;

        public RecipeLikesController(IRecipeLikeService recipeLikeService)
        {
            _recipeLikeService = recipeLikeService;
        }

        [HttpPost("likeRecipe")]
        public async Task<IActionResult> LikeRecipe(LikeRecipeRequest likeRecipeRequest)
        {
            if (await _recipeLikeService.UserLikedRecipeAsync(likeRecipeRequest.RecipeId, likeRecipeRequest.Username))
            {
                await _recipeLikeService.DislikeRecipeAsync(likeRecipeRequest.RecipeId, likeRecipeRequest.Username);
                return Ok("Recipe disliked.");
            }

            await _recipeLikeService.LikeRecipeAsync(likeRecipeRequest.RecipeId, likeRecipeRequest.Username);
            return Ok("Recipe liked.");
        }
    }
}
