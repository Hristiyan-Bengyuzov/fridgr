namespace Fridgr.Web.DTOs.Reviews
{
    public class ReviewDTO
    {
        public string Username { get; set; } = null!;
        public string? Image { get; set; }
        public string Text { get; set; } = null!;
        public int Stars { get; set; }
    }
}
