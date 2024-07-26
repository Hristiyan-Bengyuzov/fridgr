namespace Fridgr.Web.DTOs.LikeRecipes
{
    public class LikeRecipeRequest
    {
        public int RecipeId { get; set; }
        public string Username { get; set; } = null!;
    }
}
