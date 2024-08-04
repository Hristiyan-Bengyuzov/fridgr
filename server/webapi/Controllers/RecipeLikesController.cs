using Fridgr.Services.Data.RecipeLikes;
using Fridgr.Web.DTOs.LikeRecipes;
using Fridgr.Web.DTOs.Recipes;
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

        [HttpGet("getLikedRecipes/{username}")]
        public async Task<ActionResult<IEnumerable<RecipeDTO>>> GetUsersLikesRecipes(string username)
        {
            try
            {
                var likedRecipes = await _recipeLikeService.GetUsersLikedAsync(username);
                return Ok(likedRecipes);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }
    }
}
