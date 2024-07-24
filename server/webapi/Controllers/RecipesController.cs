using Fridgr.Services.Data.Recipes;
using Fridgr.Web.DTOs.Recipes;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly IRecipeService _recipeService;

        public RecipesController(IRecipeService recipeService)
        {
            _recipeService = recipeService;
        }

        [HttpGet("getRecipes")]
        public async Task<ActionResult<IEnumerable<RecipeDTO>>> GetRecipes([FromQuery] int[] ingredients)
        {
            var recipes = await _recipeService.GetRecipesByIngredientsAsync(ingredients);
            return Ok(recipes);
        }
    }
}
