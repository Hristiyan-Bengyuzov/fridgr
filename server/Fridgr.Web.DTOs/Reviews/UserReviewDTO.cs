namespace Fridgr.Web.DTOs.Reviews
{
    public class UserReviewDTO
    {
        public int Id { get; set; }
        public string Text { get; set; } = null!;
        public int Stars { get; set; }
        public string Recipe { get; set; } = null!;
        public string? Image { get; set; }
    }
}
