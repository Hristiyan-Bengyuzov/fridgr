using Fridgr.Services.Data.Reviews;
using Fridgr.Web.DTOs.Reviews;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly IReviewService _reviewService;

        public ReviewsController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        [HttpPost("reviewRecipe")]
        public async Task<IActionResult> LikeRecipe(CreateReviewDTO createReviewDTO)
        {
            if (await _reviewService.UserReviewedRecipeAsync(createReviewDTO.RecipeId, createReviewDTO.Username))
            {
                return BadRequest("You've already written a review for this recipe.");
            }

            await _reviewService.CreateReviewAsync(createReviewDTO);
            return Ok("Successfully written review.");
        }
    }
}
