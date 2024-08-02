namespace Fridgr.Web.DTOs.Reviews
{
    public class ReviewQueryModel
    {
        public int RecipeId { get; set; }
        public int CurrentPage { get; set; } = 1;
        public int ReviewsPerPage { get; set; } = 5;
    }
}
