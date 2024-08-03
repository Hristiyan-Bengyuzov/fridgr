namespace Fridgr.Web.DTOs.Users
{
    public class UserDetailsDTO
    {
        public string Username { get; set; } = null!;
        public string? Image { get; set; } = null!;
        public int LikedRecipesCount { get; set; }
        public int ReviewsCount { get; set; }
        public int RecipesCount { get; set; }
    }
}
