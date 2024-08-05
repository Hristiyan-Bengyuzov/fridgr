using Fridgr.Data.Models;
using Fridgr.Data.Repositories;
using Fridgr.Services.Data.Users;
using Fridgr.Web.DTOs.Reviews;
using Microsoft.EntityFrameworkCore;

namespace Fridgr.Services.Data.Reviews
{
    public class ReviewService : IReviewService
    {
        private readonly IRepository<Review> _reviewRepository;
        private readonly IUserService _userService;

        public ReviewService(IRepository<Review> reviewRepository, IUserService userService)
        {
            _reviewRepository = reviewRepository;
            _userService = userService;
        }

        public async Task CreateReviewAsync(CreateReviewDTO createReviewDTO)
        {
            await _reviewRepository.AddAsync(new Review
            {
                RecipeId = createReviewDTO.RecipeId,
                UserId = await _userService.GetUserIdByUsernameAsync(createReviewDTO.Username),
                Text = createReviewDTO.Text,
                Stars = createReviewDTO.Stars,
            });

            await _reviewRepository.SaveChangesAsync();
        }

        public async Task EditReviewAsync(EditReviewDTO editReviewDTO)
        {
            var review = _reviewRepository.All()
                .Include(r => r.User)
                .First(r => r.RecipeId == editReviewDTO.RecipeId && r.User.UserName == editReviewDTO.Username);

            review.Text = editReviewDTO.Text;
            review.Stars = editReviewDTO.Stars;

            await _reviewRepository.SaveChangesAsync();
        }

        public async Task<PagedReviewsDTO> GetReviewsAsync(ReviewQueryModel queryModel)
        {
            var reviews = await _reviewRepository.AllAsNoTracking()
                .Where(r => r.RecipeId == queryModel.RecipeId)
                .Include(r => r.User)
                .Skip((queryModel.CurrentPage - 1) * queryModel.ReviewsPerPage)
                .Take(queryModel.ReviewsPerPage)
                .Select(r => new ReviewDTO
                {
                    Username = r.User.UserName!,
                    Image = r.User.ImageUrl,
                    Text = r.Text,
                    Stars = r.Stars,
                })
                .ToListAsync();

            var totalCount = await _reviewRepository.AllAsNoTracking().CountAsync(r => r.RecipeId == queryModel.RecipeId);

            return new PagedReviewsDTO
            {
                TotalReviews = totalCount,
                Reviews = reviews
            };
        }

        public async Task<IEnumerable<UserReviewDTO>> GetUsersReviews(string username)
        {
            var reviews = await _reviewRepository.AllAsNoTracking()
                .Include(r => r.User)
                .Include(r => r.Recipe)
                .Where(r => r.User.UserName == username)
                .Select(r => new UserReviewDTO
                {
                    Id = r.Recipe.Id,
                    Recipe = r.Recipe.Name,
                    Image = r.Recipe.Image,
                    Text = r.Text,
                    Stars = r.Stars,
                })
                .ToListAsync();

            return reviews;
        }

        public async Task<bool> UserReviewedRecipeAsync(int recipeId, string username)
        {
            string userId = await _userService.GetUserIdByUsernameAsync(username);

            return await _reviewRepository.AllAsNoTracking()
                .AnyAsync(r => r.RecipeId == recipeId && r.UserId == userId);
        }
    }
}
