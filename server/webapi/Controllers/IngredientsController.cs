using Fridgr.Services.Data.Ingredients;
using Fridgr.Web.DTOs.Ingredients;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientsController : ControllerBase
    {
        private readonly IIngredientService _ingredientService;

        public IngredientsController(IIngredientService ingredientService) => _ingredientService = ingredientService;

        [HttpGet("getIngredients")]
        public async Task<ActionResult<IEnumerable<CategoryIngredientDTO>>> GetIngredients()
        {
            var ingredients = await _ingredientService.GetIngredientsByCategoriesAsync();
            return ingredients is null ? BadRequest() : Ok(ingredients);
        }
    }
}
