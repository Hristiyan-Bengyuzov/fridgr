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

        [HttpPost("createRecipe")]
        public async Task<IActionResult> CreateRecipe([FromForm] CreateRecipeDTO createRecipeDTO)
        {
            try
            {
                await _recipeService.CreateRecipeAsync(createRecipeDTO);
                return Ok("Recipe successfully created.");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet("getRecipeDetails/{id}")]
        public async Task<ActionResult<RecipeDetailsDTO>> GetRecipeDetails(int id)
        {
            var recipeDetails = await _recipeService.GetRecipeDetailsAsync(id);
            return recipeDetails is null ? NoContent() : Ok(recipeDetails);
        }

        [HttpGet("getRecipeEditDTO/{id}")]
        public async Task<ActionResult<RecipeDetailsDTO>> GetRecipeEditDTO(int id)
        {
            try
            {
                var recipeEditDTO = await _recipeService.GetEditRecipeDTO(id);
                return Ok(recipeEditDTO);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        [HttpPost("editRecipe")]
        public async Task<IActionResult> EditRecipe([FromForm] EditRecipeDTO editRecipeDTO)
        {
            try
            {
                await _recipeService.EditRecipeAsync(editRecipeDTO);
                return Ok("Edited recipe.");
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        [HttpDelete("deleteRecipe/{id}")]
        public async Task<IActionResult> DeleteRecipe(int id)
        {
            try
            {
                await _recipeService.DeleteRecipeAsync(id);
                return Ok("Deleted recipe.");
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

    }
}
