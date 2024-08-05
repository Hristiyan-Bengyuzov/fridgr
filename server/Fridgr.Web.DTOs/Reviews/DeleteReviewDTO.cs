namespace Fridgr.Web.DTOs.Reviews
{
    public class DeleteReviewDTO
    {
        public int RecipeId { get; set; }
        public string Username { get; set; } = null!;
    }
}
