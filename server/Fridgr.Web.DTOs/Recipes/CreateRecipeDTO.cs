using Microsoft.AspNetCore.Http;

namespace Fridgr.Web.DTOs.Recipes
{
    public class CreateRecipeDTO
    {
        public string Name { get; set; } = null!;
        public IFormFile? Image { get; set; }
        public IEnumerable<int> IngredientIds { get; set; } = new HashSet<int>();
        public IEnumerable<string> Instructions { get; set; } = new HashSet<string>();
    }
}
