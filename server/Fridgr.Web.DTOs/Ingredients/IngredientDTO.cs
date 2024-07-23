using Fridgr.Data.Models;
using Fridgr.Services.Mapping;

namespace Fridgr.Web.DTOs.Ingredients
{
    public class IngredientDTO : IMapFrom<Ingredient>
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
    }
}
