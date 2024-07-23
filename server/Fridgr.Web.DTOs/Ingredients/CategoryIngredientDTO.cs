namespace Fridgr.Web.DTOs.Ingredients
{
    public class CategoryIngredientDTO
    {
        public string CategoryName { get; set; } = null!;
        public IEnumerable<IngredientDTO> Ingredients { get; set; } = new HashSet<IngredientDTO>();
    }
}
