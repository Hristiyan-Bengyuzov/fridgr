namespace Fridgr.Web.DTOs.Recipes
{
    public class RecipeDetailsDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Image { get; set; } = null!;
        public string? Owner { get; set; }
        public IEnumerable<string> Ingredients { get; set; } = new HashSet<string>();
        public IEnumerable<string> Instructions { get; set; } = new HashSet<string>();
    }
}
