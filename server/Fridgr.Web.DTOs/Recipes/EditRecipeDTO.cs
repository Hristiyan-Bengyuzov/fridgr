using Microsoft.AspNetCore.Http;

namespace Fridgr.Web.DTOs.Recipes
{
    public class EditRecipeDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Image { get; set; } = null!;
        public IFormFile? ImageInput { get; set; }
        public IEnumerable<int> IngredientIds { get; set; } = new HashSet<int>();
        public IEnumerable<string> Instructions { get; set; } = new HashSet<string>();
    }
}
