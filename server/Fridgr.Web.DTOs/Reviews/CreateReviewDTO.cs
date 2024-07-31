namespace Fridgr.Web.DTOs.Reviews
{
    public class CreateReviewDTO
    {
        public int RecipeId { get; set; }
        public string Username { get; set; } = null!;
        public string Text { get; set; } = null!;
        public int Stars { get; set; }
    }
}
