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
        public async Task<IActionResult> ReviewRecipe(CreateReviewDTO createReviewDTO)
        {
            if (await _reviewService.UserReviewedRecipeAsync(createReviewDTO.RecipeId, createReviewDTO.Username))
            {
                return BadRequest("You've already written a review for this recipe.");
            }

            await _reviewService.CreateReviewAsync(createReviewDTO);
            return Ok("Successfully written review.");
        }

        [HttpGet("getReviews")]
        public async Task<ActionResult<PagedReviewsDTO>> GetReviews([FromQuery] ReviewQueryModel queryModel)
        {
            var pagedDTO = await _reviewService.GetReviewsAsync(queryModel);
            return Ok(pagedDTO);
        }

        [HttpGet("getUsersReviews/{username}")]
        public async Task<ActionResult<IEnumerable<UserReviewDTO>>> GetUsersReviews(string username)
        {
            try
            {
                var reviews = await _reviewService.GetUsersReviews(username);
                return Ok(reviews);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        [HttpPost("editReview")]
        public async Task<IActionResult> EditReview(EditReviewDTO editReviewDTO)
        {
            try
            {
                await _reviewService.EditReviewAsync(editReviewDTO);
                return Ok("Edited review.");
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }
    }
}
