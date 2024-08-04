using Fridgr.Data.Models;
using Fridgr.Data.Repositories;
using Fridgr.Services.Data.Users;
using Fridgr.Web.DTOs.Recipes;
using Microsoft.EntityFrameworkCore;

namespace Fridgr.Services.Data.RecipeLikes
{
    public class RecipeLikeService : IRecipeLikeService
    {
        private readonly IRepository<RecipeLike> _recipeLikeRepository;
        private readonly IUserService _userService;

        public RecipeLikeService(IRepository<RecipeLike> recipeLikeRepository, IUserService userService)
        {
            _recipeLikeRepository = recipeLikeRepository;
            _userService = userService;
        }

        public async Task DislikeRecipeAsync(int recipeId, string username)
        {
            string userId = await _userService.GetUserIdByUsernameAsync(username);
            var recipeLike = await _recipeLikeRepository.All().FirstAsync(rl => rl.RecipeId == recipeId && rl.UserId == userId);
            _recipeLikeRepository.Delete(recipeLike);
            await _recipeLikeRepository.SaveChangesAsync();
        }

        public async Task<IEnumerable<RecipeDTO>> GetUsersLikedAsync(string username)
        {
            var likedRecipes = await _recipeLikeRepository.AllAsNoTracking()
                .Include(rl => rl.User)
                .Include(rl => rl.Recipe)
                .Where(rl => rl.User.UserName == username)
                .Select(rl => new RecipeDTO
                {
                    Id = rl.RecipeId,
                    Name = rl.Recipe.Name,
                    Image = rl.Recipe.Image,
                })
                .ToListAsync();

            return likedRecipes;
        }

        public async Task LikeRecipeAsync(int recipeId, string username)
        {
            string userId = await _userService.GetUserIdByUsernameAsync(username);

            await _recipeLikeRepository.AddAsync(new RecipeLike
            {
                UserId = userId,
                RecipeId = recipeId,
            });

            await _recipeLikeRepository.SaveChangesAsync();
        }

        public async Task<bool> UserLikedRecipeAsync(int recipeId, string username)
        {
            var userId = await _userService.GetUserIdByUsernameAsync(username);

            return _recipeLikeRepository.AllAsNoTracking()
                .Any(rl => rl.RecipeId == recipeId && rl.UserId == userId);
        }
    }
}
