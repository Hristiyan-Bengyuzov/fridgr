namespace Fridgr.Web.DTOs.Reviews
{
    public class PagedReviewsDTO
    {
        public int TotalReviews { get; set; }
        public IEnumerable<ReviewDTO> Reviews { get; set; } = new HashSet<ReviewDTO>();
    }
}
