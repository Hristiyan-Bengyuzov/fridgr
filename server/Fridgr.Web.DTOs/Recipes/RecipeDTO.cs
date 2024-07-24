using Fridgr.Data.Models;
using Fridgr.Services.Mapping;

namespace Fridgr.Web.DTOs.Recipes
{
    public class RecipeDTO : IMapFrom<Recipe>
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Image { get; set; }
    }
}
